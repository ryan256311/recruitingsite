import { notFound } from "next/navigation";
import Layout from "../../components/layout/Layout";
import JobDetail from "../../pages/JobDetail";
import { getCareerJobById, careerJobs } from "../../data/jobs";
import { contentItems } from "../../data/contents";

interface Props {
  params: Promise<{ id: string }>;
}

// 静的生成用のパラメータを生成
export async function generateStaticParams() {
  return careerJobs.map((job) => ({
    id: job.id.toString(),
  }));
}

// キャリア採用に関連するコンテンツを取得
function getRelatedContentsForCareer() {
  return contentItems
    .filter(item =>
      item.tags.includes('キャリア採用') ||
      item.tags.includes('Career') ||
      item.tags.includes('インタビュー') ||
      item.category === 'members' ||
      item.category === 'environment'
    )
    .slice(0, 3);
}

export default async function CareerJobDetailPage({ params }: Props) {
  const { id } = await params;
  const job = getCareerJobById(parseInt(id, 10));

  if (!job) {
    notFound();
  }

  const relatedContents = getRelatedContentsForCareer();

  return (
    <Layout>
      <JobDetail job={job} type="career" relatedContents={relatedContents} />
    </Layout>
  );
}
