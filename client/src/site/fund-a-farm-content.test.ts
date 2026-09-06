import {
  heroImageSources,
  getTrustedImageOrigin,
} from "../../../shared/image-origin-policy";
import assert from "node:assert/strict";
import test from "node:test";
import {
  ctaTargetSchema,
  createFundAFarmContentSchema,
  defaultFundAFarmContent,
  fundAFarmContentSchema,
} from "./fund-a-farm-content";
import { betterFarmsPuckRegistry } from "./puck-registry";
import { parseFundAFarmPreviewMessage } from "./client-site-preview";
import { fetchPublishedFundAFarmContent } from "./client-site-content";

test("default Fund a Farm content satisfies the editable contract", () => {
  assert.deepEqual(
    fundAFarmContentSchema.parse(defaultFundAFarmContent),
    defaultFundAFarmContent,
  );
});

test("CTA targets allow site paths and credential-free HTTPS URLs", () => {
  assert.equal(ctaTargetSchema.parse("/contact"), "/contact");
  assert.equal(
    ctaTargetSchema.parse("https://donate.example.org/campaign"),
    "https://donate.example.org/campaign",
  );
});

test("CTA targets reject script, protocol-relative, and credential-bearing URLs", () => {
  for (const target of [
    "javascript:alert(1)",
    "//malicious.example",
    "http://donate.example.org",
    "https://user:password@donate.example.org",
  ]) {
    assert.equal(ctaTargetSchema.safeParse(target).success, false, target);
  }
});

test("editable content requires image alt text and rejects behavior overrides", () => {
  assert.equal(
    fundAFarmContentSchema.safeParse({
      ...defaultFundAFarmContent,
      heroImage: { ...defaultFundAFarmContent.heroImage, alt: "" },
    }).success,
    false,
  );
  assert.equal(
    fundAFarmContentSchema.safeParse({
      ...defaultFundAFarmContent,
      submissionHandler: "https://malicious.example",
    }).success,
    false,
  );
});

test("Puck metadata exposes content fields while locking site behavior", () => {
  const registration = betterFarmsPuckRegistry.components["fund-a-farm-page"];

  assert.deepEqual(Object.keys(registration.fields), [
    "heading",
    "introductionLead",
    "introductionBody",
    "cta.label",
    "cta.target",
    "impactStatement",
    "heroImage.src",
    "heroImage.alt",
  ]);
  assert.ok(registration.lockedBehaviors.includes("site-shell"));
  assert.ok(registration.lockedBehaviors.includes("submission"));
  assert.ok(registration.lockedBehaviors.includes("aria-semantics"));
  assert.deepEqual(
    registration.validate(defaultFundAFarmContent),
    defaultFundAFarmContent,
  );
  assert.throws(() =>
    registration.render({
      ...defaultFundAFarmContent,
      cta: { label: "Unsafe", target: "javascript:alert(1)" },
    }),
  );
});

test("preview bridge accepts only the trusted origin and exact component contract", () => {
  const message = {
    type: "core-platform:client-site-preview",
    protocolVersion: "1.0",
    clientStackId: "better-farms-foundation",
    routeId: "fund-a-farm",
    componentKey: "fund-a-farm-page",
    revision: 1,
    content: defaultFundAFarmContent,
  };

  assert.deepEqual(
    parseFundAFarmPreviewMessage(
      message,
      "https://admin.better-farms.example",
      "https://admin.better-farms.example",
    ),
    defaultFundAFarmContent,
  );
  assert.equal(
    parseFundAFarmPreviewMessage(
      message,
      "https://malicious.example",
      "https://admin.better-farms.example",
    ),
    null,
  );
  assert.equal(
    parseFundAFarmPreviewMessage(
      { ...message, componentKey: "arbitrary-jsx" },
      "https://admin.better-farms.example",
      "https://admin.better-farms.example",
    ),
    null,
  );
});

test("published content loader accepts only a valid matching envelope", async () => {
  const fetcher = async () =>
    new Response(
      JSON.stringify({
        stackId: "better-farms-foundation",
        routeId: "fund-a-farm",
        componentKey: "fund-a-farm-page",
        revision: 4,
        publishedAt: new Date().toISOString(),
        content: { ...defaultFundAFarmContent, heading: "Published heading" },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  assert.equal(
    (await fetchPublishedFundAFarmContent(fetcher as typeof fetch)).heading,
    "Published heading",
  );
});

test("published content loader falls back on API failure and invalid content", async () => {
  const unavailable = async () => new Response("unavailable", { status: 503 });
  const invalid = async () =>
    new Response(JSON.stringify({ content: { heading: "partial" } }), {
      status: 200,
    });
  assert.deepEqual(
    await fetchPublishedFundAFarmContent(unavailable as typeof fetch),
    defaultFundAFarmContent,
  );
  assert.deepEqual(
    await fetchPublishedFundAFarmContent(invalid as typeof fetch),
    defaultFundAFarmContent,
  );
});

test("internal image and CTA paths reject browser host escapes and controls", () => {
  for (const value of [
    String.raw`/\example.test/image`,
    String.raw`/\user:pass@example.test/image`,
    "/image\u0000.png",
    "/image\u007f.png",
  ]) {
    assert.equal(ctaTargetSchema.safeParse(value).success, false);
    assert.equal(
      fundAFarmContentSchema.safeParse({
        ...defaultFundAFarmContent,
        heroImage: { src: value, alt: "Test image" },
      }).success,
      false,
    );
  }
});

test("hero images require the exact configured Core HTTPS origin and preserve local paths", () => {
  const origin = "https://dashboard.better-farms.example";
  const schema = createFundAFarmContentSchema(origin);
  for (const src of [
    "/image.webp",
    `${origin}/r2/clients/better-farms/uploads/image.webp`,
  ]) {
    assert.equal(
      schema.safeParse({
        ...defaultFundAFarmContent,
        heroImage: { src, alt: "Farm" },
      }).success,
      true,
    );
  }
  for (const src of [
    "https://dashboard.better-farms.example.evil.test/a",
    `${origin}:444/a`,
    "https://user:pass@dashboard.better-farms.example/a",
    "http://dashboard.better-farms.example/a",
    "https://other.example/a",
    String.raw`https://dashboard.better-farms.example\image`,
    String.raw`/\evil.test/a`,
    "/image\u0000.png",
    "https://dashboard.better-farms.example/\u007fa",
  ]) {
    assert.equal(
      schema.safeParse({
        ...defaultFundAFarmContent,
        heroImage: { src, alt: "Farm" },
      }).success,
      false,
      src,
    );
  }
  assert.deepEqual(heroImageSources(origin), ["'self'", "data:", origin]);
  assert.equal(
    createFundAFarmContentSchema().safeParse({
      ...defaultFundAFarmContent,
      heroImage: { src: `${origin}/a`, alt: "Farm" },
    }).success,
    false,
  );
});

test("invalid configured image origins fail closed and build/runtime disagreement cannot widen acceptance", () => {
  for (const origin of [
    undefined,
    "https://*.example",
    "https://HOST.example",
    "https://host.example/",
    "https://host.example:443",
    "http://127.0.0.1:5000",
    "https://user:pass@host.example",
  ]) {
    assert.equal(getTrustedImageOrigin(origin), null);
    assert.deepEqual(heroImageSources(origin), ["'self'", "data:"]);
  }
  const built = createFundAFarmContentSchema("https://build.example");
  const runtimeSources = heroImageSources("https://runtime.example");
  assert.equal(
    built.safeParse({
      ...defaultFundAFarmContent,
      heroImage: { src: "https://runtime.example/a", alt: "Farm" },
    }).success,
    false,
  );
  assert.equal(runtimeSources.includes("https://build.example"), false);
});
