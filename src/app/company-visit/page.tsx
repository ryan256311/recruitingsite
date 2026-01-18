import Layout from "../components/layout/Layout";
import CompanyVisit from "../pages/CompanyVisit";

export const metadata = {
  title: "会社見学 | 株式会社エクシート 採用サイト",
  description: "エクシートの会社見学についてご紹介します。実際のオフィスを訪問し、社員と直接対話しながら会社の雰囲気を体感できます。",
};

export default function CompanyVisitPage() {
  return (
    <Layout>
      <CompanyVisit />
    </Layout>
  );
}
