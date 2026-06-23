"use client";

import Image from "next/image";
import SectionIntro from "../shared/SectionIntro";
import { cn } from "@/utils/cn";
import { motion, Variants } from "framer-motion";

const cards = [
  {
    fig: "FIG. 2.1",
    title: "The Trust Tax",
    image: "/images/trust-tax.png",
    description:
      "Manual oversight is killing your ROI. Stop paying for humans-in-the-loop to watch your machines.",
  },
  {
    fig: "FIG. 2.2",
    title: "Legacy Latency",
    image: "/images/legacy.png",
    description:
      "24-hour audit logs are a fiduciary risk. Arbiris provides deterministic finality in <200ms.",
  },
  {
    fig: "FIG. 2.3",
    title: "The Responsibility Void",
    image: "/images/responsibility-void.png",
    description:
      "Hallucinations are legal liabilities. Ensure your agents stay within statutory bounds.",
  },
];

const TrustTax = () => {
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
    <section className="border-b border-b-white/8 py-16 md:py-24 lg:py-32">
      <div className="relative mx-auto w-full max-w-360 space-y-12 px-4 md:space-y-20 md:px-6 lg:space-y-32 xl:px-8">
        <SectionIntro
          title="Eliminate trust tax and manual oversight"
          description='Remove the structural bottlenecks of manual compliance. Move your agentic workflows from "best-effort" to provably secure.'
          actraPadding={false}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3"
        >
          {cards.map((card, idx) => (
            <motion.article
              key={card.title}
              variants={cardVariants}
              whileHover={{ y: -8 }} // Premium micro-interaction on hover
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={cn(
                "min-h-[320px] border-b border-white/8 px-6 py-7 last:border-b-0 md:min-h-[380px] md:border-b-0 md:px-11 md:py-9",
                idx < cards.length - 1 && "md:border-r md:border-white/8",
              )}
            >
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className="text-[12px] uppercase text-[#4d5663] md:text-[14px]"
              >
                {card.fig}
              </motion.p>

              <div className="mt-10 h-24 w-24 md:mt-16 md:h-32 md:w-32">
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
                    className="h-24 w-24 object-cover md:h-32 md:w-32"
                  />
                </motion.div>
              </div>

              <h3 className="mt-6 text-[15px] font-bold text-[#F7F8F8]">
                {card.title}
              </h3>
              <p className="mt-3 text-sm text-[#8A8F98]">{card.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustTax;
