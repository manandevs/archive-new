"use client";

import { cn } from "@/utils/cn";
import SectionIntro from "../shared/SectionIntro";
import { motion, Variants } from "framer-motion";

const riskItems = [
  {
    title: "The €35M liability",
    description:
      "Probabilistic safety is a structural risk. Arbiris delivers the Pre-execution Enforcement mandated by Article 14 of the EU AI Act.",
  },
  {
    title: "100% liability",
    description:
      "The responsibility void is the financial gap between agentic intent and human verification. Close it with hardware-rooted receipts.",
  },
  {
    title: "Uninsurable by default",
    description:
      "Carrier mandates now require hardware-rooted proof for agentic liability. Arbiris secures you by making every autonomous action insurable.",
  },
];

const RiskSection = () => {
  // Container for staggered children
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

  // Individual risk card entrance
  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 25
    },
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
    <section className="border-b border-b-white/8 py-16 md:py-24 lg:py-32">
      <div className="mx-auto grid w-full max-w-360 grid-cols-1 gap-12 px-4 md:gap-20 md:px-6 lg:gap-32 lg:px-8">
        <SectionIntro
          title="Stop managing risk and start preventing it"
          description="Shift from observational safety to hardware-anchored enforcement and secure your agentic workforce before they act."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3"
        >
          {riskItems.map((item, idx) => (
            <motion.article
              key={item.title}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              viewport={{ once: true }}
              className={cn(
                "min-h-[177px] border-b border-white/8 px-6 py-7 last:border-b-0 md:border-b-0 md:px-11 md:py-9 transition-colors duration-300",
                idx < riskItems.length - 1 && "md:border-r md:border-white/8"
              )}
            >
              <motion.h3
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                viewport={{ once: true }}
                className="text-[20px] font-bold text-[#F7F8F8]"
              >
                {item.title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 + idx * 0.1 }}
                viewport={{ once: true }}
                className="mt-3 text-[15px] text-[#8A8F98]"
              >
                {item.description}
              </motion.p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default RiskSection;