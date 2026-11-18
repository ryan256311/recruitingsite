import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Layout from "../../components/layout/Layout";
import JobDetail from "../../pages/JobDetail";
import type { ContentItem } from "../../data/contents";
import { getAllContents } from "../../lib/cms/contents";
import { getJobBySlug, getJobs } from "../../lib/cms/jobs";
import { serializeJsonLd, toJobPostingJsonLd } from "../../lib/seo/jobPosting";

interface Props {
  params: Promise<{ id: string }>;
}

export const revalidate = 600;

// 静的生成用のパラメータを生成（URLの末尾はslug）
export async function generateStaticParams() {
  const jobs = await getJobs("graduate");
  return jobs.map((job) => ({ id: job.slug }));
}

// 新卒採用に関連するコンテンツを取得
function getRelatedContentsForGraduate(items: ContentItem[]): ContentItem[] {
  return items
    .filter(item =>
      item.tags.includes('新卒採用') ||
      item.tags.includes('インタビュー') ||
      item.category === 'members' ||
      item.category === 'environment'
    )
    .slice(0, 3);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const job = await getJobBySlug("graduate", id);
  if (!job) return {};
  return {
    title: `${job.title}（新卒採用）`,
    description: job.description || undefined,
    alternates: { canonical: `/graduate/${job.slug}` },
  };
}

export default async function GraduateJobDetailPage({ params }: Props) {
  const { id } = await params;

  // 求人は /api/draft が未対応のため下書きプレビューを扱わない。
  // searchParams を読まないことで、このページは静的生成のままになる。
  const job = await getJobBySlug("graduate", id);

  if (!job) {
    notFound();
  }

  const allContents = await getAllContents();
  const relatedContents = getRelatedContentsForGraduate(allContents);

  // 検索エンジン向けの求人情報（Googleしごと検索）。必須項目が欠ける求人は出さない
  const jobPosting = toJobPostingJsonLd(job);

  return (
    <>
      {jobPosting && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jobPosting) }}
        />
      )}
      <Layout>
        <JobDetail job={job} type="graduate" relatedContents={relatedContents} />
      </Layout>
    </>
  );
}
