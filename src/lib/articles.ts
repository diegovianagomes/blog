import path from "path";
import matter from "gray-matter";
import fs from "fs";
import moment from "moment";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from 'remark-gfm'


export type Article = {
  id: string;
  tags: string[];
  title: string;
  date: string;
};

const Articles_directory = path.join(process.cwd(), "src/articles");

export function getArticles() {
  const files = fs.readdirSync(Articles_directory);

  const allArticlesData = files.map((file) => {
    const id = file.replace(/\.md$/, "");
    const fullPath = path.join(Articles_directory, file);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
      id,
      title: matterResult.data.title,
      date: moment(matterResult.data.date).format("YYYY-MM-DD"),
      tags: matterResult.data.tags
    };
  });

  return allArticlesData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else if (a.date > b.date) {
      return -1;
    } else {
      return 0;
    }
  });
}

export function getAllTags(){
  const tags = new Set();
  const files = fs.readdirSync(Articles_directory);

  for (const file of files) {
    const fullPath = path.join(Articles_directory, file);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    const tagsInFile = matterResult.data.tags || [];
    for (const tag of tagsInFile) {
      if (tags.has(tag)) {
        continue;
      }
      tags.add(tag);
    }
  }
  return Array.from(tags);
}

export async function getArticlesData(id: string) {
  const fullPath = path.join(Articles_directory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(remarkGfm)
    .use(html)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();


  return {
    id,
    contentHtml,
    title: matterResult.data.title,
    date: moment(matterResult.data.date, "YYYY-MM-DD").format("MMMM  Do, YYYY"),
    tags: matterResult.data.tags,
  }
}


