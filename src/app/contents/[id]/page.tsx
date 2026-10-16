import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import Layout from "../../components/layout/Layout";
import ContentsDetail from "../../pages/ContentsDetail";
import { getRelatedContents } from "../../data/contents";
import { getAllContents, getContentDetail } from "../../lib/cms/contents";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ draftKey?: string }>;
}

export const revalidate = 600;

// 静的生成用のパラメータを生成
export async function generateStaticParams() {
  const items = await getAllContents();
  return items.map((item) => ({ id: item.id }));
}

export default async function ContentsDetailPage({ params, searchParams }: Props) {
  const { id } = await params;

  // searchParams を無条件に読むと静的生成が打ち切られ、ページが毎回動的レンダリングになる。
  // draftMode().isEnabled はプリレンダー時も安全に false を返すので、先にこちらで判定する。
  const { isEnabled } = await draftMode();
  const draftKey = isEnabled ? (await searchParams).draftKey : undefined;

  const content = await getContentDetail(id, draftKey);

  if (!content) {
    notFound();
  }

  // 関連記事は一覧から選ぶため、公開済みの全件を取得して渡す
  const allContents = await getAllContents();
  const relatedContents = getRelatedContents(allContents, content.id, 3);

  return (
    <Layout>
      <ContentsDetail content={content} relatedContents={relatedContents} />
    </Layout>
  );
}
