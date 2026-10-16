import Layout from "../components/layout/Layout";
import Graduate from "../pages/Graduate";
import { getJobs } from "../lib/cms/jobs";

export const revalidate = 600;

export default async function GraduatePage() {
  const jobs = await getJobs("graduate");

  return (
    <Layout>
      <Graduate jobs={jobs} />
    </Layout>
  );
}
