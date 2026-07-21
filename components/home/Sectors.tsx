"use client";

import { cn } from "@/utils/cn";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import SectionIntro from "../shared/SectionIntro";

const sectors = [
  {
    fig: "FCA Financial Crime · SYSC 6.3 · Proceeds of Crime Act",
    title: "Fraud Detection & FRAML",
    image: "/images/fraud-detection.png",
    points: [
      "Decision reasoning captured at action level — not just the outcome",
      "Model version pinned to every block or pass decision",
      "Human escalation pathway logged and timestamped",
    ],
  },
  {
    fig: "JMLSG Guidance · Proceeds of Crime Act · FCA Financial Crime",
    title: "AML & Transaction Monitoring",
    image: "/images/transaction-monitoring.png",
    points: [
      "Trigger event and threshold captured per transaction",
      "Reasoning chain retained for every alert — cleared or escalated",
      "Named Senior Manager accountable for monitoring programme",
    ],
  },
  {
    fig: "OFSI · UK Sanctions Regulations · UN Consolidated List",
    title: "Sanctions Screening",
    image: "/images/sanctions-screening.png",
    points: [
      "Match / no-match decision recorded with list version at time of screening",
      "False positive resolution documented with human reviewer identity",
      "Policy reference bound to each screening action",
    ],
  },
  {
    fig: "Consumer Duty · CONC · GDPR Article 22",
    title: "Credit decisioning",
    image: "/images/credit-decisioning.png",
    points: [
      "Affordability assessment inputs retained per application",
      "Counterfactual explanation available for every declined decision",
      "Consumer Duty outcome classification recorded at action level",
    ],
  },
  {
    fig: "EMIR · MiFID II · MAR 1.2 · FCA TR Q&As",
    title: "Trade Reporting",
    image: "/images/trade-reporting.png",
    points: [
      "Report submission linked to the agent action that generated it",
      "Amendment and cancellation events logged with reasoning",
      "Market abuse indicator checks captured per trade",
    ],
  },
  {
    fig: "FCA KYC Guidance · GDPR Article 22 · MLR 2017",
    title: "KYC & Onboarding",
    image: "/images/kyc-onboarding.png",
    points: [
      "Identity verification outcome and data sources retained per application",
      "Risk classification reasoning captured at onboarding point",
      "Human review checkpoint logged where enhanced due diligence applies",
    ],
  },
];

const Sectors = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const figVariants: Variants = {
    hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
    visible: {
      opacity: 1,
      clipPath: "inset(0 0% 0 0)",
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay: 0.15 },
    },
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 8, filter: "blur(5px)", letterSpacing: "0.01em" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      letterSpacing: "0em",
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay: 0.22 },
    },
  };

  const listContainerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.35 },
    },
  };

  const liVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section
      className="border-b border-b-white/8 py-16 md:py-24 lg:py-32 px-4 md:px-6 lg:px-8"
      id="sectors"
    >
      <div className="mx-auto grid w-full max-w-335 grid-cols-1 gap-12 md:gap-20 lg:gap-32">
        <SectionIntro
          title="Every agent. Every obligation. Covered."
          description="Every sector operates under different mandates. Arbiris maps your agent actions to the frameworks that govern them — out of the box."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {sectors.map((item, idx) => (
            <motion.article
              key={item.title}
              variants={cardVariants}
              className={cn(
                "min-h-[338px] border-b border-white/8 px-6 py-7 last:border-b-0 md:border-b-0 md:px-11 md:py-9 transition-colors duration-300",
                idx % 2 === 0 && "sm:border-r sm:border-white/8",
                idx % 3 !== 2
                  ? "lg:border-r lg:border-white/8"
                  : "lg:border-r-0",
              )}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 + idx * 0.05 }}
                viewport={{ once: true }}
                className="h-24 w-24 md:h-32 md:w-32 relative"
              >
                <Image
                  src={item.image}
                  alt={`${item.title} visual`}
                  width={916}
                  height={916}
                  className="h-24 w-24 object-cover md:h-32 md:w-32"
                />
              </motion.div>

              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={figVariants}
                className="mt-7 text-[9px] uppercase text-[#8A8F98] tracking-widest"
              >
                {item.fig}
              </motion.p>
              <motion.h3
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={titleVariants}
                className="mt-3 text-[20px] font-bold text-[#F7F8F8]"
              >
                {item.title}
              </motion.h3>

              <motion.ul
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={listContainerVariants}
                className="mt-7 space-y-3 text-[15px] text-[#8A8F98] list-disc pl-4"
              >
                {item.points.map((point) => (
                  <motion.li key={point} variants={liVariants}>
                    {point}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Sectors;