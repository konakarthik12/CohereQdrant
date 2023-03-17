import {useRouter} from "next/router";
import useSWR from "swr";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'

const fetcher = (url: RequestInfo | URL) =>
  fetch(url).then((res) => res.json());
export default function Home() {
  const router = useRouter()
  const {name} = router.query
  const {data} = useSWR("/api/view_doc?doc=" + name, fetcher);
  if (!data) return <div>Loading...</div>;
  return (
    <div className="flex flex-col p-4 bg-base-300 min-w-screen">
      <div className="bg-base-100 p-4 self-center border-4 border-base-300">
        <h1 className="text-3xl text-center">Viewing Document: {name}</h1>
      </div>
      <article className="prose lg:prose-xl prose-neutral bg-base-100 p-4 self-center">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.file}</ReactMarkdown>
      </article>
    </div>
  );
}
