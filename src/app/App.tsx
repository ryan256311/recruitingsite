import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import type { ContentItem } from "./data/contents";
import type { NewsItem } from "./data/news";

interface AppProps {
  news: NewsItem[];
  contents: ContentItem[];
}

export default function App({ news, contents }: AppProps) {
  return (
    <Layout>
      <Home news={news} contents={contents} />
    </Layout>
  );
}
