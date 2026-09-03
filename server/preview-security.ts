export function getTrustedAdminOrigin(
  value: string | undefined,
): string | null {
  if (!value?.trim()) return null;
  try {
    const url = new URL(value.trim());
    const localHttp =
      url.protocol === "http:" &&
      ["127.0.0.1", "localhost"].includes(url.hostname);
    if (
      (!localHttp && url.protocol !== "https:") ||
      url.username ||
      url.password ||
      url.pathname !== "/" ||
      url.search ||
      url.hash
    ) {
      return null;
    }
    return url.origin;
  } catch {
    return null;
  }
}
