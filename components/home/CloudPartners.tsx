"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import FadeUp from "../shared/FadeUp";

const easeOut = [0.22, 1, 0.36, 1] as const;

const complianceData = [
  { title: 'FCA SM&CR', description: 'Accountability chain' },
  { title: 'EU AI Act', description: 'Article 17 compliance' },
  { title: 'GDPR 22', description: 'Decision rights' },
  { title: '100%', description: 'Open standard' },
];

const statGridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const statCardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOut },
  },
};

// Title reveals with a soft upward unblur + tracking settle, distinct from the
// card's own fade/slide so the two layers feel choreographed rather than identical.
const titleVariants = {
  hidden: { opacity: 0, y: 10, filter: "blur(6px)", letterSpacing: "0.04em" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    letterSpacing: "0em",
    transition: { duration: 0.7, ease: easeOut, delay: 0.08 },
  },
};

const descriptionVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut, delay: 0.22 },
  },
};


const underlineVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: [0, 1, 0],
    transition: {
      scaleX: { duration: 0.5, ease: easeOut, delay: 0.5 },
      opacity: { duration: 1.4, times: [0, 0.3, 1], delay: 0.5 },
    },
  },
};

interface StatCardProps {
  title: string;
  description: string;
}

const StatCard = ({ title, description }: StatCardProps) => {
  const isNumericPercent = /^\d+%$/.test(title.trim());

  return (
    <motion.div
      whileHover="hover"
      animate="rest"
      initial="rest"
      className="flex flex-col items-center justify-center cursor-pointer"
    >
      <motion.h2
        variants={titleVariants}
        className="text-xl md:text-[20px] font-bold tracking-wide mb-1 text-gray-100 relative"
      >
        {isNumericPercent ? <CountUp value={title} /> : title}
        
        <motion.span
          className="absolute left-0 -bottom-1 h-px w-full bg-gradient-to-r from-transparent via-[#FE9900] to-transparent origin-center"
          variants={{
            rest: { scaleX: 0, opacity: 0 },
            hover: {
              scaleX: 1,
              opacity:1,
              transition: {
                scaleX: { duration: 0.45, ease: "easeOut", delay: 0.5 },
                opacity: { duration: 0.35, delay: 0.5 },
              },
            },
          }}
        />
      </motion.h2>
      <motion.p
        variants={descriptionVariants}
        className="text-[15px] text-[#8A8F98] font-normal"
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

// Counts up to a numeric percentage value (e.g. "100%") once in view.
// Falls back gracefully — only used when the title is purely numeric+%.
const CountUp = ({ value }: { value: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const target = parseInt(value, 10);

  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration: 1.1, bounce: 0 });
  const rounded = useTransform(spring, (v) => `${Math.round(v)}%`);

  useEffect(() => {
    if (isInView) {
      const t = setTimeout(() => motionVal.set(target), 150);
      return () => clearTimeout(t);
    }
  }, [isInView, motionVal, target]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

const CloudPartners = () => {
  return (
    <section className="pb-8 pt-14 md:pt-16 lg:pt-20 overflow-hidden max-w-screen">
      <div className="mx-auto w-full">
        <FadeUp>
          <p className="text-center text-[15px] text-[#8A8F98] font-normal">The standard, mapped to what matters:</p>
        </FadeUp>

        <div className="max-w-360 w-full mt-10 mx-auto overflow-hidden md:mt-16">
          <motion.div
            className="max-w-180 mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={statGridVariants}
          >
            {complianceData.map((item, index) => (
              <StatCard key={index} title={item.title} description={item.description} />
            ))}

          </motion.div>
        </div>
      </div>

      <motion.div
        className="relative mt-6 h-28 w-full overflow-hidden md:h-40 lg:hidden"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.65, ease: easeOut }}
      >
        <motion.div className="absolute left-1/2 top-[50%] h-auto w-[300vw] aspect-square -translate-x-1/2 rounded-full border border-white shadow-[0px_4px_32px_64px_rgba(254,153,0,0.08)]"/>
        <div className="absolute top-0 left-0 h-full w-1/3 bg-linear-to-r from-[#08090A] via-25% via-[#08090A] to-transparent" />
        <div className="absolute top-0 right-0 h-full w-1/3 bg-linear-to-l from-[#08090A] via-25% via-[#08090A] to-transparent" />
        <div className="absolute top-0 left-0 h-1/3 w-full bg-linear-to-b from-[#08090A] via-0% via-[#08090A] to-transparent " />
        <div className="absolute bottom-0 left-0 h-1/3 w-full bg-linear-to-t from-[#08090A] via-50% via-[#08090A] to-transparent" />
      </motion.div>

      <motion.div className="relative mt-6 hidden h-36 w-[75vw] overflow-hidden md:h-48 lg:mt-14 lg:block lg:h-64">
        <motion.div className="absolute left-1/2 top-[50%] h-auto w-1320 aspect-square -translate-x-1/2 rounded-full border border-white shadow-[0px_4px_32px_64px_rgba(254,153,0,0.08)]"/>
        <div className="absolute top-0 left-0 h-full w-[10%] bg-linear-to-r from-[#08090A] via-25% via-[#08090A] to-transparent" />
        <div className="absolute top-0 right-0 h-full w-[10%] bg-linear-to-l from-[#08090A] via-25% via-[#08090A] to-transparent" />
        <div className="absolute top-0 left-0 h-[10%] w-full bg-linear-to-b from-[#08090A] via-0% via-[#08090A] to-transparent " />
        <div className="absolute bottom-0 left-0 h-[10%] w-full bg-linear-to-t from-[#08090A] via-50% via-[#08090A] to-transparent" />
      </motion.div>
    </section>
  );
};

export default CloudPartners;