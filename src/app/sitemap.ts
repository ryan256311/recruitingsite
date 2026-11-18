import type { MetadataRoute } from "next";
import { getAllContents } from "./lib/cms/contents";
import { getJobs } from "./lib/cms/jobs";
import { getAllNews } from "./lib/cms/news";
import { SITE_URL } from "./lib/site";

// 求人・記事を追加したら最大10分で反映される（Webhookの再検証でも更新される）
export const revalidate = 600;

/** 検索エンジン向けのページ一覧（/sitemap.xml） */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [career, graduate, contents, news] = await Promise.all([
    getJobs("career"),
    getJobs("graduate"),
    getAllContents(),
    getAllNews(),
  ]);

  const url = (path: string) => ({ url: `${SITE_URL}${path}` });

  return [
    ...["/", "/career", "/graduate", "/jobs", "/contents", "/news", "/company-visit"].map(url),
    ...career.map((job) => url(`/career/${job.slug}`)),
    ...graduate.map((job) => url(`/graduate/${job.slug}`)),
    ...contents.map((item) => url(`/contents/${item.id}`)),
    // 外部リンクだけのお知らせは一覧から直接外部へ飛ぶため、詳細ページは載せない
    ...news.filter((item) => !item.externalUrl).map((item) => url(`/news/${item.id}`)),
  ];
}
