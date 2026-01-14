import { notFound } from "next/navigation";
import Layout from "../../components/layout/Layout";
import JobDetail from "../../pages/JobDetail";
import { getGraduateJobById, graduateJobs } from "../../data/jobs";
import { contentItems } from "../../data/contents";

interface Props {
  params: Promise<{ id: string }>;
}

// 静的生成用のパラメータを生成
export async function generateStaticParams() {
  return graduateJobs.map((job) => ({
    id: job.id.toString(),
  }));
}

// 新卒採用に関連するコンテンツを取得
function getRelatedContentsForGraduate() {
  return contentItems
    .filter(item =>
      item.tags.includes('新卒採用') ||
      item.tags.includes('インタビュー') ||
      item.category === 'members' ||
      item.category === 'environment'
    )
    .slice(0, 3);
}

export default async function GraduateJobDetailPage({ params }: Props) {
  const { id } = await params;
  const job = getGraduateJobById(parseInt(id, 10));

  if (!job) {
    notFound();
  }

  const relatedContents = getRelatedContentsForGraduate();

  return (
    <Layout>
      <JobDetail job={job} type="graduate" relatedContents={relatedContents} />
    </Layout>
  );
}
