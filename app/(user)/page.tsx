"use client";

import Hero from "@/components/home/Hero";
import CloudPartners from "@/components/home/CloudPartners";
import IntentProof from "@/components/home/IntentProof";
import StatutoryLogic from "@/components/home/StatutoryLogic";
import GlobalCompliance from "@/components/home/GlobalCompliance";
import Sectors from "@/components/home/Sectors";
import FinalCta from "@/components/home/FinalCta";
import { useEffect } from "react";
import { scrollToSection } from "@/utils/scroll";
import AARFFramework from "@/components/home/AARFFramework";
import ProductFeaturesList from "@/components/home/ProductFeaturesList";

export default function Home() {

   useEffect(() => {
  const hash = window.location.hash;

  if (hash) {
    const id = hash.replace("#", "");

    setTimeout(() => {
      scrollToSection(id);
    }, 100);
  }
}, []);
  
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center">
      <Hero />
      <CloudPartners />
      <IntentProof />
      <StatutoryLogic />
      <AARFFramework />
      <ProductFeaturesList />
      <Sectors />
      <GlobalCompliance />
      <FinalCta />
    </main >
  );
}

