import type { ReactNode } from "react";

import "../styles/index.css";

export const metadata = {
  title: "Recruitment Site",
  description: "採用サイト",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
