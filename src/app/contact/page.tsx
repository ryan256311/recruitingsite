import { Suspense } from "react";

import Layout from "../components/layout/Layout";
import Contact from "../pages/Contact";

export const metadata = {
  title: "お問い合わせ | エクシート採用サイト",
  description: "エクシートへの採用に関するお問い合わせはこちらからお願いいたします。採用に関するご質問、選考へのご応募、会社見学のご希望など、お気軽にお問い合わせください。",
};

export default function ContactPage() {
  return (
    <Layout>
      <Suspense fallback={<div className="px-8 py-24">Loading...</div>}>
        <Contact />
      </Suspense>
    </Layout>
  );
}
