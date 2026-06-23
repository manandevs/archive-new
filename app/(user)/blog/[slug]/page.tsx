import { notFound } from "next/navigation";
import BlogArticle from "@/components/blog/BlogArticle";
import BlogBreadcrumb from "@/components/blog/BlogBreadcrumb";
import { getBlogPostBySlug } from "@/components/blog/blog-data";

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const currentCategory = post.category;

  return (
    <main className="min-h-screen">
      <div className="pt-8 md:pt-16">
        <BlogBreadcrumb current={currentCategory} />
      </div>
      <BlogArticle post={post} />
    </main>
  );
}
