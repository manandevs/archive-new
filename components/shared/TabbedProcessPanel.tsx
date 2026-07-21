"use client";

import { cn } from "@/utils/cn";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeUp from "./FadeUp";

type ProcessStep = {
  title: string;
  icon: string;
  /** Intrinsic SVG size — must match the asset or Next.js dev warns when CSS scales the image */
  iconWidth?: number;
  iconHeight?: number;
  description: string;
  rightImage: string;
  rightImageAlt?: string;
  rightImageWidth?: number;
  rightImageHeight?: number;
  rightContextTitle?: string;
  rightContextBody?: string;
  rightContext?: string;
  showImage?: boolean;
  imageClassName?: string;
};

type TabbedProcessPanelProps = {
  // figureLabel: string;
  steps: ProcessStep[];
  initialActiveIndex?: number;
  panelClassName?: string;
  figureClassName?: string;
  leftColumnClassName?: string;
  rightColumnClassName?: string;
  rightImageWrapperClassName?: string;
  rightImageClassName?: string;
  rightContextClassName?: string;
  rightContextTitleClassName?: string;
  rightContextBodyClassName?: string;
  activeStepClassName?: string;
  inactiveStepClassName?: string;
  IntentProof?: boolean;
};

const TabbedProcessPanel = ({
  // figureLabel,
  steps,
  initialActiveIndex = 0,
  panelClassName,
  figureClassName,
  leftColumnClassName,
  rightColumnClassName,
  rightImageWrapperClassName,
  rightImageClassName,
  rightContextClassName,
  rightContextTitleClassName,
  rightContextBodyClassName,
  activeStepClassName,
  inactiveStepClassName,
  IntentProof = false,
}: TabbedProcessPanelProps) => {
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  const activeStep = steps[activeIndex] ?? steps[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative min-h-0 overflow-hidden rounded-md border border-white/8 bg-[#08090A] p-4 sm:p-6 md:p-8 lg:min-h-140 lg:p-12",
        panelClassName,
      )}
    >
      <div className={cn("pb-6 text-[10px] uppercase text-[#4d5663] md:pb-8 lg:pb-11.5", figureClassName)}>
        FIG. {activeIndex + 1}
      </div>

      <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-[532px_1fr] lg:gap-16">
        {/* Left Column - Steps */}
        <div className={cn("relative z-10 space-y-8", leftColumnClassName)}>
          {steps.map((step, index) => {
            const isActive = index === activeIndex;

            return (
              <motion.button
                key={step.title}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-pressed={isActive}
                whileHover={{ x: isActive ? 0 : 4 }}
                whileTap={{ scale: 0.99 }}
                className={
                  isActive
                    ? cn(
                      "block w-full max-w-[532px] rounded-md border border-white/10 bg-[#141516] px-3 py-3 text-left sm:px-4 sm:py-4",
                      activeStepClassName,
                    )
                    : cn("block w-full max-w-[532px] px-3 text-left sm:px-4 transition-colors hover:text-white", inactiveStepClassName)
                }
              >
                <h3 className="flex items-center gap-3 text-[15px] font-medium text-[#F7F8F8]">
                  <Image
                    src={step.icon}
                    alt={`${step.title} icon`}
                    width={step.iconWidth ?? 16}
                    height={step.iconHeight ?? 16}
                    className="max-h-4 w-auto shrink-0 object-contain"
                    style={{ width: "auto", height: "auto" }}
                  />
                  {step.title}
                </h3>
                <motion.p
                  initial={false}
                  animate={{ opacity: isActive ? 1 : 0.6 }}
                  className="mt-2 text-sm leading-6 text-[#8A8F98] sm:text-[15px]"
                >
                  {step.description}
                </motion.p>
              </motion.button>
            );
          })}
        </div>

        {/* Right Column - Visuals */}
        <div
          className={cn(
            "relative mx-auto w-full max-w-133 px-0 sm:px-2 md:px-4 lg:flex lg:flex-col lg:items-start lg:justify-center",
            IntentProof && "lg:max-w-none lg:mx-0 lg:px-0",
            rightColumnClassName,
          )}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={cn("w-full", rightImageWrapperClassName)}
            >
            {activeStep?.showImage && activeStep?.rightImage && (
              <div
                className={cn(
                  "w-full overflow-hidden ",
                  IntentProof
                    ? "-mr-4 sm:-mr-6 md:-mr-8 lg:-mr-12 rounded-tl-xl rounded-bl-xl border-r-0"
                    : "",
                )}
              >
                {/* Image with bottom fade mask */}
                <div className="relative w-full flex items-center justify-center pt-6">
                  <Image
                    src={activeStep.rightImage}
                    alt={activeStep.rightImageAlt ?? `${activeStep.title} panel visual`}
                    width={activeStep.rightImageWidth ?? 550}
                    height={activeStep.rightImageHeight ?? 400}
                    className={cn("w-full h-auto max-w-[560px] max-h-[355px] object-contain object-top", activeStep.imageClassName, rightImageClassName)}
                  />
                  {IntentProof && (
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-[#08090A] to-transparent" />
                  )}
                </div>
                {/* Description inside the card */}
                {/* {IntentProof && activeStep.description && (
                  <div className="border-t border-white/8 px-5 py-4">
                    <p className="text-[14px] font-semibold text-[#F7F8F8]">{activeStep.title}</p>
                    <p className="mt-1 text-[13px] leading-5 text-[#8A8F98]">{activeStep.description}</p>
                  </div>
                )} */}
              </div>
            )}
              {IntentProof && !activeStep.showImage && (
                <div className="flex flex-row lg:flex-col xl:flex-row items-center justify-center">
                  <div className="w-12 h-12 lg:w-15 lg:h-15 aspect-square border border-white/24 rounded-full flex justify-center items-center relative">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Image
                        src={activeStep.rightImage}
                        alt={activeStep.rightImageAlt ?? `${activeStep.title} panel visual`}
                        width={24}
                        height={24}
                        className={cn("h-auto w-6 object-contain", rightImageClassName)}
                        style={{ height: "auto" }}
                      />
                    </motion.div>
                  </div>

                  {/* Animated Beam Line */}
                  <motion.div className="h-auto w-50 lg:w-auto lg:h-25 xl:w-50 xl:h-auto border border-white/24 relative overflow-hidden">
                    <motion.div
                      initial={{ left: "-100%" }}
                      animate={{ left: "100%" }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 0.5
                      }}
                      className="absolute top-0 h-full w-6 lg:w-20 bg-linear-to-r from-transparent via-amber-500 to-transparent"
                    />
                  </motion.div>

                  <div className="max-w-60 w-full p-4 bg-[#141516] border border-white/8 rounded-lg text-sm lg:text-base">
                    <FadeUp>{activeStep?.rightContext}</FadeUp>
                  </div>
                </div>
              )}
            {/* {IntentProof && !activeStep.showImage && activeStep?.description && (
              <motion.div
                key={`right-desc-${activeIndex}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.18 }}
                className="mt-16 space-y-1"
              >
                <p className="text-[15px] font-semibold text-[#F7F8F8]">{activeStep.title}</p>
                <p className="text-sm leading-6 text-[#8A8F98]">{activeStep.description}</p>
              </motion.div>
            )} */}
            </motion.div>
          </AnimatePresence>

          {/* Context Text Below Image */}
          <AnimatePresence mode="wait">
            {(activeStep?.rightContextTitle || activeStep?.rightContextBody) && (
              <motion.div
                key={`context-${activeIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className={cn("mx-auto mt-7 w-full max-w-133", rightContextClassName)}
              >
                {activeStep.rightContextTitle ? (
                  <p className={cn("text-[15px] font-semibold text-[#F7F8F8]", rightContextTitleClassName)}>
                    {activeStep.rightContextTitle}
                  </p>
                ) : null}
                {activeStep.rightContextBody ? (
                  <p className={cn("mt-4 text-[15px] font-normal text-[#8A8F98]", rightContextBodyClassName)}>
                    {activeStep.rightContextBody}
                  </p>
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default TabbedProcessPanel;