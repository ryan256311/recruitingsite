import DOMPurify from "isomorphic-dompurify";

const ALLOWED_TAGS = [
  "h2", "h3", "h4",
  "p", "br", "hr",
  "strong", "em", "u", "s",
  "ul", "ol", "li",
  "a", "img",
  "blockquote",
  "table", "thead", "tbody", "tr", "th", "td",
];

const ALLOWED_ATTR = ["href", "target", "rel", "src", "alt", "width", "height"];

/**
 * microCMSのリッチエディタが返すHTMLを描画前に無害化する。
 *
 * CMSに書き込める人が訪問者のブラウザでスクリプトを実行できる状態を作らないため。
 * 担当者を信頼するかどうかとは別に、CMSアカウントが乗っ取られた場合の被害範囲を限定する。
 */
export function sanitizeCmsHtml(html: string): string {
  if (!html) return "";

  const clean = DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOWED_URI_REGEXP: /^(?:https?:|mailto:|tel:|\/|#)/i,
    // ALLOWED_URI_REGEXPはURI以外の属性値にも適用されるため、
    // target="_blank" や width="800" のような値が弾かれてしまう。
    // URIを持たない属性はここで検証の対象外にする。
    // （width/heightが落ちると、本文画像の読み込み時にレイアウトシフトが起きる）
    ADD_URI_SAFE_ATTR: ["target", "rel", "width", "height"],
  });

  // target="_blank" のリンクに rel を補う（タブナビング対策）
  const withRel = clean.replace(/<a\s[^>]*>/gi, (tag) => {
    if (!tag.includes('target="_blank"')) return tag;
    if (/\srel=/i.test(tag)) return tag;
    return tag.replace(/>$/, ' rel="noopener noreferrer">');
  });

  return addImageDeliveryQuery(withRel);
}

/**
 * microCMSの本文画像に配信サイズのクエリを付ける。
 *
 * 本文内の img は next/image の対象外なので、アップロード時の原寸がそのまま配信される。
 * スマートフォンでの閲覧が中心のサイトで数MBの画像を素通しにしないため、
 * microCMSの画像APIに幅とフォーマットを指定する。
 * 担当者が意図して付けたクエリは尊重し、既にクエリがあるURLには手を加えない。
 */
function addImageDeliveryQuery(html: string): string {
  return html.replace(
    /(<img\b[^>]*\ssrc=")(https:\/\/images\.microcms-assets\.io\/[^"?]+)(")/gi,
    (_match, before, url, after) => `${before}${url}?w=1000&fm=webp${after}`
  );
}
