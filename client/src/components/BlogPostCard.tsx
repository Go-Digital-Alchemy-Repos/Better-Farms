import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import type { BlogPost } from "@/data/blog";

type BlogPostCardProps = {
  post: BlogPost;
  orientation?: "vertical" | "horizontal";
};

export function BlogPostCard({
  post,
  orientation = "vertical",
}: BlogPostCardProps): JSX.Element {
  const isHorizontal = orientation === "horizontal";

  return (
    <article
      className={`overflow-hidden rounded-[18px] bg-[#f4ecd3] ${
        isHorizontal
          ? "sm:grid sm:grid-cols-[180px_minmax(0,1fr)]"
          : ""
      }`}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#827b3e] focus-visible:ring-inset"
        aria-label={`Read ${post.title}`}
      >
        <img
          src={post.image}
          alt={post.imageAlt}
          width={post.imageWidth}
          height={post.imageHeight}
          loading="lazy"
          decoding="async"
          className={
            isHorizontal
              ? "aspect-[16/10] h-full min-h-[220px] w-full object-cover sm:aspect-auto"
              : "aspect-[16/10] w-full object-cover"
          }
        />
      </Link>
      <div
        className={`flex flex-col p-6 ${
          isHorizontal ? "min-h-[300px]" : "min-h-[310px] md:p-7"
        }`}
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 [font-family:'Inter',Helvetica] text-xs font-semibold uppercase tracking-[0.12em] text-[#827b3e]">
          <span>{post.category}</span>
          <span
            aria-hidden="true"
            className="h-1 w-1 rounded-full bg-[#bc623f]"
          />
          <time dateTime={post.isoDate}>{post.publishedAt}</time>
        </div>
        <h2 className="mt-4 text-[28px] font-bold leading-[1.12] text-[#5e4540]">
          <Link
            href={`/blog/${post.slug}`}
            className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#827b3e]"
          >
            {post.title}
          </Link>
        </h2>
        <p className="mt-4 [font-family:'Inter',Helvetica] text-base text-[#5e4540]">
          {post.excerpt}
        </p>
        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          <span className="[font-family:'Inter',Helvetica] text-sm font-medium text-[#746762]">
            {post.readTime}
          </span>
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex min-h-11 items-center gap-2 rounded-md [font-family:'Inter',Helvetica] text-sm font-bold text-[#5e4540] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#827b3e]"
          >
            Read story
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
