import type { ReactNode } from "react";
import type { Metadata } from "next";
import { FAVICON_PATH, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [{ url: FAVICON_PATH, type: "image/png" }],
    shortcut: [{ url: FAVICON_PATH, type: "image/png" }],
    apple: [{ url: FAVICON_PATH, type: "image/png" }],
  },
};

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return children;
}
