"use client"

import { cn } from "@/utils/cn"
import { motion, Variants } from "motion/react"
import * as React from "react"

type FadeUpProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  distance?: number // How many pixels it travels upwards
  once?: boolean // Should it only animate the first time it's seen?
}

const FadeUp = ({
  children,
  className,
  delay = 0,
  duration = 0.8,
  distance = 20,
  once = true,
}: FadeUpProps) => {
  const variants: Variants = {
    hidden: { 
      opacity: 0, 
      y: distance 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.22, 1, 0.36, 1] as const, // Premium easing
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      variants={variants}
      className={cn("will-change-[transform,opacity]", className)}
    >
      {children}
    </motion.div>
  )
}

export { FadeUp }
export default FadeUp