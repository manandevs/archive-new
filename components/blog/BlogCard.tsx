"use client";

import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "./blog-data";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1] as const;

const inView = { once: true, amount: 0.25 } as const;

type BlogCardProps = {
  post: BlogPost;
  featured?: boolean;
};

const BlogCard = ({ post, featured = false }: BlogCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.995 }}
      viewport={{ once: true }}
      transition={{ duration: 0.75, ease: easeOut }}
    >
      <Link href={`/blog/${post.slug}`} className="group block min-h-[380px] md:min-h-110">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.5, delay: 0.15, ease: easeOut }}
          className={cn(
            "overflow-hidden rounded-lg border border-white/8 p-0.75",
            featured ? "h-56 w-full sm:h-64.25 sm:max-w-120.5" : "",
          )}
        >
          <Image
            src={post.image}
            alt={post.title}
            width={820}
            height={620}
            className={cn(
              "h-56 w-full rounded-lg object-cover transition-transform duration-500 group-hover:scale-[1.03] sm:h-64.25",
              featured ? "w-full sm:max-w-120.5" : "w-full sm:w-75.75",
            )}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.5, delay: 0.25, ease: easeOut }}
          className="mt-6.5 text-[14px] leading-5 text-[#9F9FA9] font-normal"
        >
          {post.date}
        </motion.p>
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.5, delay: 0.39, ease: easeOut }}
          className={cn(
            "mt-2 text-white transition-colors group-hover:text-[#dce2ec]",
            featured ? "font-medium text-[20px] leading-7" : "text-[15px] font-semibold leading-7",
          )}
        >
          {post.title}
        </motion.h3>
        {featured ? (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 0.5, delay: 0.35, ease: easeOut }}
            className="mt-3 text-[14px] leading-5 text-[#9F9FA9] font-normal line-clamp-2"
          >
            {post.excerpt}
          </motion.p>
        ) : null}
      </Link>
    </motion.article>
  );
};

export default BlogCard;