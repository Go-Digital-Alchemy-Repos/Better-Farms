import { useState } from "react";
import { Link, useParams } from "wouter";
import { Check, Copy, Mail, ArrowLeft, ArrowRight } from "lucide-react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { blogPosts, getBlogPost } from "@/data/blog";
import { DEFAULT_SITE_URL } from "@/lib/seo";

type ShareLinksProps = {
  title: string;
  url: string;
};

function ShareLinks({ title, url }: ShareLinksProps) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const links = [
    {
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      Icon: FaFacebookF,
    },
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      Icon: FaLinkedinIn,
    },
    {
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      Icon: FaXTwitter,
    },
    {
      label: "Share by email",
      href: `mailto:?subject=${encodedTitle}&body=${encodeURIComponent(`I thought you might find this useful: ${url}`)}`,
      Icon: Mail,
    },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div>
      <p className="[font-family:'Inter',Helvetica] text-xs font-bold uppercase tracking-[0.16em] text-[#bc623f]">
        Share this story
      </p>
      <div className="mt-4 flex flex-wrap gap-2 lg:grid lg:grid-cols-[44px_44px] lg:gap-x-10 lg:gap-y-2">
        {links.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            aria-label={label}
            title={label}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#b9ad90] bg-white text-[#5e4540] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#827b3e] focus-visible:ring-offset-2"
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
          </a>
        ))}
        <button
          type="button"
          onClick={copyLink}
          aria-label={copied ? "Article link copied" : "Copy article link"}
          title={copied ? "Copied" : "Copy link"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#b9ad90] bg-white text-[#5e4540] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#827b3e] focus-visible:ring-offset-2"
        >
          {copied ? (
            <Check className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Copy className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </div>
      <p
        className="mt-3 min-h-5 [font-family:'Inter',Helvetica] text-xs font-semibold text-[#827b3e]"
        aria-live="polite"
      >
        {copied ? "Link copied to clipboard." : ""}
      </p>
    </div>
  );
}

export function BlogArticle(): JSX.Element {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPost(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#fbfaf7]">
        <SiteHeader animateOnLoad={false} />
        <main className="px-4 py-20 md:px-8 md:py-28">
          <section className="mx-auto max-w-[760px] rounded-[20px] bg-[#f4ecd3] px-6 py-16 text-center md:px-12">
            <p className="[font-family:'Inter',Helvetica] text-sm font-bold uppercase tracking-[0.16em] text-[#bc623f]">
              Journal preview
            </p>
            <h1 className="mt-4 text-[44px] font-bold leading-[1.08] text-[#5e4540] md:text-[60px]">
              Story not found
            </h1>
            <p className="mx-auto mt-5 max-w-[560px] [font-family:'Inter',Helvetica] text-lg text-[#5e4540]">
              This sample story may have moved or may not be part of the current
              editorial preview.
            </p>
            <Link
              href="/blog"
              className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#7587ac] px-5 py-3 [font-family:'Inter',Helvetica] text-sm font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#827b3e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4ecd3]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Return to the journal
            </Link>
          </section>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const articleUrl = `${DEFAULT_SITE_URL}/blog/${post.slug}`;
  const relatedPosts = blogPosts
    .filter(
      (candidate) =>
        candidate.slug !== post.slug &&
        (candidate.category === post.category ||
          candidate.tags.some((tag) => post.tags.includes(tag))),
    )
    .slice(0, 2);

  return (
    <div className="min-h-screen w-full overflow-x-clip bg-white">
      <SiteHeader animateOnLoad={false} />
      <main>
        <article>
          <header className="px-4 pt-4 md:px-[29px] lg:pt-0">
            <div className="mx-auto max-w-[1386px] rounded-[20px] bg-[#827b3e] px-4 pb-4 pt-10 text-center md:px-[42px] md:pb-[42px] md:pt-[72px]">
              <nav
                aria-label="Breadcrumb"
                className="flex flex-wrap items-center justify-center gap-2 [font-family:'Inter',Helvetica] text-sm font-semibold text-white"
              >
                <Link
                  href="/"
                  className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Home
                </Link>
                <span aria-hidden="true">/</span>
                <Link
                  href="/blog"
                  className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Journal
                </Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page">
                  {post.category}
                </span>
              </nav>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                <span className="rounded-full border border-white/70 px-4 py-2 [font-family:'Inter',Helvetica] text-xs font-bold uppercase tracking-[0.12em] text-white">
                  {post.category}
                </span>
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 [font-family:'Inter',Helvetica] text-sm font-semibold text-white">
                  <span>{post.author}</span>
                  <span aria-hidden="true">•</span>
                  <time dateTime={post.isoDate}>{post.publishedAt}</time>
                  <span aria-hidden="true">•</span>
                  <span>{post.readTime}</span>
                </div>
              </div>

              <h1 className="mx-auto mt-7 max-w-[1120px] text-[44px] font-bold leading-[1.02] text-white md:text-[64px] lg:text-[76px]">
                {post.title}
              </h1>
              <figure className="mt-8 overflow-hidden rounded-[20px] bg-[#e6dfc9] md:mt-12">
                <img
                  src={post.image}
                  alt={post.imageAlt}
                  decoding="async"
                  width={post.imageWidth}
                  height={post.imageHeight}
                  className="aspect-[16/9] w-full object-cover"
                />
              </figure>
            </div>
          </header>

          <div className="px-4 py-14 md:px-8 md:py-20">
            <div className="mx-auto grid max-w-[1080px] gap-12 lg:grid-cols-[minmax(0,760px)_220px] lg:items-start lg:gap-[80px]">
              <div>
                <div className="space-y-5">
                  {[post.excerpt, ...post.introduction].map((paragraph) => (
                    <p
                      key={paragraph}
                      className="[font-family:'Inter',Helvetica] text-lg text-[#5e4540] md:text-xl"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                <aside className="my-10">
                  <h3 className="text-[28px] font-bold text-[#5e4540]">
                    Key takeaways
                  </h3>
                  <ul className="mt-5 space-y-3 pl-5 [font-family:'Inter',Helvetica] text-base text-[#5e4540]">
                    {post.takeaways.map((takeaway) => (
                      <li key={takeaway} className="list-disc pl-1">
                        {takeaway}
                      </li>
                    ))}
                  </ul>
                </aside>

                {post.sections.map((section, index) => (
                  <section
                    key={section.heading}
                    aria-labelledby={`article-section-${index}`}
                    className="mt-12"
                  >
                    <h3
                      id={`article-section-${index}`}
                      className="text-[28px] font-bold leading-[1.12] text-[#5e4540]"
                    >
                      {section.heading}
                    </h3>
                    <div className="mt-5 space-y-5">
                      {section.paragraphs.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="[font-family:'Inter',Helvetica] text-lg text-[#5e4540]"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    {section.bullets && (
                      <ul className="mt-5 space-y-3 pl-6 [font-family:'Inter',Helvetica] text-lg text-[#5e4540]">
                        {section.bullets.map((bullet) => (
                          <li key={bullet} className="list-disc pl-1">
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                    {index === 1 && post.quote && (
                      <blockquote className="my-12 border-l-4 border-[#bc623f] py-2 pl-6 md:pl-8">
                        <p className="text-[24px] font-bold italic leading-[1.2] text-[#5e4540]">
                          “{post.quote}”
                        </p>
                      </blockquote>
                    )}
                  </section>
                ))}

                <footer className="mt-14 border-t border-[#d9cfb5] pt-7">
                  <p className="[font-family:'Inter',Helvetica] text-sm font-bold uppercase tracking-[0.14em] text-[#746762]">
                    Filed under
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        href="/blog"
                        className="inline-flex min-h-10 items-center rounded-full border border-[#b9ad90] bg-[#fbfaf7] px-4 py-2 [font-family:'Inter',Helvetica] text-xs font-semibold text-[#5e4540] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#827b3e]"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </footer>
              </div>

              <aside className="border-t border-[#d9cfb5] pt-7 lg:sticky lg:top-[110px] lg:border-t-0 lg:pt-0">
                <ShareLinks title={post.title} url={articleUrl} />
                <div className="mt-7 border-t border-[#d9cfb5] pt-7">
                  <p className="[font-family:'Inter',Helvetica] text-xs font-bold uppercase tracking-[0.16em] text-[#bc623f]">
                    About the journal
                  </p>
                  <p className="mt-3 [font-family:'Inter',Helvetica] text-sm text-[#5e4540]">
                    Field-level ideas and practical resources for farmers,
                    funders, and partners building more resilient food systems.
                  </p>
                  <Link
                    href="/blog"
                    className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-md [font-family:'Inter',Helvetica] text-sm font-bold text-[#5e4540] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#827b3e]"
                  >
                    View all stories
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </article>

        {relatedPosts.length > 0 && (
          <section
            className="bg-[#fbfaf7] px-4 py-14 md:px-8 md:py-20"
            aria-labelledby="related-stories"
          >
            <div className="mx-auto max-w-[1080px]">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <p className="[font-family:'Inter',Helvetica] text-sm font-bold uppercase tracking-[0.16em] text-[#bc623f]">
                    Keep reading
                  </p>
                  <h2
                    id="related-stories"
                    className="mt-2 text-[40px] font-bold leading-[1.08] text-[#5e4540] md:text-[52px]"
                  >
                    Related stories
                  </h2>
                </div>
                <Link
                  href="/blog"
                  className="inline-flex min-h-11 items-center gap-2 rounded-md [font-family:'Inter',Helvetica] text-sm font-bold text-[#5e4540] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#827b3e]"
                >
                  Browse the journal
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
              <div className="mt-9 grid gap-7 md:grid-cols-2">
                {relatedPosts.map((related) => (
                  <article
                    key={related.slug}
                    className="grid overflow-hidden rounded-[18px] bg-[#f4ecd3] sm:grid-cols-[180px_minmax(0,1fr)]"
                  >
                    <Link
                      href={`/blog/${related.slug}`}
                      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#827b3e] focus-visible:ring-inset"
                      aria-label={`Read ${related.title}`}
                    >
                      <img
                        src={related.image}
                        alt={related.imageAlt}
                        width={related.imageWidth}
                        height={related.imageHeight}
                        loading="lazy"
                        decoding="async"
                        className="h-full min-h-[180px] w-full object-cover"
                      />
                    </Link>
                    <div className="p-6">
                      <p className="[font-family:'Inter',Helvetica] text-xs font-bold uppercase tracking-[0.12em] text-[#827b3e]">
                        {related.category}
                      </p>
                      <h3 className="mt-3 text-[24px] font-bold leading-[1.15] text-[#5e4540]">
                        <Link
                          href={`/blog/${related.slug}`}
                          className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#827b3e]"
                        >
                          {related.title}
                        </Link>
                      </h3>
                      <p className="mt-4 [font-family:'Inter',Helvetica] text-sm font-semibold text-[#746762]">
                        {related.readTime}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
