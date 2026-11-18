import Layout from "../components/layout/Layout";
import Graduate from "../pages/Graduate";
import { getJobs } from "../lib/cms/jobs";

export const metadata = {
  title: "新卒採用",
  description: "株式会社エクシートの新卒採用のご案内です。UIターンも歓迎。地域で挑戦しながら成長できる環境です。",
  alternates: { canonical: "/graduate" },
};

export const revalidate = 600;

export default async function GraduatePage() {
  const jobs = await getJobs("graduate");

  return (
    <Layout>
      <Graduate jobs={jobs} />
    </Layout>
  );
}
