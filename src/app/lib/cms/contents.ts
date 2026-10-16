import { contentCategories, type ContentItem } from "../../data/contents";
import { getCmsClient } from "./client";
import { fetchAll, type CmsListResponse } from "./fetchAll";
import { formatCmsDate } from "./format";
import { firstSelected, type CmsImage } from "./types";

const ENDPOINT = "contents";

export interface CmsContent {
  id: string;
  title: string;
  description?: string;
  body?: string;
  image?: CmsImage;
  /** セレクトフィールドは単一選択でも配列で返る */
  category: string[];
  tags?: string[];
  displayDate: string;
}

const VALID_CATEGORIES = new Set([
  "company",
  "work",
  "members",
  "environment",
  "dialogue",
]);

/** CMSレスポンスを既存のContentItemへ変換する。必須が欠けていればnull */
export function toContentItem(cms: CmsContent): ContentItem | null {
  if (!cms.title) return null;

  // imageは必須。空文字をnext/imageに渡すと実行時エラーになるため、ここで弾く
  if (!cms.image?.url) return null;

  const category = firstSelected(cms.category);
  if (!category || !VALID_CATEGORIES.has(category)) return null;

  const categoryLabel = contentCategories.find((c) => c.id === category)?.label;
  if (!categoryLabel) return null;

  return {
    id: cms.id,
    title: cms.title,
    description: cms.description ?? "",
    content: cms.body ?? "",
    image: cms.image.url,
    category: category as ContentItem["category"],
    categoryLabel,
    tags: cms.tags ?? [],
    publishedAt: formatCmsDate(cms.displayDate),
  };
}

function mapValid(list: CmsContent[]): ContentItem[] {
  return list.flatMap((cms) => {
    const item = toContentItem(cms);
    if (!item) {
      console.error(`[cms] 記事 ${cms.id} に必須フィールドの欠落があるため一覧から除外しました`);
      return [];
    }
    return [item];
  });
}

export async function getAllContents(): Promise<ContentItem[]> {
  const contents = await fetchAll<CmsContent>(({ limit, offset }) =>
    getCmsClient().getList<CmsContent>({
      endpoint: ENDPOINT,
      queries: { limit, offset, orders: "-displayDate" },
      customRequestInit: { next: { tags: [ENDPOINT] } },
    }) as Promise<CmsListResponse<CmsContent>>
  );
  return mapValid(contents);
}

export async function getContentDetail(
  id: string,
  draftKey?: string
): Promise<ContentItem | null> {
  try {
    const cms = await getCmsClient().getListDetail<CmsContent>({
      endpoint: ENDPOINT,
      contentId: id,
      queries: draftKey ? { draftKey } : {},
      customRequestInit: draftKey
        ? { cache: "no-store" }
        : { next: { tags: [ENDPOINT] } },
    });
    return toContentItem(cms);
  } catch {
    return null;
  }
}
