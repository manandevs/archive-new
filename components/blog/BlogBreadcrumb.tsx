"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.04 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const },
  },
};

type BlogBreadcrumbProps = {
  current: string;
};

const BlogBreadcrumb = ({ current }: BlogBreadcrumbProps) => {
  return (
    <motion.nav
      className="flex flex-wrap items-center justify-center gap-2 px-3 py-2 text-center text-[13px] font-medium text-[#8A8F98]"
      aria-label="Breadcrumb"
      initial="hidden"
      animate="visible"
      variants={listVariants}
    >
      <motion.span variants={itemVariants} className="inline-flex">
        <Link
          href="/blog"
          className="transition-colors hover:text-[#d6dce6]"
        >
          Blog
        </Link>
      </motion.span>
      <motion.span variants={itemVariants} className="inline-flex">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 12L10 8L6 4" stroke="#8A8F98" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.span>
      <motion.span variants={itemVariants} className="inline-flex">
        {current}
      </motion.span>
    </motion.nav>
  );
};

export default BlogBreadcrumb;
