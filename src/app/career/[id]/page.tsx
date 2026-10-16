import { notFound } from "next/navigation";
import Layout from "../../components/layout/Layout";
import JobDetail from "../../pages/JobDetail";
import type { ContentItem } from "../../data/contents";
import { getAllContents } from "../../lib/cms/contents";
import { getJobBySlug, getJobs } from "../../lib/cms/jobs";

interface Props {
  params: Promise<{ id: string }>;
}

export const revalidate = 600;

// 静的生成用のパラメータを生成（URLの末尾はslug）
export async function generateStaticParams() {
  const jobs = await getJobs("career");
  return jobs.map((job) => ({ id: job.slug }));
}

// キャリア採用に関連するコンテンツを取得
function getRelatedContentsForCareer(items: ContentItem[]): ContentItem[] {
  return items
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

  // 求人は /api/draft が未対応のため下書きプレビューを扱わない。
  // searchParams を読まないことで、このページは静的生成のままになる。
  const job = await getJobBySlug("career", id);

  if (!job) {
    notFound();
  }

  const allContents = await getAllContents();
  const relatedContents = getRelatedContentsForCareer(allContents);

  return (
    <Layout>
      <JobDetail job={job} type="career" relatedContents={relatedContents} />
    </Layout>
  );
}
