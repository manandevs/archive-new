"use client";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

import { ParticleBg } from "@/components/home/ParticleBg";
import RequestForm from "@/components/contact-popups/RequestForm";
import NewsletterForm from "@/components/contact-popups/NewsletterForm";
import TextGenerateEffect from "../shared/TextGenerateEffect";
import { IoIosArrowRoundForward } from "react-icons/io";

const Hero = () => {
  const [showRequest, setShowRequest] = useState(false);
  const [showNewsletter, setShowNewsletter] = useState(false);

  return (
    <section className="relative mb-8 pt-16 md:pt-28 lg:pt-45 w-full max-w-screen">
      <div
        className="absolute inset-0 left-1/2 top-[40%] hidden h-250 w-full max-w-360 -translate-1/2 lg:block"
        style={{
          background:
            "radial-gradient(42.19% 50% at 50% 50%, rgba(255,153,0,0.08) 0%, rgba(8,9,10,0.08) 100%)",
        }}
      />
      <ParticleBg />

      <div className="relative mx-auto w-full max-w-360 px-4 text-center md:px-6 xl:px-8">
        <div className="max-w-7xl w-full mx-auto flex flex-col items-center justify-center" style={{ maxWidth: "1080px !important" }}>
          <h1 className="text-3xl font-medium sm:text-4xl lg:text-[64px] max-w-5xl">
            <TextGenerateEffect words="Your AI agents are making decisions you can't explain" />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-103.75 text-[14px] leading-normal font-normal text-[#8A8F98] sm:mt-8 sm:text-[15px] tracking-[0%]"
          >
            A complete, regulator-ready audit trail for every action your AI agents take —{" "}
            <span className="italic text-[#FF9900] font-medium inline">
              before the FCA asks for one.
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1.2,
              duration: 1.75,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-8 flex flex-col items-center justify-center gap-4 text-[15px] sm:flex-row sm:flex-wrap sm:gap-6"
          >
            <button
              onClick={() => setShowRequest(true)}
              className="rounded-full border border-white/20 bg-white px-6 py-3 font-medium text-black cursor-pointer"
            >
              Join the design partner programme
            </button>
            <button
              onClick={() => setShowNewsletter(true)}
              className="font-medium text-[#8A8F98] transition-colors hover:text-[#d3d8df] flex justify-center items-center gap-1 cursor-pointer"
            >
              Download the AARF specification <IoIosArrowRoundForward size={24} strokeWidth={1} />
            </button>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="border-beam-light mt-10 sm:mt-14 h-auto w-full max-w-5xl rounded-2xl mx-auto"
        >
          <Image
            src="/images/hero-trust-layer.jpg"
            alt="Arbiris trust layer visualization"
            width={1380}
            height={922}
            className="h-auto w-full max-w-5xl border-[6px] border-[#FFFFFF14] object-contain rounded-2xl"
            priority
          />
        </motion.div>
        <div
          className="absolute top-full block left-1/2 z-10 h-53.75 w-full -translate-x-1/2 -translate-y-30.75 md:mx-6 xl:mx-8"
          style={{
            background:
              "linear-gradient(180deg, rgba(8,9,10,0) 0%, #08090A 44.23%)",
          }}
        />{" "}
      </div>

      {/* Modal Components */}
      <RequestForm isOpen={showRequest} onClose={() => setShowRequest(false)} />
      <NewsletterForm
        isOpen={showNewsletter}
        onClose={() => setShowNewsletter(false)}
      />
    </section>
  );
};

export default Hero;
