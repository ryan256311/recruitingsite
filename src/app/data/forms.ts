/**
 * お問い合わせはGoogleフォームで受け付ける。
 *
 * CTAごとに「お問い合わせ種別」「採用区分」を事前選択した状態で開くので、
 * 「キャリア採用エントリー」を押した人がフォームで選び直す必要がない。
 *
 * URLを作り直すときは scripts/apps-script/create-form.gs の
 * getPrefilledUrls() を実行して、その出力をここに貼る。
 */

const FORM_BASE =
  "https://docs.google.com/forms/d/e/1FAIpQLSeaN6kgjBVGNF3VvJ2T_tQcv1eTdXLFI2yj78WCn6bLuhsgfg/viewform";

/** フォームの設問に対応するID（フォームを作り直すと変わる） */
const ENTRY = {
  inquiryType: "entry.1034807452",
  recruitmentType: "entry.1939094284",
} as const;

function prefilled(inquiryType?: string, recruitmentType?: string): string {
  const params = new URLSearchParams({ usp: "pp_url" });
  if (inquiryType) params.set(ENTRY.inquiryType, inquiryType);
  if (recruitmentType) params.set(ENTRY.recruitmentType, recruitmentType);
  return `${FORM_BASE}?${params.toString()}`;
}

export const CONTACT_FORM_URLS = {
  /** キャリア採用のエントリー */
  career: prefilled("選考への応募", "キャリア採用"),
  /** 新卒採用のエントリー */
  graduate: prefilled("選考への応募", "新卒採用"),
  /** 会社見学の申し込み */
  companyVisit: prefilled("会社見学"),
  /** 種別を決めずに開く場合 */
  default: FORM_BASE,
} as const;

/** 外部サイトを新しいタブで開くリンクに付ける属性 */
export const EXTERNAL_LINK_PROPS = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;
