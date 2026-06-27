export const REFERENCES = [
  {
    key: "maisonNo1",
    url: "https://maisonno1.com",
  },
] as const;

export type ReferenceKey = (typeof REFERENCES)[number]["key"];

export type Reference = (typeof REFERENCES)[number];

export function getHostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function getDisplayUrl(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}
