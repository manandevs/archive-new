"use client";

import Image from "next/image";
import SectionIntro from "../shared/SectionIntro";
import { cn } from "@/utils/cn";
import { motion, Variants } from "framer-motion";

const complianceCards = [
  {
    title: "EU AI Act",
    icon: "/icons/compliance-eu-ai-act.svg",
    req: "Robustness, Accuracy, and Cybersecurity with technical logging of all high-risk interactions.",
    solution:
      "Hardware-Rooted Proof of every agentic intent anchored in secure enclaves for immutable auditbility.",
  },
  {
    title: "UK AI Safety",
    icon: "/icons/compliance-uk-ai-safety.svg",
    req: "Transparency and audit trails across every autonomous agentic deployment.",
    solution:
      "Sub-second Cryptographic Receipts for 10-year retention providing a tamper-proof history of autonomous reasoning.",
  },
  {
    title: "FCA",
    icon: "/icons/compliance-fca.svg",
    req: "Fiduciary duty in autonomous advice via provable retail investor alignment.",
    solution:
      "Statutory Logic Enclaves that prevent unauthorized trades by enforcing real-time compliance with fiduciary mandates.",
  },
];

const GlobalCompliance = () => {
  // Container variants to orchestrate the entrance of cards
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  // Card reveal: Slide up and fade in
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

  // Inner content reveal for a "writing" or "appearing" effect
  const contentVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="border-b border-b-white/8 py-16 md:py-24 lg:py-32">
      <div className="relative mx-auto w-full max-w-360 space-y-12 px-4 md:space-y-20 md:px-6 xl:px-8 lg:space-y-32">
        <SectionIntro
          title="Built for global compliance"
          description="FCA, EU AI Act, UK AI Safety, and GDPR — one audit trail, one evidence pack, one platform without rebuilding your documentation process."
          actraPadding={false}
          titleClassName="max-w-[460px]"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {complianceCards.map((card, idx) => (
            <motion.article
              key={card.title}
              variants={cardVariants}
              className={cn(
                "min-h-95 border-b border-white/8 px-6 py-8 last:border-b-0 sm:px-8 lg:border-b-0 lg:px-11 lg:py-9 transition-colors duration-300",
                idx < complianceCards.length - 1 &&
                  "lg:border-r lg:border-white/8",
              )}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                viewport={{ once: true }}
                className="h-10 w-10 overflow-hidden rounded-md"
              >
                <Image
                  src={card.icon}
                  alt={`${card.title} icon`}
                  width={40}
                  height={40}
                  className="h-full w-full object-contain"
                  style={{ height: "auto" }}
                />
              </motion.div>

              <h3 className="mt-6 text-[20px] font-bold text-[#F7F8F8]">
                {card.title}
              </h3>

              <motion.div variants={contentVariants}>
                <p className="mt-6 flex gap-2.5 items-center text-sm font-medium text-[#F7F8F8]">
                  <Image
                    src="/icons/compliance-requirements.svg"
                    alt="Requirements icon"
                    width={16}
                    height={15}
                    style={{ height: "auto" }}
                  />
                  Requirements
                </p>
                <p className="mt-6 text-[15px] leading-6 text-[#8A8F98]">
                  {card.req}
                </p>
              </motion.div>

              <motion.div
                variants={contentVariants}
                transition={{ delay: 0.1 }}
              >
                <p className="mt-6 flex gap-2.5 items-center text-sm font-medium text-[#F7F8F8]">
                  <Image
                    src="/icons/compliance-arbiris-solution.svg"
                    alt="Arbiris solution icon"
                    width={16}
                    height={15}
                    className="w-auto h-auto"
                  />
                  Arbiris solution
                </p>
                <p className="mt-6 text-[15px] leading-6 text-[#8A8F98]">
                  {card.solution}
                </p>
              </motion.div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default GlobalCompliance;
