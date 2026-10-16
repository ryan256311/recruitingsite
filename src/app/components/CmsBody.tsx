import { sanitizeCmsHtml } from "../lib/html";

interface CmsBodyProps {
  html: string;
  className?: string;
}

/**
 * CMSのリッチエディタ本文を描画する。サニタイズはここで必ず通す。
 *
 * "use client" を付けないこと。サーバー側で描画すれば、
 * サニタイズ後のHTMLだけがブラウザへ渡る。
 */
export default function CmsBody({ html, className }: CmsBodyProps) {
  return (
    <div
      className={`cms-body${className ? ` ${className}` : ""}`}
      dangerouslySetInnerHTML={{ __html: sanitizeCmsHtml(html) }}
    />
  );
}
