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

  // searchParams を無条件に読むと静的生成が打ち切られ、ページが毎回動的レンダリングになる。
  // draftMode().isEnabled はプリレンダー時も安全に false を返すので、先にこちらで判定する。
  const { isEnabled } = await draftMode();
  const draftKey = isEnabled ? (await searchParams).draftKey : undefined;

  const news = await getNewsDetail(id, draftKey);

  if (!news) {
    notFound();
  }

  return (
    <Layout>
      <NewsDetail news={news} />
    </Layout>
  );
}
