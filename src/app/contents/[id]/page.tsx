import { notFound } from "next/navigation";
import Layout from "../../components/layout/Layout";
import ContentsDetail from "../../pages/ContentsDetail";
import { getContentById, contentItems } from "../../data/contents";

interface Props {
  params: Promise<{ id: string }>;
}

// 静的生成用のパラメータを生成
export async function generateStaticParams() {
  return contentItems.map((item) => ({
    id: item.id.toString(),
  }));
}

export default async function ContentsDetailPage({ params }: Props) {
  const { id } = await params;
  const content = getContentById(parseInt(id, 10));

  if (!content) {
    notFound();
  }

  return (
    <Layout>
      <ContentsDetail content={content} />
    </Layout>
  );
}
