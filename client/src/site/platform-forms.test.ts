import assert from "node:assert/strict";
import test from "node:test";
import {
  createBetterFarmsContactSubmission,
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
      submitPlatformForm("/api/contact", {
        name: "Ada Lovelace",
        email: "ada@example.org",
        subject: "Better Farms website inquiry",
        message: "Hello",
      }, async () => new Response(JSON.stringify({ message: "Form unavailable" }), { status: 503 })),
    (error: unknown) =>
      error instanceof PlatformFormSubmissionError && error.message === "Form unavailable",
  );
});
