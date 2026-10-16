import App from "./App";
import { getAllContents } from "./lib/cms/contents";
import { getAllNews } from "./lib/cms/news";

export const revalidate = 600;

export default async function Page() {
  const [news, contents] = await Promise.all([getAllNews(), getAllContents()]);

  return <App news={news} contents={contents} />;
}
