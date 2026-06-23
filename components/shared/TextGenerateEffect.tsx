"use client"

import { cn } from "@/utils/cn"
import { motion, stagger, useAnimate, useInView } from "motion/react"
import * as React from "react"

export type TextSegment = {
  text: string;
  className?: string;
}

type TextGenerateEffectProps = Omit<React.ComponentProps<"div">, "children"> & {
  words?: string 
  segments?: TextSegment[] 
  filter?: boolean
  duration?: number
  staggerDelay?: number
}

function TextGenerateEffect({
  words,
  segments,
  className,
  filter = true,
  duration = 0.75,
  staggerDelay = 0.1,
  ...props
}: TextGenerateEffectProps) {
  const localRef = React.useRef<HTMLDivElement>(null)
  const [scope, animate] = useAnimate()
  const isInView = useInView(localRef, { once: true, margin: "-10%" })

  // Convert string 'words' to segments if provided
  const allSegments = React.useMemo(() => {
    if (segments) return segments;
    if (words) return [{ text: words, className: "" }];
    return [];
  }, [words, segments]);

  React.useEffect(() => {
    if (isInView && scope.current) {
      // Targets every motion.span to play on a single continuous timeline
      animate(
        "span",
        {
          opacity: 1,
          filter: filter ? "blur(0px)" : "none",
        },
        {
          duration,
          delay: stagger(staggerDelay),
        },
      )
    }
  }, [isInView, animate, duration, filter, scope, staggerDelay])

  return (
    <div
      className={cn("font-medium inline", className)} 
      ref={localRef}
      {...props}
    >
      <motion.div ref={scope} className="inline">
        {allSegments.map((segment, sIdx) => {
          // Splitting by space ensures we treat each word as an atomic unit
          const wordsArray = segment.text.split(" ");
          
          return (
            <span key={sIdx} className={cn("inline", segment.className)}>
              {wordsArray.map((word, wIdx) => (
                <motion.span
                  className="opacity-0 will-change-[transform,opacity,filter] inline-block"
                  key={`${word}-${wIdx}`}
                  style={{
                    filter: filter ? "blur(10px)" : "none",
                    // whiteSpace: "pre" ensures that the trailing space character 
                    // is rendered and not collapsed by the browser
                    whiteSpace: "pre",
                  }}
                >
                  {/* Append a space to every word to maintain natural sentence structure */}
                  {word}{" "}
                </motion.span>
              ))}
            </span>
          );
        })}
      </motion.div>
    </div>
  )
}

export { TextGenerateEffect }
export default TextGenerateEffect