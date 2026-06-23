import type { PortableTextBlock } from '@portabletext/types'
import { client } from '@/sanity/lib/client'

export type BlogCategory = 'All' | string

export type BlogPost = {
  id: string
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  author: string
  image: string
  featured?: boolean
  body: PortableTextBlock[]
}

type SanityCategory = {
  title?: string
}

type SanityPost = {
  _id?: string
  slug?: string
  title?: string
  excerpt?: string
  publishedAt?: string
  category?: string
  author?: string
  image?: string
  body?: PortableTextBlock[]
}

const FALLBACK_IMAGE = '/images/blog-wave-dots-a.png'
const FALLBACK_AUTHOR = 'Arbiris Team'

function formatDate(dateString?: string): string {
  if (!dateString) return ''

  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return ''

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

function toBlogPost(post: SanityPost, index = 0): BlogPost {
  const slug = post.slug || post._id || `post-${index}`
  return {
    id: post._id || slug,
    slug,
    title: post.title || 'Untitled',
    excerpt: post.excerpt || '',
    date: formatDate(post.publishedAt),
    category: post.category || 'Uncategorized',
    author: post.author || FALLBACK_AUTHOR,
    image: post.image || FALLBACK_IMAGE,
    featured: index < 2,
    body: post.body ?? [],
  }
}

export async function getBlogCategories(): Promise<BlogCategory[]> {
  if (!client) return ['All']

  const categories = await client.fetch<SanityCategory[]>(
    `*[_type == "blogCategory" && defined(title)] | order(title asc) {
      title
    }`,
  )

  const names = Array.from(
    new Set(
      categories
        .map((category) => category.title?.trim())
        .filter((name): name is string => Boolean(name)),
    ),
  )

  return ['All', ...names]
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!client) return []

  const posts = await client.fetch<SanityPost[]>(
    `*[_type == "blogPost"] | order(publishedAt desc) {
      _id,
      "slug": slug.current,
      title,
      excerpt,
      publishedAt,
      "category": category->title,
      "author": author->name,
      "image": mainImage.asset->url,
      body
    }`,
  )

  return posts.map((post, index) => toBlogPost(post, index))
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!client) return null

  const post = await client.fetch<SanityPost | null>(
    `*[_type == "blogPost" && (slug.current == $slug || _id == $slug)][0]{
      _id,
      "slug": slug.current,
      title,
      excerpt,
      publishedAt,
      "category": category->title,
      "author": author->name,
      "image": mainImage.asset->url,
      body
    }`,
    { slug },
  )

  if (!post) return null

  return toBlogPost(post)
}
