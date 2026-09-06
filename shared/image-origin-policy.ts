/** Exact HTTPS origins only; preview's loopback HTTP exception does not authorize image hosts. */
export function getTrustedImageOrigin(
  value: string | undefined,
): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" &&
      !url.username &&
      !url.password &&
      !url.hostname.includes("*") &&
      url.origin === value
      ? value
      : null;
  } catch {
    return null;
  }
}

export function isAllowedHeroImage(
  value: string,
  configuredAdminOrigin?: string,
): boolean {
  if (/^\/(?!\/)[^\s\\\u0000-\u001f\u007f]*$/.test(value)) return true;
  const trusted = getTrustedImageOrigin(configuredAdminOrigin);
  if (!trusted || /[\s\\\u0000-\u001f\u007f]/.test(value)) return false;
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      !url.username &&
      !url.password &&
      url.origin === trusted
    );
  } catch {
    return false;
  }
}

export function heroImageSources(configuredAdminOrigin?: string): string[] {
  const trusted = getTrustedImageOrigin(configuredAdminOrigin);
  return ["'self'", "data:", ...(trusted ? [trusted] : [])];
}
