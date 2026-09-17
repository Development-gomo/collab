// src/app/[lang]/news/[slug]/page.jsx

import Header from "@/components/major/Header";
import Footer from "@/components/major/Footer";
import PageBuilder from "@/components/major/PageBuilder";
import PostHero from "@/components/sections/news/PostHero";
import { resolveParams } from "@/lib/params";
import { getPostBySlug, getMediaById } from "@/lib/api";
import { buildMetadataFromYoast } from "@/lib/seo";
import { notFound } from "next/navigation";

/* ---------------------------------------------------------
   COMPONENT: PostBody
--------------------------------------------------------- */
function PostBody({ entry, lang }) {
  const sections = entry?.acf?.page_builder;
  const contentHtml = entry?.content?.rendered;

  // If ACF flexible content is available → render PageBuilder
  if (Array.isArray(sections) && sections.length > 0) {
    return <PageBuilder sections={sections} lang={lang} />;
  }

  // If WordPress default content exists → show it
  if (contentHtml) {
    return (
      <div
        className="prose prose-lg max-w-3xl mx-auto *:mb-5 [&>*:last-child]:mb-0 [&_br]:block [&_br]:after:content-[''] [&_br]:after:block [&_br]:after:h-4"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    );
  }

  // Fallback message
  return (
    <p className="text-center text-gray-500">
      Content will be available soon.
    </p>
  );
}

/* ---------------------------------------------------------
   MAIN PAGE
--------------------------------------------------------- */
export default async function postSinglePage({ params }) {
  const parsed = resolveParams(await params);
  const lang = parsed?.lang || "en";
  const slug = parsed?.slug;

  if (!slug) notFound();

  const post = await getPostBySlug(slug, lang);
  if (!post) notFound();

  // Get the featured image
  const featuredMedia = await getMediaById(post.featured_media);

  const heroImage =
    featuredMedia?.media_details?.sizes?.full?.source_url ||
    featuredMedia?.source_url ||
    null;

  const categories = (post?._embedded?.["wp:term"]?.[0] || []).filter(
    (t) => t.taxonomy === "category"
  );

  return (
    <>
      <Header
        lang={lang}
        currentSlug={slug}
        entryType="post"
        pathPrefix="news"
      />

      <PostHero post={post} heroImage={heroImage} categories={categories} />

      <main id="next" className="px-8 py-12 space-y-8 bg-white">
        <article className="max-w-4xl mx-auto space-y-6">
          {/* BODY CONTENT (ACF OR WYSIWYG) */}
          <PostBody entry={post} lang={lang} />
        </article>
      </main>

      <Footer lang={lang} currentSlug={slug} />
    </>
  );
}

/* ---------------------------------------------------------
   METADATA (Yoast SEO)
--------------------------------------------------------- */
export async function generateMetadata({ params }) {
  const parsed = resolveParams(await params);
  const lang = parsed?.lang || "en";
  const slug = parsed?.slug;

  if (!slug) {
    return {
      title: "Post | Collab Agency",
    };
  }

  const post = await getPostBySlug(slug, lang);

  return buildMetadataFromYoast(post, {
    fallbackTitle: `${slug} | Collab Agency`,
    lang,
  });
}