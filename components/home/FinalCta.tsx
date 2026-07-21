"use client";

import { motion, Variants } from "framer-motion";
import TextGenerateEffect from "../shared/TextGenerateEffect";
import { useState } from "react";
import RequestForm from "../contact-popups/RequestForm";
import { IoArrowForwardSharp } from "react-icons/io5";

const FinalCta = () => {
  const [showRequest, setShowRequest] = useState(false);

  const containerVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.96,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1] as const,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

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
          className="relative flex flex-col items-center justify-center rounded-xl bg-[#14151680] px-4 py-12 text-center border border-white/8 overflow-hidden"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-5xl font-medium tracking-tight text-[#F7F8F8] max-w-2xl mb-4"
          >
            <TextGenerateEffect words="Ready to secure your AI deployments?" duration={1} />
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-[#8A8F98] max-w-xl mb-8"
          >
            Anchor your autonomous systems to statutory logic and maintain an audit-ready compliance posture.
          </motion.p>

          <motion.div variants={itemVariants}>
            <button
              type="button"
              onClick={() => setShowRequest(true)}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text.sm font-medium text-[#08090A] transition-transform hover:scale-105"
            >
              Request Institutional Briefing
              <IoArrowForwardSharp size={16} />
            </button>
          </motion.div>
        </motion.div>
      </div>

      <RequestForm isOpen={showRequest} onClose={() => setShowRequest(false)} />
    </section>
  );
};

export default FinalCta;