import Layout from "../components/layout/Layout";
import ContentsList from "../pages/ContentsList";
import { getAllContents } from "../lib/cms/contents";

export const revalidate = 600;

export default async function ContentsPage() {
  const items = await getAllContents();

  return (
    <Layout>
      <ContentsList items={items} />
    </Layout>
  );
}
