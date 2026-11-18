import { contentCategories, type ContentItem } from "../../data/contents";
import { getCmsClient } from "./client";
import { fetchAll, type CmsListResponse } from "./fetchAll";
import { formatCmsDate } from "./format";
import { isContentNotFound } from "./notFound";
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

/**
 * アイキャッチ画像が未設定のときに使う画像。
 *
 * 記事の多くは専用の写真を持たず、ブランドのプレースホルダーで足りる。
 * 画像なしを理由に記事を一覧から消すより、担当者が画像を用意できていない記事も
 * 公開できる方が運用に合う（CMS側でも image は任意にしてある）。
 */
const PLACEHOLDER_IMAGE = "/images/contents/placeholder.webp";

/**
 * microCMS「カテゴリ」の選択肢 → 内部ID。
 * 管理画面ではサイトと同じ日本語（「会社を知る」など）を選ばせる。
 * 英語のIDは置き換え前の値で、巻き戻したときにも表示が崩れないよう受け付ける。
 */
function toCategory(value: string | undefined) {
  if (!value) return undefined;
  return contentCategories.find((c) => c.id !== "all" && (c.label === value || c.id === value));
}

/** CMSレスポンスを既存のContentItemへ変換する。必須が欠けていればnull */
export function toContentItem(cms: CmsContent): ContentItem | null {
  if (!cms.title) return null;

  const found = toCategory(firstSelected(cms.category));
  if (!found) return null;
  const category = found.id;
  const categoryLabel = found.label;

  return {
    id: cms.id,
    title: cms.title,
    description: cms.description ?? "",
    content: cms.body ?? "",
    // 空文字をnext/imageに渡すと実行時エラーになるため、必ず何かを入れる
    image: cms.image?.url || PLACEHOLDER_IMAGE,
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
  } catch (error) {
    // 本当に存在しない場合だけnullを返す。
    // 一時的な障害まで404にすると、公開中の記事が最大10分間「見つかりません」になる
    if (isContentNotFound(error)) return null;
    console.error(`[cms] 記事 ${id} の取得に失敗しました`, error);
    throw error;
  }
}
