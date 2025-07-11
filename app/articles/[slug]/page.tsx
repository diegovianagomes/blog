
import { notFound } from 'next/navigation'
import { Article } from "@/components/article";
import { getArticlesData } from "@/lib/articles";


function Tag({ tag }: { tag: string }) {
  return (
    <div
      className="flex items-center justify-center rounded-full px-3 py-1 text-sm ring-1 ring-zinc-400 dark:ring-zinc-500"
    >
      #{tag}
    </div>
  );
}
{/*}
type Props = {
  params: {
    slug: string
  },
  searchParams: { [key: string]: string | string[] | undefined }
}*/}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {

  const resolvedParams = await params;
  const articleData = await getArticlesData(resolvedParams.slug)

  if (!articleData) {
    notFound()
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center p-8">
        <span className="text-sm text-zinc-500 dark:text-zinc-400">
          {articleData.date}
        </span>
        <div className="flex w-full max-w-prose flex-col items-center justify-center gap-4 px-4 pb-6 pt-1">
          <h1 className="text-center text-5xl max-sm:text-3xl">
            {articleData.title}
          </h1>
          <div className="flex flex-wrap justify-center gap-x-3">
            {articleData.tags.map((tag: string) => (
              <Tag key={tag} tag={tag} />
            ))}
          </div>
        </div>
      </div>
      <Article  html={articleData.contentHtml} />
    </>
  )
}