import { Article, getArticles } from "@/lib/articles";
import moment from "moment";
import Link from "next/link";

export default async function ArticlesPage() {
  const articles = getArticles();
  return (
    <div>
      <h1
      className="mb-16 mt-4 text-center max-sm:text-3xl text-5xl">
        Articles
      </h1>

      <section className="flex flex-col divide-y divide-zinc-400 ring-2 overflow-hidden rounded  ring-[#c27bff] dark:ring-[#ead2ff]">
        {articles.map((article: Article) => (
          <Link
            className = "flex items-center justify-between px-4 py-2 transition-all sm:p-4 sm:hover:bg-zinc-100 sm:dark:hover:bg-[#8315db]"
            key={article.id}
            href={`/articles/${article.id}`}
          >
            <div className="flex gap-x-2 gap-y-1 max-sm:flex-col sm:items-center">
              {article.title}{" "}

            </div>
            <span className="text-zinc-500 max-sm:text-sm dark:text-zinc-400">
              {moment(article.date,"YYYY-MM-DD").format("MMM/YYYY")}
            </span>
          </Link>
        ))}
      </section>
    </div>
  )
}