import type { ReactNode } from "react";
import { Noto_Sans_JP, Roboto } from "next/font/google";

import "../styles/index.css";

// 自己ホストフォント(Google Fontsの外部リクエスト/レンダリングブロックを排除)。
// Noto Sans JP は日本語のためサブセットpreload不可 → preload:false。
// 参照は CSS 変数 var(--font-noto) / var(--font-roboto) 経由。
const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-noto",
  preload: false,
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata = {
  title: "Recruitment Site",
  description: "採用サイト",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} ${roboto.variable}`}>
      <body>{children}</body>
    </html>
  );
}
