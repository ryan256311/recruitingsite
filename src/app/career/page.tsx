import Layout from "../components/layout/Layout";
import Career from "../pages/Career";
import { getJobs } from "../lib/cms/jobs";

export const revalidate = 600;

export default async function CareerPage() {
  const jobs = await getJobs("career");

  return (
    <Layout>
      <Career jobs={jobs} />
    </Layout>
  );
}
