import Layout from "../components/layout/Layout";
import NewsList from "../pages/NewsList";
import { getAllNews } from "../lib/cms/news";

// Webhookが失敗した場合の保険。主たる反映経路は /api/revalidate。
export const revalidate = 600;

export const metadata = {
  title: "お知らせ | エクシート採用サイト",
  description: "エクシートの採用に関するお知らせやイベント情報をお届けします。",
};

export default async function NewsPage() {
  const items = await getAllNews();

  return (
    <Layout>
      <NewsList items={items} />
    </Layout>
  );
}
