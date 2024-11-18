import "server-only";
import { posts } from "#site/content";
import { notFound } from "next/navigation";
import { MDXContent } from "@/components/mdx-components";

import "@/styles/mdx.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

async function getPostFromParams(params: PostPageProps["params"]) {
  const slug = (await params)?.slug?.join("/");
  const post = posts.find((post) => post.slugAsParams === slug);

  return post;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params);
  if (!post) {
    return {};
  }

  const ogSearchParams = new URLSearchParams();
  ogSearchParams.set("title", post.title);

  return {
    title: post.title,
    description: post.desc,
    authors: { name: siteConfig.author },
    openGraph: {
      title: post.title,
      description: post.desc,
      type: "article",
      url: post.slug,
      images: [
        {
          url: `/api/og?${ogSearchParams.toString()}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.desc,
      images: [`/api/og?${ogSearchParams.toString()}`],
    },
  };
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
    <article className="container mx-auto prose dark:prose-invert py-6 max-w-3xl">
      <h1 className="mb-2">{post.title}</h1>
      {post.desc ? (
        <p className="text-xl mt-0 text-muted-foreground">{post.desc}</p>
      ) : null}
      <hr className="my-4" />
      <MDXContent code={post.body} />
    </article>
  );
}
