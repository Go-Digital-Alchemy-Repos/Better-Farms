import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, RotateCcw } from "lucide-react";
import { BlogPostCard } from "@/components/BlogPostCard";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { blogCategories, blogPosts, blogTags } from "@/data/blog";

export function BlogIndex(): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = useMemo(
    () =>
      blogPosts.filter(
        (post) =>
          (selectedCategory === "All" || post.category === selectedCategory) &&
          (!selectedTag || post.tags.includes(selectedTag)),
      ),
    [selectedCategory, selectedTag],
  );

  const featuredPost =
    selectedCategory === "All" && !selectedTag
      ? blogPosts.find((post) => post.featured)
      : undefined;
  const gridPosts = featuredPost
    ? filteredPosts.filter((post) => post.slug !== featuredPost.slug)
    : filteredPosts;
  const hasFilters = selectedCategory !== "All" || selectedTag !== null;

  const resetFilters = () => {
    setSelectedCategory("All");
    setSelectedTag(null);
  };

  return (
    <div className="min-h-screen w-full overflow-x-clip bg-white">
      <SiteHeader animateOnLoad={false} />
      <main>
        <section className="px-4 pb-12 pt-4 md:px-8 md:pb-20 lg:pt-0">
          <div className="hero-panel mx-auto max-w-[1386px] overflow-hidden rounded-[20px] bg-[#827b3e] px-4 pb-12 md:px-[42px] md:pb-[72px]">
            <p
              className="hero-eyebrow text-center text-2xl font-bold text-white md:text-[28px]"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              Better Farms Journal
            </p>
            <h1 className="hero-title mx-auto text-center font-bold text-white">
              Stories From the Field
            </h1>
          </div>
        </section>

        <section
          className="px-4 pb-16 md:px-8 md:pb-24"
          aria-labelledby="journal-heading"
        >
          <div className="mx-auto max-w-[1240px]">
            <div className="mb-10 flex flex-col justify-between gap-4 border-b border-[#d9cfb5] pb-6 sm:flex-row sm:items-end">
              <div>
                <h2
                  id="journal-heading"
                  className="text-[40px] font-bold leading-[1.1] text-[#5e4540] md:text-[52px]"
                >
                  Latest stories
                </h2>
              </div>
              <p
                className="[font-family:'Inter',Helvetica] text-sm font-medium text-[#746762]"
                aria-live="polite"
              >
                Showing {filteredPosts.length}{" "}
                {filteredPosts.length === 1 ? "article" : "articles"}
              </p>
            </div>

            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
              <div>
                {featuredPost && (
                  <article className="mb-8 overflow-hidden rounded-[20px] bg-[#f4ecd3] text-[#5e4540]">
                    <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                      <Link
                        href={`/blog/${featuredPost.slug}`}
                        className="block min-h-[300px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#827b3e] focus-visible:ring-inset lg:min-h-[480px]"
                        aria-label={`Read featured story: ${featuredPost.title}`}
                      >
                        <img
                          src={featuredPost.image}
                          alt={featuredPost.imageAlt}
                          width={featuredPost.imageWidth}
                          height={featuredPost.imageHeight}
                          decoding="async"
                          className="h-full min-h-[300px] w-full object-cover lg:min-h-[480px]"
                        />
                      </Link>
                      <div className="flex flex-col justify-center p-7 md:p-10 lg:p-12">
                        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 [font-family:'Inter',Helvetica] text-xs font-bold uppercase tracking-[0.16em] text-[#827b3e]">
                          <span>Featured</span>
                          <span
                            aria-hidden="true"
                            className="h-1 w-1 rounded-full bg-[#bc623f]"
                          />
                          <span>{featuredPost.category}</span>
                        </p>
                        <h2 className="mt-5 text-[34px] font-bold leading-[1.08] md:text-[44px]">
                          <Link
                            href={`/blog/${featuredPost.slug}`}
                            className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#827b3e]"
                          >
                            {featuredPost.title}
                          </Link>
                        </h2>
                        <p className="mt-5 [font-family:'Inter',Helvetica] text-base text-[#5e4540] md:text-lg">
                          {featuredPost.excerpt}
                        </p>
                        <div className="mt-8 flex flex-wrap items-center gap-4">
                          <Link
                            href={`/blog/${featuredPost.slug}`}
                            className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-white px-5 py-3 [font-family:'Inter',Helvetica] text-sm font-bold text-[#5e4540] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#827b3e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4ecd3]"
                          >
                            Read featured story
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                          </Link>
                          <span className="[font-family:'Inter',Helvetica] text-sm font-medium text-[#746762]">
                            {featuredPost.readTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                )}

                {gridPosts.length > 0 ? (
                  <div className="grid gap-8 md:grid-cols-2">
                    {gridPosts.map((post) => (
                      <BlogPostCard key={post.slug} post={post} />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-[18px] border border-dashed border-[#b9ad90] bg-white px-6 py-16 text-center">
                    <h3 className="text-[30px] font-bold text-[#5e4540]">
                      No stories match those filters
                    </h3>
                    <p className="mx-auto mt-3 max-w-[520px] [font-family:'Inter',Helvetica] text-base text-[#746762]">
                      Try another category or clear the selected tag to view
                      more field notes.
                    </p>
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#7587ac] px-5 py-3 [font-family:'Inter',Helvetica] text-sm font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#827b3e] focus-visible:ring-offset-2"
                    >
                      <RotateCcw className="h-4 w-4" aria-hidden="true" />
                      Clear filters
                    </button>
                  </div>
                )}
              </div>

              <aside
                className="rounded-[18px] bg-[#7587ac] p-6 md:p-7 lg:sticky lg:top-[100px]"
                aria-label="Filter journal stories"
              >
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-[28px] font-bold text-white">
                    Categories
                  </h2>
                  {hasFilters && (
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="min-h-11 rounded-md px-2 [font-family:'Inter',Helvetica] text-xs font-bold text-white underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      Reset
                    </button>
                  )}
                </div>

                <fieldset className="mt-4" aria-label="Categories">
                  <div className="divide-y divide-white/30">
                    {["All", ...blogCategories].map((category) => {
                      const count =
                        category === "All"
                          ? blogPosts.length
                          : blogPosts.filter(
                              (post) => post.category === category,
                            ).length;
                      const selected = selectedCategory === category;
                      return (
                        <button
                          key={category}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => setSelectedCategory(category)}
                          className={`flex min-h-12 w-full items-center justify-between gap-3 py-3 text-left [font-family:'Inter',Helvetica] text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                            selected ? "text-[#f4ecd3]" : "text-white"
                          }`}
                        >
                          <span>{category}</span>
                          <span
                            className={`inline-flex h-7 min-w-7 items-center justify-center rounded-full px-2 text-xs ${
                              selected
                                ? "bg-[#bc623f] text-white"
                                : "bg-white text-[#746762]"
                            }`}
                          >
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <fieldset className="mt-8">
                  <legend
                    className="flex w-full items-center gap-2 text-[28px] font-bold text-white after:h-px after:flex-1 after:bg-white/30 after:content-['']"
                    style={{
                      fontFamily: '"Playfair Display", Georgia, serif',
                    }}
                  >
                    Tags
                  </legend>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {blogTags.map((tag) => {
                      const selected = selectedTag === tag;
                      return (
                        <button
                          key={tag}
                          type="button"
                          aria-pressed={selected}
                          onClick={() =>
                            setSelectedTag((current) =>
                              current === tag ? null : tag,
                            )
                          }
                          className={`min-h-10 rounded-full border px-3 py-2 [font-family:'Inter',Helvetica] text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#7587ac] ${
                            selected
                              ? "border-[#827b3e] bg-[#827b3e] text-white"
                              : "border-[#b9ad90] bg-white text-[#5e4540]"
                          }`}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
