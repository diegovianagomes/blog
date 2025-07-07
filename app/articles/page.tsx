import { getArticles } from "@/src/lib/articles";

export default async function ArticlesPage() {
  const articles = getArticles();
  return (
    <div>
      <h1>Articles</h1>

    </div>
  )
}