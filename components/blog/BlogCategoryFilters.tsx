"use client";

import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import type { BlogCategory } from "./blog-data";

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.04 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
  },
};

type BlogCategoryFiltersProps = {
  categories: BlogCategory[];
  activeCategory: BlogCategory;
  onCategoryChange: (category: BlogCategory) => void;
};

const BlogCategoryFilters = ({
  categories,
  activeCategory,
  onCategoryChange,
}: BlogCategoryFiltersProps) => {
  return (
    <motion.div
      className="flex flex-wrap items-center gap-2"
      initial="hidden"
      animate="visible"
      variants={listVariants}
    >
      {categories.map((category) => {
        const active = activeCategory === category;

        return (
          <motion.button
            key={category}
            type="button"
            variants={itemVariants}
            onClick={() => onCategoryChange(category)}
            className={cn(
              "rounded-2xl px-3 py-1.5 text-[13px] max-h-10 h-full  w-auto font-inter transition-colors",
              active ? "bg-white text-[#08090A] font-medium" : "text-[#8A8F98] hover:text-[#c8ced8]",
            )}
          >
            {category}
          </motion.button>
        );
      })}
    </motion.div>
  );
};

export default BlogCategoryFilters;

