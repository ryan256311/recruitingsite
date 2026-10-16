import { Suspense } from "react";

import Layout from "../components/layout/Layout";
import JobsList from "../pages/JobsList";
import { getJobs } from "../lib/cms/jobs";

export const revalidate = 600;

export const metadata = {
  title: "募集中の求人 | エクシート採用サイト",
  description: "エクシートで現在募集中の求人一覧です。キャリア採用・新卒採用の求人情報をご覧いただけます。",
};

export default async function JobsPage() {
  const [careerJobs, graduateJobs] = await Promise.all([
    getJobs("career"),
    getJobs("graduate"),
  ]);

  return (
    <Suspense fallback={<div className="px-8 py-24">Loading...</div>}>
      <Layout>
        <JobsList careerJobs={careerJobs} graduateJobs={graduateJobs} />
      </Layout>
    </Suspense>
  );
}
