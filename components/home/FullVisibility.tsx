"use client";

import Image from "next/image";
import SectionIntro from "../shared/SectionIntro";
import { motion, Variants } from "framer-motion";

const FullVisibility = () => {
  // Animation for the large dashboard image
  const imageContainerVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.98
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1] as const,
        // Delay ensures the SectionIntro starts its animation first
        delay: 0.1,
      },
    },
  };

  return (
    <section className="border-b border-b-white/8 py-16 md:py-24 lg:py-32">
      <div className="relative mx-auto w-full max-w-360 space-y-12 px-4 md:space-y-20 md:px-6 lg:space-y-32 xl:px-8">
        <SectionIntro
          title="Full visibility with zero ambiguity"
          description="Every agent action is logged, verified, and displayed in real-time. Monitor compliance, latency, or intent across your entire deployment."
          actraPadding={false}
          titleClassName="max-w-[460px]"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={imageContainerVariants}
          className="perspective-1000" // Adds a subtle sense of depth to the transition
        >
          <Image
            src="/images/Dashboard.svg"
            alt="Full visibility protocol monitor dashboard"
            width={1640}
            height={1220}
            className="h-auto w-full object-cover"
            style={{ width: "100%", height: "auto" }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default FullVisibility;