import Image from 'next/image';
import { easeOut, motion, type Variants } from 'framer-motion';

export default function ProductFeaturesList() {
  const sectionsData = [
    {
      fig: 'FIG 2.1 – INSTRUMENT',
      title: 'Capture every material decision in three lines.',
      description: 'Drop the Arbiris SDK into your existing agent code. It wraps around agent actions and captures a structured, cryptographically timestamped record of everything material—automatically, without changing your architecture.',
      bullets: [
        'LangChain, LlamaIndex, AutoGen, and raw API support',
        'Model version pinned to every individual action',
        'Tamper-evident proof receipt generated instantly',
        'Policy reference binding at instrumentation time'
      ],
      image: "/images/instrument.png"
    },
    {
      fig: 'FIG 2.2 – MONITOR',
      title: 'A dashboard compliance officers can actually use.',
      description: 'Every agent action, in plain English, mapped to the regulatory framework you operate under. Exception queues for human review. Real-time policy coverage gaps. No engineering degree required.',
      bullets: [
        'Real-time intent feed with risk-level triage',
        'Workflow explorer reconstructs multi-step agent chains',
        'Exception queue with one-click approve / escalate / reject',
        'Policy coverage gaps surfaced automatically'
      ],
      image: "/images/monitor.svg"
    },
    {
      fig: 'FIG 2.3 – EVIDENCE',
      title: 'Regulator-ready documentation. One click.',
      description: 'Select a data range and a regulatory framework. Arbiris generates a formatted, audit-ready document — structured to EU AI Act Annex IV requirements — that you can hand directly to a regulator or external auditor.',
      bullets: [
        'EU AI Act Annex IV technical documentation format',
        'Full decision chain visible — every agent step reconstructed for review',
        '10 years tamper-evident retention, built in from day one',
        'Cryptographic proof receipts for every action included'
      ],
      image: "/images/evidence.svg"
    }
  ];

  const textContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };


  const listContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -12 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: easeOut },
    },
  };

  const figContainerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.016 },
    },
  };

  const figCharVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.1, ease: easeOut },
    },
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 10, filter: 'blur(6px)', letterSpacing: '0.01em' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      letterSpacing: '0em',
      transition: { duration: 0.7, ease: easeOut },
    },
  };

  const descriptionVariants: Variants = {
    hidden: { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
    visible: {
      opacity: 1,
      clipPath: 'inset(0 0% 0 0)',
      transition: { duration: 0.85, ease: easeOut },
    },
  };

  const checkVariants: Variants = {
    hidden: { opacity: 0, scale: 0.4, rotate: -25 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { duration: 0.45, ease: 'backOut' },
    },
  };

  const bulletTextVariants: Variants = {
    hidden: { opacity: 0, x: -6 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.35, ease: easeOut, delay: 0.08 },
    },
  };

  return (
    <div className="w-full py-20 px-6 md:px-16 select-none min-h-screen" id='design-partners'>
      <div className="max-w-[1340px] mx-auto space-y-24 md:space-y-36">

        {sectionsData.map((section, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={index}
              className={`flex flex-col lg:flex-row items-center gap-12 sm:gap-16 lg:gap-20 p-6 md:p-9 lg:p-12 justify-between ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
            >
              <motion.div
                className="w-full lg:max-w-150 text-left"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={textContainerVariants}
              >
                <motion.div className="text-[12px] font-mono text-[#8A8F98] uppercase mb-3 font-normal" variants={figContainerVariants}>
                  {section.fig.split('').map((char, i) => (
                    <motion.span key={i} variants={figCharVariants}>
                      {char}
                    </motion.span>
                  ))}
                </motion.div>
                <motion.h3 className="text-2xl font-medium text-[#F7F8F8] mb-3" variants={titleVariants}>{section.title}</motion.h3>
                <motion.p className="text-[15px] text-[#8A8F98] font-normal mb-6" variants={descriptionVariants}>{section.description}</motion.p>

                <motion.ul
                  className="space-y-2.5 text-[15px] text-[#8A8F98] font-normal"
                  variants={listContainerVariants}
                >
                  {section.bullets.map((bullet, bIndex) => (
                    <motion.li key={bIndex} className="flex items-start gap-2.5" variants={listItemVariants}>
                      <motion.svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" variants={checkVariants} style={{ flexShrink: 0 }}>
                        <path d="M8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16ZM11.6875 4.55312C11.3531 4.30937 10.8844 4.38438 10.6406 4.71875L6.90938 9.85L5.28125 8.22188C4.9875 7.92813 4.5125 7.92813 4.22188 8.22188C3.93125 8.51562 3.92813 8.99063 4.22188 9.28125L6.47188 11.5312C6.62813 11.6875 6.84062 11.7656 7.05937 11.75C7.27812 11.7344 7.47812 11.6219 7.60625 11.4438L11.8531 5.6C12.0969 5.26562 12.0219 4.79688 11.6875 4.55312Z" fill="#F7F8F8" />
                      </motion.svg>
                      <motion.span variants={bulletTextVariants}>{bullet}</motion.span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>

              <motion.div
                className="w-full lg:max-w-[564px] flex items-center justify-center relative"
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: easeOut }}
              >
                <Image
                  src={section.image}
                  alt={section.title}
                  width={1200}
                  height={1200}
                  className='w-141 h-95 z-20'
                />

                <div className="absolute bottom-0 left-0 h-1/6 w-full bg-linear-to-t from-[#08090A] via-[#08090abe] to-transparent z-50" />
              </motion.div>
            </div>
          );
        })}

      </div>
    </div>
  );
}