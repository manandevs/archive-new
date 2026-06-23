"use client";

import { cn } from "@/utils/cn";
import { ReactNode } from "react";
import { motion, Variants } from "framer-motion";
import TextGenerateEffect from "./TextGenerateEffect";

type SectionIntroProps = {
  title: ReactNode;
  description?: ReactNode;
  titleClassName?: string;
  descriptionClassName?: string;
  wrapperClassName?: string;
  actraPadding?: boolean;
};

const SectionIntro = ({
  title,
  description,
  titleClassName,
  descriptionClassName,
  wrapperClassName,
  actraPadding = false,
}: SectionIntroProps) => {
  // Adding explicit type 'Variants' and 'as const' to the ease array
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.25,
        delay: 0.25,
        ease: [0.22, 1, 0.36, 1] as const, 
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      className={cn(
        "grid gap-5 md:grid-cols-2 md:gap-4 lg:gap-8",
        wrapperClassName,
        actraPadding && "px-2 sm:px-4 md:px-6 lg:px-7.5",
      )}
    >
      <motion.h2
        variants={itemVariants}
        className={cn("w-full text-3xl font-medium text-[#F7F8F8] sm:text-4xl lg:text-5xl", titleClassName)}
      >
        <TextGenerateEffect
          words={`${title}`}
          duration={1}
          staggerDelay={0.15}
        />
      </motion.h2>
      {description ? (
        <motion.p
          variants={itemVariants}
          className={cn(
            "max-w-[580px] text-base leading-[1.35] text-[#D0D6E0] sm:text-lg md:justify-self-end md:text-xl lg:text-[24px] lg:leading-[1.2]",
            descriptionClassName,
          )}
        >
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
};

export default SectionIntro;