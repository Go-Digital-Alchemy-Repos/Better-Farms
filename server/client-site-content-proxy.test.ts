import assert from "node:assert/strict";
import test from "node:test";
import {
  getCorePlatformApiOrigin,
  proxyFundAFarmContent,
  proxyPlatformFormSubmission,
} from "./client-site-content-proxy";

class TestResponse {
  statusCode: number | undefined;
  contentType: string | undefined;
  cacheControl: string | undefined;
  body: unknown;

  status(code: number) {
    this.statusCode = code;
    return this;
  }

  type(value: string) {
    this.contentType = value;
    return this;
  }

  setHeader(name: string, value: string) {
    if (name.toLowerCase() === "cache-control") this.cacheControl = value;
    return this;
  }

  end() {
    return this;
  }

  json(value: unknown) {
    this.body = value;
    return this;
  }

  send(value: unknown) {
    this.body = value;
    return this;
  }
}

test("content proxy exposes an empty publication when Core is intentionally unconfigured", async () => {
  const response = new TestResponse();
  const previousOrigin = process.env.CORE_PLATFORM_API_ORIGIN;
  delete process.env.CORE_PLATFORM_API_ORIGIN;

  try {
    await proxyFundAFarmContent({ get: () => undefined } as Request, response as unknown as Response);
  } finally {
    if (previousOrigin === undefined) delete process.env.CORE_PLATFORM_API_ORIGIN;
    else process.env.CORE_PLATFORM_API_ORIGIN = previousOrigin;
  }

  assert.equal(response.statusCode, 204);
  assert.equal(response.cacheControl, "no-store");
});

test("Core Platform API origin requires HTTPS except for loopback development", () => {
  assert.equal(
    getCorePlatformApiOrigin("https://core.example.org"),
    "https://core.example.org",
  );
  assert.equal(
    getCorePlatformApiOrigin("http://127.0.0.1:5001"),
    "http://127.0.0.1:5001",
  );
  assert.equal(getCorePlatformApiOrigin("http://core.example.org"), null);
  assert.equal(
    getCorePlatformApiOrigin("https://user:secret@core.example.org"),
    null,
  );
  assert.equal(getCorePlatformApiOrigin("https://core.example.org/api"), null);
});

test("contact proxy forwards only the validated managed-form payload", async () => {
  const response = new TestResponse();
  let upstreamUrl = "";
  let upstreamInit: RequestInit | undefined;

  await proxyPlatformFormSubmission(
    {
      body: {
        name: "Ada Lovelace",
        email: "ada@example.org",
        subject: "Better Farms website inquiry",
        message: "Hello",
      },
    } as Request,
    response as unknown as Response,
    "/api/contact",
    {
      corePlatformApiOrigin: "https://core.example.org",
      corePlatformFormProxyToken: "test-client-form-proxy-token",
      fetcher: async (url, init) => {
        upstreamUrl = String(url);
        upstreamInit = init;
        return new Response(JSON.stringify({ message: "Message received" }), {
          status: 201,
          headers: { "content-type": "application/json" },
        });
      },
    },
  );

  assert.equal(
    upstreamUrl,
    "https://core.example.org/api/client-forms/better-farms-foundation/contact",
  );
  assert.equal(upstreamInit?.method, "POST");
  assert.deepEqual(upstreamInit?.headers, {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Client-Form-Proxy-Token": "test-client-form-proxy-token",
  });
  assert.deepEqual(JSON.parse(String(upstreamInit?.body)), {
    name: "Ada Lovelace",
    email: "ada@example.org",
    subject: "Better Farms website inquiry",
    message: "Hello",
  });
  assert.equal(response.statusCode, 201);
  assert.equal(response.contentType, "application/json");
  assert.equal(response.body, '{"message":"Message received"}');
});

test("form proxy rejects unexpected payload fields before contacting Core", async () => {
  const response = new TestResponse();
  let contacted = false;

  await proxyPlatformFormSubmission(
    { body: { email: "ada@example.org", source: "untrusted" } } as Request,
    response as unknown as Response,
    "/api/forms/newsletter-signup/submit",
    {
      corePlatformApiOrigin: "https://core.example.org",
      corePlatformFormProxyToken: "test-client-form-proxy-token",
      fetcher: async () => {
        contacted = true;
        return new Response();
      },
    },
  );

  assert.equal(contacted, false);
  assert.equal(response.statusCode, 400);
  assert.deepEqual(response.body, {
    message: "Please review the form and try again.",
  });
});

test("form proxy reports an unavailable upstream without a false success", async () => {
  const response = new TestResponse();

  await proxyPlatformFormSubmission(
    { body: { email: "ada@example.org" } } as Request,
    response as unknown as Response,
    "/api/forms/newsletter-signup/submit",
    {
      corePlatformApiOrigin: "https://core.example.org",
      corePlatformFormProxyToken: "test-client-form-proxy-token",
      fetcher: async () => {
        throw new Error("network unavailable");
      },
    },
  );

  assert.equal(response.statusCode, 503);
  assert.deepEqual(response.body, {
    message: "Form submission is temporarily unavailable.",
  });
});

test("form proxy does not contact Core without its server-only token", async () => {
  const response = new TestResponse();
  let contacted = false;

  await proxyPlatformFormSubmission(
    { body: { email: "ada@example.org" } } as Request,
    response as unknown as Response,
    "/api/forms/newsletter-signup/submit",
    {
      corePlatformApiOrigin: "https://core.example.org",
      fetcher: async () => {
        contacted = true;
        return new Response();
      },
    },
  );

  assert.equal(contacted, false);
  assert.equal(response.statusCode, 503);
  assert.deepEqual(response.body, {
    message: "Form submission is temporarily unavailable.",
  });
});
