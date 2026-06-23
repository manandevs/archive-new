import { easeOut, motion, type Variants } from 'framer-motion';
import { BsGithub } from 'react-icons/bs';

export default function AARFFramework() {
    const pillars = [
        { num: '01', name: 'Agent Identity' },
        { num: '02', name: 'Intent Declaration' },
        { num: '03', name: 'Policy Binding' },
        { num: '04', name: 'Human Oversight' },
    ];

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.12,
            },
        },
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 24 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: easeOut },
        },
    };

    const fadeLeft = {
        hidden: { opacity: 0, x: -32 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.7, ease: easeOut },
        },
    };

    const listContainerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.2,
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

    // FIG label: resolves letter-by-letter like a printout, distinct from
    // every other reveal style in this section.
    const figContainerVariants: Variants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.018 },
        },
    };

    const figCharVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.12, ease: easeOut },
        },
    };

    // Heading: a quiet blur + tracking settle rather than a slide, so it
    // resolves into focus instead of arriving from off-position.
    const headingVariants: Variants = {
        hidden: { opacity: 0, y: 10, filter: 'blur(6px)', letterSpacing: '0.01em' },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            letterSpacing: '0em',
            transition: { duration: 0.7, ease: easeOut },
        },
    };

    // Paragraphs: each one staggers in on its own slightly varied rhythm
    // rather than fading as a single block.
    const paragraphContainerVariants: Variants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.15, delayChildren: 0.05 },
        },
    };

    const paragraphVariants: Variants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.55, ease: easeOut },
        },
    };

    // "Four pillars" label: text fades while a thin underline draws in
    // beneath it, like a section being stamped into place.
    const pillarsLabelVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.4, ease: easeOut },
        },
    };

    const pillarNumVariants: Variants = {
        hidden: { opacity: 0, scale: 0.6 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.35, ease: 'easeOut', delay: 0.08 },
        },
    };

    const footerVariants: Variants = {
        hidden: { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
        visible: {
            opacity: 1,
            clipPath: 'inset(0 0% 0 0)',
            transition: { duration: 0.8, ease: easeOut },
        },
    };

    return (
        <div id='aarf-standard' className="w-full py-16 px-6 md:px-12 min-h-screen flex items-center justify-center">
            <motion.div
                className="max-w-335 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
            >
                <motion.div className="w-full max-w-141 relative" variants={fadeLeft}>
                    <motion.img
                        src="/images/AARF-framework.png"
                        alt="AARF Levels Tracker Dashboard"
                        className="w-full h-auto block object-cover"
                        initial={{ opacity: 0, scale: 1.03 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.9, ease: easeOut }}
                    />
                    <div className="absolute bottom-0 left-0 h-1/3 w-full bg-linear-to-t from-[#08090A] to-transparent" />
                </motion.div>

                <div className="w-full max-w-150 px-2.5 text-left flex flex-col justify-center">
                    <motion.div
                        className="text-[12px] font-mono text-[#8A8F98] uppercase mb-3 font-normal"
                        variants={figContainerVariants}
                    >
                        {'FIG 1.5 - AARF FRAMEWORK'.split('').map((char, i) => (
                            <motion.span key={i} variants={figCharVariants}>
                                {char}
                            </motion.span>
                        ))}
                    </motion.div>

                    <motion.h2
                        className="text-2xl font-medium text-[#F7F8F8] mb-3"
                        variants={headingVariants}
                    >
                        Open, versioned, free to adopt.
                    </motion.h2>

                    <motion.div
                        className="space-y-4 text-[15px] text-[#8A8F98] font-normal mb-7"
                        variants={paragraphContainerVariants}
                    >
                        <motion.p variants={paragraphVariants}>
                            Most organisations deploying AI agents in 2026 have AI policies. What they lack is a structured specification for what should be captured and evidenced every time an agent takes a decision affecting a customer, transaction, or regulated outcome.
                        </motion.p>
                        <motion.p variants={paragraphVariants}>
                            AARF defines the minimum viable audit trail for compliant agentic AI: intent records, cryptographic signatures, policy references, oversight status, retention, and evidence packs.
                        </motion.p>
                        <motion.p variants={paragraphVariants}>
                            The framework lets teams adopt incrementally while showing exactly where they stand against a published standard, not an internal scorecard.
                        </motion.p>
                    </motion.div>

                    <motion.div variants={fadeUp}>
                        <h4 className="text-[15px] font-semibold text-[#8A8F98] uppercase mb-0.5 relative inline-block">
                            <motion.span variants={pillarsLabelVariants}>Four pillars</motion.span>
                        </h4>
                        <motion.ul
                            className="space-y-0.5 text-sm"
                            variants={listContainerVariants}
                        >
                            {pillars.map((pillar) => (
                                <motion.li
                                    key={pillar.num}
                                    className="flex items-center gap-3"
                                    variants={listItemVariants}
                                >
                                    <motion.span className="text-[#8A8F98] font-semibold" variants={pillarNumVariants}>
                                        {pillar.num}
                                    </motion.span>
                                    <span className="text-[#8A8F98]">{pillar.name}</span>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>

                    <motion.p
                        className="text-[15px] text-[#8A8F98] font-normal pt-6 mb-8"
                        variants={footerVariants}
                    >
                        The floor below which no regulated firm should build. Free to adopt. Maintained by Arbiris. Mapped to FCA SM&CR, EU AI Act, GDPR Article 22, and FCA Consumer Duty.
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
                        variants={fadeUp}
                    >
                        <motion.a
                            href="#download"
                            className="btn-animate inline-flex items-center justify-center gap-2 bg-white text-[15px] font-medium text-[#08090A] px-5 py-2.75 rounded-full"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ duration: 0.2, ease: easeOut }}
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 11.3335C2 11.9535 2 12.2635 2.06815 12.5178C2.25309 13.208 2.79218 13.7471 3.48237 13.932C3.7367 14.0002 4.04669 14.0002 4.66667 14.0002H11.3333C11.9533 14.0002 12.2633 14.0002 12.5177 13.932C13.2078 13.7471 13.7469 13.208 13.9319 12.5178C14 12.2635 14 11.9535 14 11.3335" stroke="#0D1016" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M11 7.66669C11 7.66669 8.79056 10.6667 7.99996 10.6667C7.20943 10.6667 5 7.66669 5 7.66669M7.99996 10V2" stroke="#0D1016" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Download AARF v0.1 PDF
                        </motion.a>

                        {/* GitHub Link Button */}
                        <motion.a
                            href="https://github.com"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-2 text-[#F7F8F8] font-medium text-[15px] px-4 py-2.5"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ duration: 0.2, ease: easeOut }}
                        >
                            <BsGithub size={18} />

                            View framework on GitHub
                            <motion.svg
                                width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
                                whileHover={{ x: 2, y: -2 }}
                                transition={{ duration: 0.2, ease: easeOut }}
                            >
                                <path d="M9.99967 2H11.9997C12.9425 2 13.4139 2 13.7068 2.29289C13.9997 2.58579 13.9997 3.05719 13.9997 4V6M13.333 2.66667L7.33301 8.66667" stroke="#F7F8F8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M13.3333 8.6665C13.3333 11.1806 13.3333 12.4378 12.5523 13.2188C11.7713 13.9998 10.5141 13.9998 8 13.9998H7.33333C4.81917 13.9998 3.5621 13.9998 2.78105 13.2188C2 12.4378 2 11.1806 2 8.6665V7.99984C2 5.48568 2 4.2286 2.78105 3.44755C3.5621 2.6665 4.81917 2.6665 7.33333 2.6665" stroke="#F7F8F8" strokeWidth="1.5" strokeLinecap="round" />
                            </motion.svg>
                        </motion.a>
                    </motion.div>

                </div>

            </motion.div>
        </div>
    );
}