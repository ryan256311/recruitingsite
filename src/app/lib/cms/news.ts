import { newsCategories, type NewsItem } from "../../data/news";
import { getCmsClient } from "./client";
import { fetchAll, type CmsListResponse } from "./fetchAll";
import { formatCmsDate } from "./format";
import { isContentNotFound } from "./notFound";
import { firstSelected, type CmsImage } from "./types";

const ENDPOINT = "news";

export interface CmsNews {
  id: string;
  date: string;
  title: string;
  /** セレクトフィールドは単一選択でも配列で返る */
  category: string[];
  body?: string;
  image?: CmsImage;
  externalUrl?: string;
}

/**
 * microCMS「カテゴリ」の選択肢 → 内部ID。
 * 管理画面ではサイトと同じ日本語（「新卒」など）を選ばせる。英語のIDも受け付ける。
 */
function toCategory(value: string | undefined) {
  if (!value) return undefined;
  return newsCategories.find((c) => c.id !== "all" && (c.label === value || c.id === value));
}

/** CMSレスポンスを既存のNewsItemへ変換する。必須が欠けていればnull */
export function toNewsItem(cms: CmsNews): NewsItem | null {
  if (!cms.title) return null;

  const found = toCategory(firstSelected(cms.category));
  if (!found) return null;
  const category = found.id;
  const categoryLabel = found.label;

  return {
    id: cms.id,
    date: formatCmsDate(cms.date),
    title: cms.title,
    category: category as NewsItem["category"],
    categoryLabel,
    content: cms.body ?? "",
    image: cms.image?.url,
    externalUrl: cms.externalUrl || undefined,
  };
}

function mapValid(list: CmsNews[]): NewsItem[] {
  return list.flatMap((cms) => {
    const item = toNewsItem(cms);
    if (!item) {
      console.error(`[cms] お知らせ ${cms.id} に必須フィールドの欠落があるため一覧から除外しました`);
      return [];
    }
    return [item];
  });
}

export async function getAllNews(): Promise<NewsItem[]> {
  const contents = await fetchAll<CmsNews>(({ limit, offset }) =>
    getCmsClient().getList<CmsNews>({
      endpoint: ENDPOINT,
      queries: { limit, offset, orders: "-date" },
      customRequestInit: { next: { tags: [ENDPOINT] } },
    }) as Promise<CmsListResponse<CmsNews>>
  );
  return mapValid(contents);
}

export async function getNewsDetail(id: string, draftKey?: string): Promise<NewsItem | null> {
  try {
    const cms = await getCmsClient().getListDetail<CmsNews>({
      endpoint: ENDPOINT,
      contentId: id,
      queries: draftKey ? { draftKey } : {},
      customRequestInit: draftKey
        ? { cache: "no-store" }
        : { next: { tags: [ENDPOINT] } },
    });
    return toNewsItem(cms);
  } catch (error) {
    // 本当に存在しない場合だけnullを返す。
    // 一時的な障害まで404にすると、公開中のお知らせが最大10分間「見つかりません」になる
    if (isContentNotFound(error)) return null;
    console.error(`[cms] お知らせ ${id} の取得に失敗しました`, error);
    throw error;
  }
}
