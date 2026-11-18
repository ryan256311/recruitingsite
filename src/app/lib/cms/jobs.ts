import type { Job } from "../../data/jobs";
import { getCmsClient } from "./client";
import { fetchAll, type CmsListResponse } from "./fetchAll";

const ENDPOINT = "jobs";

export type EmploymentCategory = "career" | "graduate";

/**
 * 箇条書き項目が取りうる形。
 *
 * 現在のスキーマはテキストエリア（1行に1項目）なので文字列で返るが、
 * 将来スキーマを繰り返しフィールドに変えても壊れないよう、
 * 配列形式（microCMSの繰り返しフィールドは [{fieldId, value}] を返す）も受け付ける。
 */
export type CmsLines = string | string[] | { fieldId?: string; value?: string }[] | undefined;

/** 箇条書き項目を文字列配列に正規化する。空行と前後の空白は落とす */
export function toLines(value: CmsLines): string[] {
  if (!value) return [];

  const raw: string[] = Array.isArray(value)
    ? value.map((item) => (typeof item === "string" ? item : item?.value ?? ""))
    : value.split(/\r?\n/);

  return raw.map((line) => line.trim()).filter((line) => line.length > 0);
}

/** 任意項目用。空なら undefined を返し、サイト側でその欄ごと非表示にする */
function toOptionalLines(value: CmsLines): string[] | undefined {
  const lines = toLines(value);
  return lines.length > 0 ? lines : undefined;
}

/**
 * 拡張フィールド「【冒頭】基本情報」(basicInfo) の中身。
 * 編集画面で短い項目を横並びにするため、旧 title / department / type / description をまとめた。
 */
export interface CmsBasicInfo {
  title?: string;
  department?: string;
  type?: string;
  description?: string;
}

/**
 * 拡張フィールド「【募集要項】」(recruitInfo) の中身。
 * 旧 employmentType / location / salary / workHours / holidays / trialPeriod をまとめた。
 */
export interface CmsRecruitInfo {
  employmentType?: string;
  location?: string;
  salary?: string;
  workHours?: string;
  holidays?: string;
  trialPeriod?: string;
}

export interface CmsJob {
  id: string;
  slug: string;
  /** キャリア採用ページに載せるか。未設定の求人はAPIから返らないため載せない */
  showOnCareer?: boolean;
  /** セレクトフィールドは単一選択でも配列で返る */
  employmentCategory: string[];
  /** 【冒頭】基本情報（拡張フィールド） */
  basicInfo?: CmsBasicInfo | null;
  /** 【募集要項】（拡張フィールド） */
  recruitInfo?: CmsRecruitInfo | null;
  /** microCMSのフィールドIDは20文字以内のため短縮している */
  departmentDesc?: string;
  background?: string;
  requirements?: CmsLines;
  responsibilities?: CmsLines;
  welcomeSkills?: CmsLines;
  appealPoints?: CmsLines;
  benefits?: CmsLines;
  selectionProcess?: CmsLines;
  devTech?: CmsLines;
  devVersionControl?: CmsLines;
  devDesignTools?: CmsLines;
  devWorkStyle?: CmsLines;
}

/** 開発環境は4つのフィールドから組み立てる。すべて空なら欄ごと出さない */
function toDevEnvironment(cms: CmsJob): Job["devEnvironment"] {
  const tech = toLines(cms.devTech);
  const versionControl = toLines(cms.devVersionControl);
  const designTools = toLines(cms.devDesignTools);
  const workStyle = toLines(cms.devWorkStyle);

  const hasAny =
    tech.length > 0 ||
    versionControl.length > 0 ||
    designTools.length > 0 ||
    workStyle.length > 0;

  // JobDetailが4つの配列を前提にmapするため、部分欠落は空配列で埋める
  return hasAny ? { tech, versionControl, designTools, workStyle } : undefined;
}

/** 任意の1行項目用。空白だけなら undefined にして、サイト側でその行ごと非表示にする */
function toOptionalText(value: string | undefined): string | undefined {
  return value && value.trim().length > 0 ? value : undefined;
}

/** CMSレスポンスを既存のJobへ変換する。必須が欠けていればnull */
export function toJob(cms: CmsJob): Job | null {
  if (!cms.slug) return null;

  // 旧フィールド（title など）は削除済み。APIに残骸が返っても読まない
  const basic: CmsBasicInfo = cms.basicInfo ?? {};
  const recruit: CmsRecruitInfo = cms.recruitInfo ?? {};
  if (!basic.title) return null;

  return {
    slug: cms.slug,
    title: basic.title,
    showOnCareer: cms.showOnCareer === true,
    department: basic.department ?? "",
    departmentDescription: cms.departmentDesc ?? "",
    type: basic.type ?? "",
    description: basic.description ?? "",
    background: cms.background ?? "",
    requirements: toLines(cms.requirements),
    responsibilities: toLines(cms.responsibilities),
    salary: recruit.salary ?? "",
    location: recruit.location ?? "",
    employmentType: recruit.employmentType ?? "",
    welcomeSkills: toOptionalLines(cms.welcomeSkills),
    appealPoints: toOptionalLines(cms.appealPoints),
    workHours: toOptionalText(recruit.workHours),
    holidays: toOptionalText(recruit.holidays),
    trialPeriod: toOptionalText(recruit.trialPeriod),
    benefits: toOptionalLines(cms.benefits),
    selectionProcess: toOptionalLines(cms.selectionProcess),
    devEnvironment: toDevEnvironment(cms),
  };
}

function mapValid(list: CmsJob[]): Job[] {
  return list.flatMap((cms) => {
    const job = toJob(cms);
    if (!job) {
      console.error(`[cms] 求人 ${cms.id} に必須フィールドの欠落があるため一覧から除外しました`);
      return [];
    }
    return [job];
  });
}

export async function getJobs(category: EmploymentCategory): Promise<Job[]> {
  const contents = await fetchAll<CmsJob>(({ limit, offset }) =>
    getCmsClient().getList<CmsJob>({
      endpoint: ENDPOINT,
      queries: {
        limit,
        offset,
        // セレクトフィールドは配列で格納されるため equals ではなく contains を使う
        filters: `employmentCategory[contains]${category}`,
        orders: "slug",
      },
      customRequestInit: { next: { tags: [ENDPOINT] } },
    }) as Promise<CmsListResponse<CmsJob>>
  );
  return mapValid(contents);
}

export async function getJobBySlug(
  category: EmploymentCategory,
  slug: string
): Promise<Job | null> {
  const response = await getCmsClient().getList<CmsJob>({
    endpoint: ENDPOINT,
    queries: {
      limit: 1,
      filters: `employmentCategory[contains]${category}[and]slug[equals]${slug}`,
    },
    customRequestInit: { next: { tags: [ENDPOINT] } },
  });

  const first = response.contents[0];
  return first ? toJob(first) : null;
}
