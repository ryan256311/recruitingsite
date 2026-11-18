import Layout from "../components/layout/Layout";
import Career from "../pages/Career";
import { getJobs } from "../lib/cms/jobs";

export const metadata = {
  title: "キャリア採用",
  description: "株式会社エクシートのキャリア採用（中途採用）の募集職種です。BtoBの現場で課題解決に向き合い、学び続ける仲間を求めています。",
  alternates: { canonical: "/career" },
};

export const revalidate = 600;

export default async function CareerPage() {
  const jobs = await getJobs("career");

  return (
    <Layout>
      <Career jobs={jobs} />
    </Layout>
  );
}
