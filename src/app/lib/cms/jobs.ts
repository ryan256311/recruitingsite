import type { Job } from "../../data/jobs";
import { getCmsClient } from "./client";
import { fetchAll, type CmsListResponse } from "./fetchAll";

const ENDPOINT = "jobs";

export type EmploymentCategory = "career" | "graduate";

/** microCMSのカスタムフィールドは fieldId を伴って返る */
interface CmsDevEnvironment {
  fieldId: string;
  tech?: string[];
  versionControl?: string[];
  designTools?: string[];
  workStyle?: string[];
}

export interface CmsJob {
  id: string;
  slug: string;
  /** セレクトフィールドは単一選択でも配列で返る */
  employmentCategory: string[];
  title: string;
  department?: string;
  departmentDescription?: string;
  type?: string;
  description?: string;
  background?: string;
  requirements?: string[];
  responsibilities?: string[];
  salary?: string;
  location?: string;
  employmentType?: string;
  welcomeSkills?: string[];
  appealPoints?: string[];
  workHours?: string;
  holidays?: string;
  trialPeriod?: string;
  benefits?: string[];
  selectionProcess?: string[];
  devEnvironment?: CmsDevEnvironment;
}

/** CMSレスポンスを既存のJobへ変換する。必須が欠けていればnull */
export function toJob(cms: CmsJob): Job | null {
  if (!cms.slug) return null;
  if (!cms.title) return null;

  return {
    slug: cms.slug,
    title: cms.title,
    department: cms.department ?? "",
    departmentDescription: cms.departmentDescription ?? "",
    type: cms.type ?? "",
    description: cms.description ?? "",
    background: cms.background ?? "",
    requirements: cms.requirements ?? [],
    responsibilities: cms.responsibilities ?? [],
    salary: cms.salary ?? "",
    location: cms.location ?? "",
    employmentType: cms.employmentType ?? "",
    welcomeSkills: cms.welcomeSkills,
    appealPoints: cms.appealPoints,
    workHours: cms.workHours,
    holidays: cms.holidays,
    trialPeriod: cms.trialPeriod,
    benefits: cms.benefits,
    selectionProcess: cms.selectionProcess,
    // JobDetailが4つの配列を前提にmapするため、部分欠落は空配列で埋める
    devEnvironment: cms.devEnvironment
      ? {
          tech: cms.devEnvironment.tech ?? [],
          versionControl: cms.devEnvironment.versionControl ?? [],
          designTools: cms.devEnvironment.designTools ?? [],
          workStyle: cms.devEnvironment.workStyle ?? [],
        }
      : undefined,
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
  slug: string,
  draftKey?: string
): Promise<Job | null> {
  const response = await getCmsClient().getList<CmsJob>({
    endpoint: ENDPOINT,
    queries: {
      limit: 1,
      filters: `employmentCategory[contains]${category}[and]slug[equals]${slug}`,
      ...(draftKey ? { draftKey } : {}),
    },
    customRequestInit: draftKey
      ? { cache: "no-store" }
      : { next: { tags: [ENDPOINT] } },
  });

  const first = response.contents[0];
  return first ? toJob(first) : null;
}
