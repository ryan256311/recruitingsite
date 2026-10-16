import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import Layout from "../../components/layout/Layout";
import NewsDetail from "../../pages/NewsDetail";
import { getAllNews, getNewsDetail } from "../../lib/cms/news";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ draftKey?: string }>;
}

export const revalidate = 600;

// 静的生成用のパラメータを生成
export async function generateStaticParams() {
  const items = await getAllNews();
  return items.map((item) => ({ id: item.id }));
}

export default async function NewsDetailPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { draftKey } = await searchParams;
  const { isEnabled } = await draftMode();

  // Draft Modeが有効でないときはdraftKeyを無視する。
  // クエリを付けただけで未公開の下書きが読めてしまう状態を防ぐため。
  const news = await getNewsDetail(id, isEnabled ? draftKey : undefined);

  if (!news) {
    notFound();
  }

  return (
    <Layout>
      <NewsDetail news={news} />
    </Layout>
  );
}
