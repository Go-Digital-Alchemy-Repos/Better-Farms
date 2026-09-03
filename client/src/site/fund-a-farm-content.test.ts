import assert from "node:assert/strict";
import test from "node:test";
import {
  ctaTargetSchema,
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
