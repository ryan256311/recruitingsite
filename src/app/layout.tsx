import type { Metadata } from "next";
import { ALLOW_INDEXING, SITE_NAME, SITE_URL } from "./lib/site";
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description:
    "福井県の株式会社エクシートの採用サイトです。募集中の求人や、社員インタビュー・働く環境をご紹介します。",
  // 公開前は検索結果に出さない。公開日に ALLOW_INDEXING を設定して切り替える（src/app/lib/site.ts）
  robots: ALLOW_INDEXING
    ? { index: true, follow: true }
    : {
        index: false,
        follow: false,
        nocache: true,
        googleBot: { index: false, follow: false, noimageindex: true },
      },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} ${roboto.variable}`}>
      <body>{children}</body>
    </html>
  );
}
