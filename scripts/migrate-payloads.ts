/**
 * 既存の静的データをmicroCMSのスキーマ形へ詰め替える純粋関数群。
 * ネットワークも環境変数も触らないので、単体でテストできる。
 */
import { marked } from "marked";

export interface LegacyContent {
  id: number;
  title: string;
  description: string;
  content: string;
  image: string;
  category: string;
  categoryLabel: string;
  tags: string[];
  publishedAt: string;
}

export interface LegacyJob {
  id: number;
  title: string;
  department: string;
  departmentDescription: string;
  type: string;
  description: string;
  background: string;
  requirements: string[];
  responsibilities: string[];
  salary: string;
  location: string;
  employmentType: string;
  welcomeSkills?: string[];
  devEnvironment?: {
    tech: string[];
    versionControl: string[];
    designTools: string[];
    workStyle: string[];
  };
  appealPoints?: string[];
  workHours?: string;
  holidays?: string;
  trialPeriod?: string;
  benefits?: string[];
  selectionProcess?: string[];
}

export type EmploymentCategory = "career" | "graduate";

export interface ContentPayload {
  contentId: string;
  content: Record<string, unknown>;
  /** 管理画面から手動でアップロードする画像のパス */
  imageToUploadManually: string;
}

export interface JobPayload {
  contentId: string;
  content: Record<string, unknown>;
}

/**
 * サイト表記の YYYY.MM.DD を、日本時間0時を指すISO 8601へ変換する。
 * UTC0時にするとCMS側の表示が前日になるため、9時間ずらす。
 */
export function toIso(dotted: string): string {
  const match = /^(\d{4})\.(\d{2})\.(\d{2})$/.exec(dotted);
  if (!match) {
    throw new Error(`日付の形式が YYYY.MM.DD ではありません: ${dotted}`);
  }

  const [, year, month, day] = match;
  const jstMidnight = Date.UTC(Number(year), Number(month) - 1, Number(day)) - 9 * 60 * 60 * 1000;
  return new Date(jstMidnight).toISOString();
}

/** 既存の簡易Markdown本文をリッチエディタ用のHTMLに変換する */
export function markdownToHtml(markdown: string): string {
  if (!markdown) return "";
  return (marked.parse(markdown, { async: false }) as string).trim();
}

/** 任意フィールドを、値があるときだけオブジェクトに含める */
function optional(key: string, value: unknown): Record<string, unknown> {
  return value === undefined ? {} : { [key]: value };
}

export function buildContentPayload(item: LegacyContent): ContentPayload {
  return {
    // contentIdに既存の数値IDを指定して /contents/25 等のURLを維持する
    contentId: String(item.id),
    content: {
      title: item.title,
      description: item.description,
      body: markdownToHtml(item.content),
      // セレクトフィールドは配列で送る
      category: [item.category],
      tags: item.tags,
      displayDate: toIso(item.publishedAt),
      // categoryLabelはサイト側で導出するため送らない
      // imageは管理画面から手動アップロードするため送らない
    },
    imageToUploadManually: item.image,
  };
}

export function buildJobPayload(job: LegacyJob, category: EmploymentCategory): JobPayload {
  const slug = String(job.id);

  return {
    // slugは career / graduate で重複しうるため、contentIdは区分を付けて一意にする
    contentId: `${category}-${slug}`,
    content: {
      slug,
      employmentCategory: [category],
      title: job.title,
      department: job.department,
      departmentDescription: job.departmentDescription,
      type: job.type,
      description: job.description,
      background: job.background,
      requirements: job.requirements,
      responsibilities: job.responsibilities,
      salary: job.salary,
      location: job.location,
      employmentType: job.employmentType,
      ...optional("welcomeSkills", job.welcomeSkills),
      ...optional("appealPoints", job.appealPoints),
      ...optional("workHours", job.workHours),
      ...optional("holidays", job.holidays),
      ...optional("trialPeriod", job.trialPeriod),
      ...optional("benefits", job.benefits),
      ...optional("selectionProcess", job.selectionProcess),
      ...optional(
        "devEnvironment",
        job.devEnvironment ? { fieldId: "devEnvironment", ...job.devEnvironment } : undefined
      ),
    },
  };
}
