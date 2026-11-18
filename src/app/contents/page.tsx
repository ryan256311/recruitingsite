import Layout from "../components/layout/Layout";
import ContentsList from "../pages/ContentsList";
import { getAllContents } from "../lib/cms/contents";

export const metadata = {
  title: "コンテンツ",
  description: "エクシートについて、社員インタビューや働く環境など、さまざまな角度からご紹介します。",
  alternates: { canonical: "/contents" },
};

export const revalidate = 600;

export default async function ContentsPage() {
  const items = await getAllContents();

  return (
    <Layout>
      <ContentsList items={items} />
    </Layout>
  );
}
