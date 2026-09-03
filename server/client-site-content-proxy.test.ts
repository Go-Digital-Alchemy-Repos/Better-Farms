import assert from "node:assert/strict";
import test from "node:test";
import { getCorePlatformApiOrigin } from "./client-site-content-proxy";

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
