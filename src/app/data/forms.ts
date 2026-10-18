/**
 * お問い合わせはGoogleフォームで受け付ける。用途ごとに2つある。
 *
 *   応募フォーム   … 新卒・キャリアの応募／カジュアル面談
 *   会社見学フォーム … 会社見学の申し込み
 *
 * 応募フォームは、CTAに応じて「お問い合わせ種別」「採用区分」を
 * 事前選択した状態で開く。「キャリア採用エントリー」を押した人が
 * フォームで選び直す必要がない。
 *
 * フォームを作り直すとURLと設問IDが変わる。その場合は
 * scripts/apps-script/create-form.gs を参照して、ここを更新する。
 */

const APPLICATION_FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLSe5hVP2LMD06MjY2Vo4hZTs_tmVVMB8bO_J_VADo-mnrkWdEg/viewform";

const COMPANY_VISIT_FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLSePpHJscnb_yEq2D2V44-Ol7EO3iZQtebzp7IiHXf2BLRqEvA/viewform";

/** 応募フォームの設問に対応するID */
const APPLICATION_ENTRY = {
  inquiryType: "entry.27753636",
  recruitmentType: "entry.1673321987",
} as const;

function prefilledApplication(inquiryType: string, recruitmentType: string): string {
  const params = new URLSearchParams({
    "usp": "pp_url",
    [APPLICATION_ENTRY.inquiryType]: inquiryType,
    [APPLICATION_ENTRY.recruitmentType]: recruitmentType,
  });
  return `${APPLICATION_FORM}?${params.toString()}`;
}

export const CONTACT_FORM_URLS = {
  /** キャリア採用のエントリー */
  career: prefilledApplication("選考への応募", "キャリア採用"),
  /** 新卒採用のエントリー */
  graduate: prefilledApplication("選考への応募", "新卒採用"),
  /** 会社見学の申し込み（別フォーム） */
  companyVisit: COMPANY_VISIT_FORM,
} as const;

/** 外部サイトを新しいタブで開くリンクに付ける属性 */
export const EXTERNAL_LINK_PROPS = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;
