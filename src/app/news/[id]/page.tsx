import { notFound } from "next/navigation";
import Layout from "../../components/layout/Layout";
import NewsDetail from "../../pages/NewsDetail";
import { getNewsById, newsItems } from "../../data/news";

interface Props {
  params: Promise<{ id: string }>;
}

// 静的生成用のパラメータを生成
export async function generateStaticParams() {
  return newsItems.map((item) => ({
    id: item.id.toString(),
  }));
}

export default async function NewsDetailPage({ params }: Props) {
  const { id } = await params;
  const news = getNewsById(parseInt(id, 10));

  if (!news) {
    notFound();
  }

  return (
    <Layout>
      <NewsDetail news={news} />
    </Layout>
  );
}
