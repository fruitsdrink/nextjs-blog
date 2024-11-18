import "server-only";
import { posts } from "#site/content";
import { notFound } from "next/navigation";
import { MDXContent } from "@/components/mdx-components";

async function getPostFromParams(params: PostPageProps["params"]) {
  const slug = (await params)?.slug?.join("/");
  const post = posts.find((post) => post.slugAsParams === slug);

  return post;
}

export async function generateStaticParams() {
  const result = posts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));

  return result;
}

interface PostPageProps {
  params: Promise<{ slug: string[] }>;
}
export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params);
  if (!post || !post.published) {
    notFound();
  }

  return (
    <article className="container mx-auto py-6 prose dark:prose-invert max-w-3xl">
      <h1 className="mb-2">{post.title}</h1>
      {post.desc ? (
        <p className="text-xl mt-0 text-muted-foreground">{post.desc}</p>
      ) : null}
      <hr className="my-4" />
      <MDXContent code={post.body} />
    </article>
  );
}
