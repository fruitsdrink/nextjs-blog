import { getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

type Props = {
  params: Promise<{ slug: string }>;
};
export default async function Page({ params }: Props) {
  const slug = (await params).slug;
  const post = getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const htmlConverter = md.render(post.content);
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.date.toDateString()}</p>
      <div dangerouslySetInnerHTML={{ __html: htmlConverter }}></div>
    </article>
  );
}
