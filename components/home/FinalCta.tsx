"use client";

import { motion, Variants } from "framer-motion";
import TextGenerateEffect from "../shared/TextGenerateEffect";
import { useState } from "react";
import RequestForm from "../contact-popups/RequestForm";
import Image from "next/image";
import { IoArrowForwardSharp } from "react-icons/io5";

const FinalCta = () => {
  const [showRequest, setShowRequest] = useState(false);

  const containerVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.96,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1] as const,
        staggerChildren: 0.1,
        delayChildren: 0.2
      },
    },
  };

  // Text element reveal
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section className="border-b border-b-white/8 py-16 md:py-24 lg:py-32 w-full flex justify-center items-center flex-col">
      <div className="relative w-full max-w-360 px-4 md:px-6 xl:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="relative flex flex-col items-center justify-center rounded-xl bg-[#14151680] px-4 py-12 text-center sm:px-6 md:px-8 md:py-16 overflow-hidden"
        >
          {/* Subtle background glow pulse */}
          <motion.div
            animate={{
              opacity: [0.3, 0.5, 0.3],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none"
          />

          <motion.p
            variants={itemVariants}
            className="relative z-10 text-[12px] uppercase text-[#8A8F98] font-normal"
          >
            FIG 3.0 — DESIGN PARTNER PROGRAMME
          </motion.p>

          <motion.h2
            variants={itemVariants}
            className="relative z-10 mt-8 w-full max-w-135 text-3xl font-medium leading-[1.0] text-[#F7F8F8] sm:text-4xl lg:mt-9 lg:text-[48px]"
          >
            <TextGenerateEffect words="Don&apos;t let liability kill your AI roadmap." />
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="relative z-10 mt-6 max-w-130 text-[14px] text-[#8A8F98] sm:mt-8 sm:text-[15px]"
          >
            Five design partners will shape Arbiris and the AARF framework from the ground up — early access, roadmap input, and locked-in pricing.
          </motion.p>

          <Cards />

          <div className="flex flex-col items-center gap-9">
            <a
              href="#"
              className="btn-animate inline-flex items-center justify-center gap-2 bg-white text-[15px] font-medium text-[#08090A] px-5 py-2.75 rounded-full"
            >
              Apply for design partner access <IoArrowForwardSharp size={18} strokeWidth={1} />
            </a>

            <p className="text-center text-[#8A8F98] font-medium text-[15px] ">
              5 spots remaining · 2-minute application
            </p>
          </div>
        </motion.div>
      </div>

      <RequestForm isOpen={showRequest} onClose={() => setShowRequest(false)} />

    </section>
  );
};

export default FinalCta;



const cards = [
  {
    title: "Early access",
    image: "/images/early-access.png",
    description: "Full platform access from day one, before general release.",
  },
  {
    title: "Co-development input",
    image: "/images/co-development-input.png",
    description: "Monthly sessions to shape the roadmap around your compliance workflow.",
  },
  {
    title: "Preferential terms",
    image: "/images/preferential-terms.png",
    description: "Locked-in pricing and priority onboarding for the first cohort.",
  },
];

const Cards = () => {
  // Container variants to orchestrate the stagger of individual cards
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Individual card animation: Fade in and slide up slightly
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-3 max-w-300 my-9"
    >
      {cards.map((card, idx) => (
        <motion.article
          key={card.title}
          variants={cardVariants}
          whileHover={{ y: -8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="px-11 py-9 min-h-[294px] border-b border-r-0 md:border-r md:border-b-0 border-[#1E1E1E] md:px-11 md:py-9 text-start">

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.2 + idx * 0.1,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1] as const,
            }}
            viewport={{ once: true }}
          >
            <Image
              src={card.image}
              alt={`${card.title} visual`}
              width={196}
              height={196}
              className="h-24 md:h-32 w-auto object-contain"
            />
          </motion.div>

          <h3 className="mt-6 text-[15px] font-bold text-[#F7F8F8]">
            {card.title}
          </h3>
          <p className="mt-3 text-[15px] text-[#8A8F98]">{card.description}</p>
        </motion.article>
      ))}
    </motion.div>
  );
};