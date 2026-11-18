import type { Job } from "../../data/jobs";
import { getCmsClient } from "./client";
import { fetchAll, type CmsListResponse } from "./fetchAll";

const ENDPOINT = "jobs";

export type EmploymentCategory = "career" | "graduate";

/**
 * microCMS「採用の種類」の選択肢 → 内部ID。
 * 管理画面では日本語を選ばせる。英語は置き換え前の値で、巻き戻したときにも表示が崩れないよう残す。
 */
const EMPLOYMENT_CATEGORY_BY_VALUE: Record<string, EmploymentCategory> = {
  キャリア採用: "career",
  新卒採用: "graduate",
  career: "career",
  graduate: "graduate",
};

/** 選択肢の値を内部IDに変換する。知らない値は捨てる */
export function toEmploymentCategories(values: string[] | undefined): EmploymentCategory[] {
  return (values ?? []).flatMap((v) => {
    const id = EMPLOYMENT_CATEGORY_BY_VALUE[v];
    return id ? [id] : [];
  });
}

function isInCategory(cms: CmsJob, category: EmploymentCategory): boolean {
  return toEmploymentCategories(cms.employmentCategory).includes(category);
}

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

/** 拡張フィールド「募集背景・部署について・仕事内容・応募資格」(detailInfo) の中身 */
export interface CmsDetailInfo {
  background?: string;
  departmentDesc?: string;
  responsibilities?: string;
  requirements?: string;
}

/** 拡張フィールド「歓迎するスキル・開発環境・アピールポイント」(skillInfo) の中身 */
export interface CmsSkillInfo {
  welcomeSkills?: string;
  devTech?: string;
  devVersionControl?: string;
  devDesignTools?: string;
  devWorkStyle?: string;
  appealPoints?: string;
}

/** 拡張フィールド「待遇・福利厚生・選考フロー」(benefitInfo) の中身 */
export interface CmsBenefitInfo {
  benefits?: string;
  selectionProcess?: string;
}

export interface CmsJob {
  id: string;
  slug: string;
  /** キャリア採用ページに載せるか。未設定の求人はAPIから返らないため載せない */
  showOnCareer?: boolean;
  /** microCMSが付ける、最初に公開した日時 */
  publishedAt?: string;
  /** セレクトフィールドは単一選択でも配列で返る */
  employmentCategory: string[];
  /** 【冒頭】基本情報（拡張フィールド） */
  basicInfo?: CmsBasicInfo | null;
  /** 【募集要項】（拡張フィールド） */
  recruitInfo?: CmsRecruitInfo | null;
  detailInfo?: CmsDetailInfo | null;
  skillInfo?: CmsSkillInfo | null;
  benefitInfo?: CmsBenefitInfo | null;
}

/** 開発環境は4つのフィールドから組み立てる。すべて空なら欄ごと出さない */
function toDevEnvironment(cms: CmsSkillInfo): Job["devEnvironment"] {
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

  const basic: CmsBasicInfo = cms.basicInfo ?? {};
  const recruit: CmsRecruitInfo = cms.recruitInfo ?? {};
  // 旧フィールドは削除済み。APIに残骸が返っても読まない
  const detail: CmsDetailInfo = cms.detailInfo ?? {};
  const skill: CmsSkillInfo = cms.skillInfo ?? {};
  const benefit: CmsBenefitInfo = cms.benefitInfo ?? {};
  if (!basic.title) return null;

  return {
    slug: cms.slug,
    postedAt: cms.publishedAt,
    title: basic.title,
    showOnCareer: cms.showOnCareer === true,
    department: basic.department ?? "",
    departmentDescription: detail.departmentDesc ?? "",
    type: basic.type ?? "",
    description: basic.description ?? "",
    background: detail.background ?? "",
    requirements: toLines(detail.requirements),
    responsibilities: toLines(detail.responsibilities),
    salary: recruit.salary ?? "",
    location: recruit.location ?? "",
    employmentType: recruit.employmentType ?? "",
    welcomeSkills: toOptionalLines(skill.welcomeSkills),
    appealPoints: toOptionalLines(skill.appealPoints),
    workHours: toOptionalText(recruit.workHours),
    holidays: toOptionalText(recruit.holidays),
    trialPeriod: toOptionalText(recruit.trialPeriod),
    benefits: toOptionalLines(benefit.benefits),
    selectionProcess: toOptionalLines(benefit.selectionProcess),
    devEnvironment: toDevEnvironment(skill),
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
  // 選択肢の表記（日本語／英語）に左右されないよう、APIでは絞り込まずに全件取って判定する（求人は数件のみ）
  const contents = await fetchAll<CmsJob>(({ limit, offset }) =>
    getCmsClient().getList<CmsJob>({
      endpoint: ENDPOINT,
      // 並び順は作成した順（古い順）。URL名（slug）の文字順にすると、名前の付け方で順番が変わってしまうため
      queries: { limit, offset, orders: "createdAt" },
      customRequestInit: { next: { tags: [ENDPOINT] } },
    }) as Promise<CmsListResponse<CmsJob>>
  );
  return mapValid(contents.filter((cms) => isInCategory(cms, category)));
}

export async function getJobBySlug(
  category: EmploymentCategory,
  slug: string
): Promise<Job | null> {
  // キャリア採用と新卒採用で同じ番号を使える。番号で取ってから採用の種類で絞る
  const response = await getCmsClient().getList<CmsJob>({
    endpoint: ENDPOINT,
    queries: { limit: 100, filters: `slug[equals]${slug}` },
    customRequestInit: { next: { tags: [ENDPOINT] } },
  });

  const first = response.contents.find((cms) => isInCategory(cms, category));
  return first ? toJob(first) : null;
}
