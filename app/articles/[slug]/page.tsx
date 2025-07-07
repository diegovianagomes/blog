import { Article } from "@/src/components/article";
import { getArticlesData } from "@/src/lib/articles";

function Tag({ tag }: { tag: string }) {
  return (
    <div
      className="flex size-4 w-fit items-center justify-center rounded-full px-2 py-3 text-sm ring-1 ring-zinc-400 dark:ring-1 dark:ring-zinc-500"
    >
      #{tag}
    </div>
  );
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string }
}) {
  const articleData = await getArticlesData(params.slug);
  return (
    <>
      <div>
          <span>
            {articleData.date}
          </span>
          <div>
            <h1>
              {articleData.title}
            </h1>
            <div>
              {articleData.tags.map((tag: string) => (
                <Tag key={tag} tag={tag} />
              ))}
            </div>
          </div>
      </div>
      <Article html={articleData.contentHtml} />
    </>
  )
}