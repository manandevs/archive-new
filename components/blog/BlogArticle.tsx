"use client";

import Image from "next/image";
import type { BlogPost } from "./blog-data";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { motion, type Variants } from "framer-motion";
import TextGenerateEffect from "../shared/TextGenerateEffect";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";

const easeOut = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.06,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeOut },
  },
};

const articleVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
};

const paragraphVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
};

// 2. Define how to handle images and text inside the blog body
const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <motion.div variants={paragraphVariants} className="my-8 w-full">
        <Image
          src={urlFor(value).url()}
          alt={value.alt || "Blog image"}
          width={1360}
          height={700}
          className="h-auto w-full rounded-xl border border-white/5"
        />
        {value.caption && (
          <p className="mt-2 text-center text-sm text-[#8A8F98]">{value.caption}</p>
        )}
      </motion.div>
    ),
  },
  block: {
    // Handling all heading sizes
    h1: ({ children }: any) => (
      <motion.h1 variants={paragraphVariants} className="mt-12 mb-6 text-5xl font-bold text-[#f3f6fb]">{children}</motion.h1>
    ),
    h2: ({ children }: any) => (
      <motion.h2 variants={paragraphVariants} className="mt-10 mb-5 text-4xl font-bold text-[#f3f6fb]">{children}</motion.h2>
    ),
    h3: ({ children }: any) => (
      <motion.h3 variants={paragraphVariants} className="mt-8 mb-4 text-3xl font-bold text-[#f3f6fb]">{children}</motion.h3>
    ),
    h4: ({ children }: any) => (
      <motion.h4 variants={paragraphVariants} className="mt-6 mb-3 text-2xl font-bold text-[#f3f6fb]">{children}</motion.h4>
    ),
    h5: ({ children }: any) => (
      <motion.h5 variants={paragraphVariants} className="mt-4 mb-2 text-xl font-bold text-[#f3f6fb]">{children}</motion.h5>
    ),
    h6: ({ children }: any) => (
      <motion.h6 variants={paragraphVariants} className="mt-2 mb-1 text-lg font-bold text-[#f3f6fb]">{children}</motion.h6>
    ),
    // Standard paragraph
    normal: ({ children }: any) => (
      <motion.p variants={paragraphVariants} className="mb-5 leading-relaxed">
        {children}
      </motion.p>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold text-white">{children}</strong>
    ),
    link: ({ children, value }: any) => (
      <a href={value.href} className="text-blue-400 underline hover:text-blue-300 transition-colors">
        {children}
      </a>
    ),
  },
};

type BlogArticleProps = {
  post: BlogPost;
};

const BlogArticle = ({ post }: BlogArticleProps) => {
  const { isCopied, copy } = useCopyToClipboard();
  const meta = [post.author, post.date].filter(Boolean).join(" - ");

  const handleCopyLink = async () => {
    await copy(window.location.href);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mx-auto w-full max-w-5xl px-4 md:px-6 lg:px-8"
    >
      <motion.h1
        variants={itemVariants}
        className="mx-auto max-w-225 text-center text-3xl font-medium leading-tight text-[#f3f6fb] sm:text-4xl lg:text-5xl lg:leading-16"
      >
        <TextGenerateEffect words={post.title} duration={1} staggerDelay={0.15} />
      </motion.h1>

      <motion.div
        variants={itemVariants}
        className="mx-auto mt-8 w-full px-0 sm:px-4 md:mt-12 md:px-6"
      >
        <Image
          src={post.image}
          alt={post.title}
          width={1360}
          height={700}
          className="h-auto w-full rounded-xl border border-white/5"
        />
      </motion.div>

      {meta ? (
        <motion.p
          variants={itemVariants}
          className="mt-12 text-center text-[15px] leading-5 text-[#8A8F98]"
        >
          {meta}
        </motion.p>
      ) : null}

      <motion.article
        variants={articleVariants}
        className="mx-auto mt-8 max-w-156 space-y-5 text-[14px] leading-6 text-[#F7F8F8] md:mt-10 md:text-[17px] md:leading-7"
      >
        <PortableText value={post.body} components={portableTextComponents} />
      </motion.article>

      <motion.div
        variants={itemVariants}
        className="mx-auto mt-10 flex w-full max-w-156 flex-col gap-3 border-t border-t-white/8 pb-20 pt-8 text-[15px] leading-5 text-[#8A8F98] sm:flex-row sm:items-center sm:justify-between md:mt-12 md:pb-32.5 md:pt-12"
      >
        <p>{meta}</p>
        <motion.button
          type="button"
          onClick={handleCopyLink}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2, ease: easeOut }}
          className="transition-colors hover:text-[#f7f8f8] flex items-center gap-2"
        >
          {isCopied ? (
            <span className="text-white font-medium">Link Copied!</span>
          ) : (
            "Copy Link"
          )}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default BlogArticle;
