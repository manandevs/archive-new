"use client";

import SectionIntro from "../shared/SectionIntro";
import { motion, easeOut } from 'framer-motion'

const scenarioData = [
  {
    title: 'The FCA called',
    description: 'Your AI agent made 40,000 credit decisions last quarter. You have usage logs — but no structured record of the reasoning, the model version, or which human reviewed edge cases. The FCA has given you three weeks...',
  },
  {
    title: 'Enterprise clients want evidence',
    description: 'Procurement asked whether your AI systems are EU AI Act compliant. Your legal team said yes. Now they want documentation — and producing it means weeks of forensic work across logs no auditor can read.',
  },
  {
    title: 'You upgraded the model',
    description: "In January you ran one model version. In March you switched. Something changed in the outputs — and nobody can say exactly when, because model version isn't captured at the action level.",
  },
];

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

const cardContentVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardTextVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)", letterSpacing: "0.02em" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    letterSpacing: "0em",
    transition: { duration: 0.55, ease: easeOut },
  },
};

const accentLineVariants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 0.7, ease: easeOut, delay: 0.15 },
  },
};

const IntentProof = () => {
  return (
    <section className="border-b border-b-white/8 py-16 md:py-24 lg:py-32 px-4 md:px-6 lg:px-8" id="protocol">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 md:gap-20 lg:gap-32">
        <SectionIntro
          title="Three questions you cannot answer today"
          description="Regulated firms deploying AI agents are building on the same unstable ground: the decisions are happening, the accountability isn't captured."
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={gridVariants}
        >
          {scenarioData.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className={`relative flex flex-col text-left px-6 py-4 md:px-8 lg:px-11 md:py-6 lg:py-9 ${index !== 0 ? 'md:border-l md:border-neutral-900' : ''}`}
            >
              {index !== 0 && (
                <motion.div
                  variants={accentLineVariants}
                  className="hidden md:block absolute left-0 top-0 bottom-0 w-px"
                />
              )}
              <motion.div variants={cardContentVariants}>
                <motion.h3
                  className="text-xl font-bold tracking-tight mb-4 text-neutral-100"
                  variants={titleVariants}
                >
                  {item.title}
                </motion.h3>
                <motion.p
                  className="text-sm md:text-base leading-relaxed text-neutral-400 font-normal"
                  variants={cardTextVariants}
                >
                  {item.description}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default IntentProof;