import type { Job } from "../../data/jobs";
import { COMPANY_NAME, COMPANY_URL } from "../site";

/**
 * Google の求人向け構造化データ（JobPosting）を作る。
 * 仕様: https://developers.google.com/search/docs/appearance/structured-data/job-posting
 * 必須は title / description / datePosted / hiringOrganization / jobLocation（addressCountry）。
 * 必須が欠ける求人は null を返し、ページに出さない（不完全なデータはエラー扱いになるため）。
 */

const EMPLOYMENT_TYPES: Array<[RegExp, string]> = [
  [/正社員/, "FULL_TIME"],
  [/契約社員|嘱託/, "TEMPORARY"],
  [/パート|アルバイト/, "PART_TIME"],
  [/業務委託/, "CONTRACTOR"],
  [/インターン/, "INTERN"],
];

/** 「契約社員 / 正社員」のような表記から Google の雇用形態の値を取り出す */
export function toEmploymentTypes(text: string): string[] {
  const found = EMPLOYMENT_TYPES.filter(([re]) => re.test(text)).map(([, v]) => v);
  return found.length > 0 ? found : ["OTHER"];
}

const SALARY_UNIT: Record<string, string> = {
  時給: "HOUR",
  日給: "DAY",
  月給: "MONTH",
  年収: "YEAR",
  年俸: "YEAR",
};

function yen(num: string, man: string | undefined): number {
  const n = Number(num.replace(/,/g, ""));
  return man ? n * 10000 : n;
}

/**
 * 給与欄の1行目から金額を読み取る（例：「月給220,000円〜380,000円」「年収300万円〜」）。
 * 読み取れない書き方（「面談時にご説明します」など）は undefined。推測の金額は入れない。
 */
export function toBaseSalary(salary: string) {
  const line = salary.split(/\r?\n/)[0] ?? "";
  const m = line.match(
    /(時給|日給|月給|年収|年俸)\s*([\d,]+(?:\.\d+)?)\s*(万)?\s*円?\s*(?:[〜~～\-－]\s*(?:([\d,]+(?:\.\d+)?)\s*(万)?\s*円)?)?/
  );
  if (!m) return undefined;
  const unitText = SALARY_UNIT[m[1]];
  const min = yen(m[2], m[3]);
  const max = m[4] ? yen(m[4], m[5]) : undefined;
  if (!Number.isFinite(min) || min <= 0) return undefined;
  const value =
    max && max > min
      ? { "@type": "QuantitativeValue", minValue: min, maxValue: max, unitText }
      : { "@type": "QuantitativeValue", value: min, unitText };
  return { "@type": "MonetaryAmount", currency: "JPY", value };
}

/**
 * 勤務地欄の1行目を住所の項目に分ける（例：「福井県坂井市春江町中庄61-32（春江本社）」）。
 * 都道府県が読み取れなくても、国（JP）だけは必ず入れる。
 */
export function toPostalAddress(location: string) {
  const line = (location.split(/\r?\n/)[0] ?? "").replace(/（[^）]*）|\([^)]*\)/g, "").trim();
  const address: Record<string, string> = { "@type": "PostalAddress", addressCountry: "JP" };
  const pref = line.match(/^(北海道|東京都|京都府|大阪府|.{2,3}県)(.*)$/);
  if (!pref) return address;
  address.addressRegion = pref[1];
  const city = pref[2].match(/^(.+?郡.+?[町村]|.+?市.+?区|.+?[市区町村])(.*)$/);
  if (city) {
    address.addressLocality = city[1];
    if (city[2].trim()) address.streetAddress = city[2].trim();
  }
  return address;
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function para(heading: string, text: string | undefined): string {
  if (!text || !text.trim()) return "";
  return `<p>【${esc(heading)}】<br>${esc(text.trim()).replace(/\r?\n/g, "<br>")}</p>`;
}

function list(heading: string, items: string[] | undefined): string {
  if (!items || items.length === 0) return "";
  return `<p>【${esc(heading)}】</p><ul>${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;
}

/** 求人ページの各欄から、Google 向けの説明文（HTML）を組み立てる */
export function toJobDescriptionHtml(job: Job): string {
  return [
    job.description.trim() ? `<p>${esc(job.description.trim())}</p>` : "",
    para("募集背景", job.background),
    list("仕事内容", job.responsibilities),
    list("応募資格", job.requirements),
    list("歓迎するスキル・マインド", job.welcomeSkills),
    para("雇用形態", job.employmentType),
    para("給与", job.salary),
    para("勤務地", job.location),
    para("勤務時間", job.workHours),
    para("休日・休暇", job.holidays),
    para("試用期間", job.trialPeriod),
    list("待遇・福利厚生", job.benefits),
    list("選考フロー", job.selectionProcess),
  ].join("");
}

export function toJobPostingJsonLd(job: Job): Record<string, unknown> | null {
  if (!job.title || !job.postedAt) return null;
  const description = toJobDescriptionHtml(job);
  if (!description) return null;

  const data: Record<string, unknown> = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    title: job.title,
    description,
    datePosted: job.postedAt.slice(0, 10),
    hiringOrganization: { "@type": "Organization", name: COMPANY_NAME, sameAs: COMPANY_URL },
    jobLocation: { "@type": "Place", address: toPostalAddress(job.location) },
    employmentType: toEmploymentTypes(job.employmentType),
  };
  const baseSalary = toBaseSalary(job.salary);
  if (baseSalary) data.baseSalary = baseSalary;
  return data;
}

/** <script type="application/ld+json"> に埋め込む文字列。</script> による脱出を防ぐ */
export function serializeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
