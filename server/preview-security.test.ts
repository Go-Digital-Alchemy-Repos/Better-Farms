import assert from "node:assert/strict";
import test from "node:test";
import { getTrustedAdminOrigin } from "./preview-security";

test("accepts HTTPS and loopback admin origins", () => {
  assert.equal(
    getTrustedAdminOrigin("https://admin.example.com"),
    "https://admin.example.com",
  );
  assert.equal(
    getTrustedAdminOrigin("http://127.0.0.1:4180"),
    "http://127.0.0.1:4180",
  );
});

test("rejects insecure remote, credential-bearing, and path-bearing values", () => {
  assert.equal(getTrustedAdminOrigin("http://admin.example.com"), null);
  assert.equal(
    getTrustedAdminOrigin("https://user:pass@admin.example.com"),
    null,
  );
  assert.equal(getTrustedAdminOrigin("https://admin.example.com/path"), null);
});
