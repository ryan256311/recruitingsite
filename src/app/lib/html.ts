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
    // target="_blank" や rel="noopener" が弾かれてしまう。
    // URI検証の対象外として明示する。
    ADD_URI_SAFE_ATTR: ["target", "rel"],
  });

  // target="_blank" のリンクに rel を補う（タブナビング対策）
  return clean.replace(/<a\s[^>]*>/gi, (tag) => {
    if (!tag.includes('target="_blank"')) return tag;
    if (/\srel=/i.test(tag)) return tag;
    return tag.replace(/>$/, ' rel="noopener noreferrer">');
  });
}
