import assert from "node:assert/strict";
import test from "node:test";
import {
  createBetterFarmsContactSubmission,
  createPlatformFormAttempt,
  PlatformFormSubmissionError,
  submitPlatformForm,
} from "./platform-forms";

test("Better Farms contact submissions preserve optional context in the managed Core form payload", () => {
  assert.deepEqual(
    createBetterFarmsContactSubmission({
      fullName: "Ada Lovelace",
      email: "ada@example.org",
      organization: "Farm Cooperative",
      role: "Donor",
      referral: "Event",
      message: "I would like to learn more.",
    }),
    {
      name: "Ada Lovelace",
      email: "ada@example.org",
      subject: "Better Farms website inquiry",
      message:
        "Organization: Farm Cooperative\n\nRole: Donor\n\nReferred by: Event\n\nI would like to learn more.",
    },
  );
});

test("public form submission uses a same-origin platform endpoint and returns its confirmation", async () => {
  let endpoint = "";
  let request: Request | undefined;
  const message = await submitPlatformForm(
    "/api/forms/newsletter-signup/submit",
    { email: "ada@example.org" },
    async (input, init) => {
      endpoint = String(input);
      request = new Request(`http://localhost${endpoint}`, init);
      return new Response(JSON.stringify({ message: "You're on the list." }), {
        status: 201,
        headers: { "content-type": "application/json" },
      });
    },
  );

  assert.equal(message, "You're on the list.");
  assert.equal(endpoint, "/api/forms/newsletter-signup/submit");
  assert.equal(request?.method, "POST");
  assert.deepEqual(await request?.json(), { email: "ada@example.org" });
});

test("public form submission does not treat an upstream failure as success", async () => {
  await assert.rejects(
    () =>
      submitPlatformForm(
        "/api/contact",
        {
          name: "Ada Lovelace",
          email: "ada@example.org",
          subject: "Better Farms website inquiry",
          message: "Hello",
        },
        async () =>
          new Response(JSON.stringify({ message: "Form unavailable" }), {
            status: 503,
          }),
      ),
    (error: unknown) =>
      error instanceof PlatformFormSubmissionError &&
      error.message === "Form unavailable",
  );
});

for (const failure of ["network", "unavailable", "malformed"]) {
  test(`retry retains key after ${failure} and rotates after accepted success`, async () => {
    let sequence = 0;
    const attempt = createPlatformFormAttempt(() => `key-${++sequence}`);
    const keys: string[] = [];
    let calls = 0;
    const fetcher: typeof fetch = async (_url, init) => {
      keys.push(new Headers(init?.headers).get("idempotency-key")!);
      if (++calls === 1) {
        if (failure === "network")
          throw new Error("response lost after commit");
        if (failure === "unavailable")
          return new Response("{}", { status: 503 });
        return new Response("{}", { status: 201 });
      }
      return new Response(
        JSON.stringify({ message: "Accepted", submissionId: "synthetic" }),
        { status: 200 },
      );
    };
    await assert.rejects(() =>
      attempt.submit(
        "/api/forms/newsletter-signup/submit",
        { email: "ada@example.org" },
        fetcher,
      ),
    );
    assert.equal(attempt.isPending, false);
    await attempt.submit(
      "/api/forms/newsletter-signup/submit",
      { email: " ada@example.org " },
      fetcher,
    );
    await attempt.submit(
      "/api/forms/newsletter-signup/submit",
      { email: "ada@example.org" },
      fetcher,
    );
    assert.deepEqual(keys, ["key-1", "key-1", "key-2"]);
  });
}

test("changed normalized payload renews retry key and separate forms never share attempts", async () => {
  let sequence = 0;
  const attempt = createPlatformFormAttempt(() => `key-${++sequence}`);
  const keys: string[] = [];
  const fetcher: typeof fetch = async (_url, init) => {
    keys.push(new Headers(init?.headers).get("idempotency-key")!);
    throw new Error("lost");
  };
  for (const email of [
    "ada@example.org",
    "other@example.org",
    "ada@example.org",
  ]) {
    await assert.rejects(() =>
      attempt.submit("/api/forms/newsletter-signup/submit", { email }, fetcher),
    );
  }
  assert.deepEqual(keys, ["key-1", "key-2", "key-3"]);
  const separate = createPlatformFormAttempt(() => "separate");
  await assert.rejects(() =>
    separate.submit(
      "/api/forms/newsletter-signup/submit",
      { email: "ada@example.org" },
      fetcher,
    ),
  );
  assert.equal(keys[3], "separate");
});

test("rapid duplicate submissions share one request and changed input cannot replace pending state", async () => {
  const attempt = createPlatformFormAttempt(() => "same-attempt");
  let resolve!: (response: Response) => void;
  let calls = 0;
  const fetcher: typeof fetch = () => {
    calls++;
    return new Promise((done) => {
      resolve = done;
    });
  };
  const first = attempt.submit(
    "/api/forms/newsletter-signup/submit",
    { email: "ada@example.org" },
    fetcher,
  );
  const second = attempt.submit(
    "/api/forms/newsletter-signup/submit",
    { email: "ada@example.org" },
    fetcher,
  );
  assert.equal(first, second);
  await assert.rejects(() =>
    attempt.submit(
      "/api/forms/newsletter-signup/submit",
      { email: "other@example.org" },
      fetcher,
    ),
  );
  assert.equal(calls, 1);
  resolve(
    new Response(JSON.stringify({ message: "Accepted" }), { status: 201 }),
  );
  assert.equal(await first, "Accepted");
  assert.equal(attempt.isPending, false);
});
