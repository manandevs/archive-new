"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionIntro from "../shared/SectionIntro";

const featuresData = [
  {
    fig: 'FIG. 1.1',
    title: 'Agent Identity',
    description: 'Every agent is registered before deployment with its owner, version, model, policy scope, and accountable SMF.',
    image: "/images/agent-identity.png"
  },
  {
    fig: 'FIG. 1.2',
    title: 'Intent Declaration',
    description: 'Every material action is captured as a signed record of context, reasoning, outcome, policy authority, and oversight.',
    image: "/images/intent-declaration.png"
  },
  {
    fig: 'FIG. 1.3',
    title: 'Policy Binding',
    description: 'Every action is linked to the versioned policy, rule, or regulatory instrument that authorised it at execution.',
    image: "/images/policy-binding.png"
  },
  {
    fig: 'FIG. 1.4',
    title: 'Human Oversight',
    description: 'Every action declares the oversight actually applied: pre-execution, post-execution, or none, under approved tier rules.',
    image: "/images/human-oversight.png"
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.18, delayChildren: 0.1 }
  },
} as const;

const figContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.025 },
  },
} as const;

const figCharVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.15, ease: "easeOut" },
  },
} as const;

const imageVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: "easeOut" },
  },
} as const;

const textVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
} as const;

const StatutoryLogic = () => {
  return (
    <section className="border-b border-b-white/8 py-16 md:py-24 lg:py-32 px-4 md:px-6 lg:px-8" id="enforcement">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1">
        {/* Animated header section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <SectionIntro
            title="The industry standard for AI agent accountability"
            description="The open standard for AI agent audit trails. Model, framework, infrastructure — independent of all three. Built by Arbiris. Free to use. Free to adopt."
          />
        </motion.div>
      </div>

      <div className="max-w-335 w-full grid grid-cols-1 md:grid-cols-2 border border-[#FFFFFF14] mt-12 md:mt-20 lg:mt-32">
        {featuresData.map((item, index) => {
          const borderClasses = `
            border-[#FFFFFF14] flex flex-col justify-between min-h-[460px]
            ${index === 0 ? 'border-b md:border-r' : ''}
            ${index === 1 ? 'border-b' : ''}
            ${index === 2 ? 'border-b md:border-b-0 md:border-r' : ''}
            ${index === 3 ? '' : ''}
          `;

          return (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              className={borderClasses}
            >
              <motion.div
                className="text-[12px] font-mono text-[#8A8F98] uppercase mb-2.5 p-6 md:p-8"
                variants={figContainerVariants}
              >
                {item.fig.split("").map((char, i) => (
                  <motion.span key={i} variants={figCharVariants}>
                    {char}
                  </motion.span>
                ))}
              </motion.div>

              <motion.div
                className="w-full flex items-center justify-center relative mx-auto my-15.5 p-4"
                variants={imageVariants}
              >
                <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.3, ease: "easeOut" }}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={500}
                    height={500}
                    className="h-73.5 w-90"
                  />
                </motion.div>

                <div className="absolute bottom-0 left-0 h-1/3 w-full bg-linear-to-t from-[#08090A] to-transparent" />
              </motion.div>

              {/* Text Meta Content */}
              <motion.div className="text-left p-6 md:p-8 mt-2.5" variants={textVariants}>
                <h3 className="text-[15px] font-bold text-[#F7F8F8] mb-1">
                  {item.title}
                </h3>
                <p className="text-xs md:text-[15px] text-[#8A8F98] max-w-md font-normal">
                  {item.description}
                </p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default StatutoryLogic;