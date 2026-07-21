"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BlogCard from "./BlogCard";
import BlogCategoryFilters from "./BlogCategoryFilters";
import BlogSearchBar from "./BlogSearchBar";
import type { BlogCategory, BlogPost } from "./blog-data";
import TextGenerateEffect from "../shared/TextGenerateEffect";

const INITIAL_VISIBLE = 10;
const LOAD_MORE_STEP = 6;

type BlogListClientProps = {
  categories: BlogCategory[];
  posts: BlogPost[];
};

const BlogListClient = ({ categories, posts }: BlogListClientProps) => {
  const [category, setCategory] = useState<BlogCategory>("All");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  // Handle resets in event handlers instead of useEffect to prevent cascading renders
  const handleCategoryChange = (newCategory: BlogCategory) => {
    setCategory(newCategory);
    setVisibleCount(INITIAL_VISIBLE);
  };

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
    setVisibleCount(INITIAL_VISIBLE);
  };

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const categoryMatch = category === "All" || post.category === category;
      const queryMatch =
        query.trim().length === 0 ||
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase());
      return categoryMatch && queryMatch;
    });
  }, [posts, category, query]);

  const ordered = useMemo(() => {
    const featuredHead = filtered.filter((post) => post.featured).slice(0, 2);
    const rest = filtered.filter((post) => !post.featured);
    return [...featuredHead, ...rest];
  }, [filtered]);

  const { featured, grid } = useMemo(() => {
    const visible = ordered.slice(0, visibleCount);
    const featuredHeadLen = filtered.filter((post) => post.featured).slice(0, 2).length;
    const featuredSlice = visible.slice(0, Math.min(featuredHeadLen, visible.length));
    const gridSlice = visible.slice(featuredHeadLen);
    return { featured: featuredSlice, grid: gridSlice };
  }, [ordered, visibleCount, filtered]);

  const isEmpty = filtered.length === 0;
  const canLoadMore = !isEmpty && ordered.length > visibleCount;

  const handleLoadMore = () => {
    setVisibleCount((c) => Math.min(c + LOAD_MORE_STEP, ordered.length));
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pt-6 md:px-8 md:pt-16">
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-3xl font-medium leading-tight sm:text-4xl md:text-5xl md:leading-16"
      >
        <TextGenerateEffect
          words="Blog"
          duration={1}
          staggerDelay={0.15}
        />
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-8 flex flex-col justify-between gap-4 md:mt-12 md:flex-row md:items-center"
      >
        <BlogCategoryFilters
          categories={categories}
          activeCategory={category}
          onCategoryChange={handleCategoryChange}
        />
        <BlogSearchBar
          value={query}
          onChange={handleQueryChange}
        />
      </motion.div>

      {isEmpty ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 rounded-lg border border-white/8 bg-[#1F2227]/50 px-6 py-10 text-center"
        >
          <p className="text-[15px] font-medium text-[#F7F8F8]">No posts found</p>
          <p className="mt-2 text-[13px] text-[#8A8F98]">Try another category or search term.</p>
        </motion.div>
      ) : (
        <>
          {/* Featured Section */}
          <motion.div
            layout
            className="mt-10 grid gap-7 md:mt-12 md:grid-cols-2 lg:gap-12.75"
          >
            <AnimatePresence mode="popLayout">
              {featured.map((post) => (
                <BlogCard key={post.id} post={post} featured />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Standard Grid */}
          <motion.div
            layout
            className="mt-10 grid gap-7 sm:grid-cols-2 md:mt-16.75 md:grid-cols-3 lg:gap-12.75"
          >
            <AnimatePresence mode="popLayout">
              {grid.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </AnimatePresence>
          </motion.div>
        </>
      )}

      {!isEmpty && canLoadMore ? (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mb-20 mt-10 flex justify-center md:mb-32 md:mt-16"
        >
          <button
            type="button"
            onClick={handleLoadMore}
            className="rounded border border-white/8 bg-[#1F2227] px-4 py-3 text-[13px] text-[#F7F8F8] transition-colors hover:bg-[#1a202a] font-bold"
          >
            Load More
          </button>
        </motion.div>
      ) : null}
    </div>
  );
};

export default BlogListClient;