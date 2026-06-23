"use client";

import { scrollToSection } from "@/utils/scroll";
import Image from "next/image";
import Link from "next/link";

import { usePathname, useRouter } from "next/navigation";

const footerLinks = [
  { label: "Platform", link: "/#platform" },
  { label: "AARF Standard", link: "/#aarf-standar" },
  { label: "Design Partners", link: "/#design-partners" },
  { label: "Blog", link: "/blog" },
];
const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <section className="py-8 border-t border-t-white/8">
      <div className="relative mx-auto flex w-full max-w-360 items-center justify-between gap-4 px-4 text-center md:gap-0 md:px-6 md:text-left xl:px-8">
        <Image
          src="/icons/logo.svg"
          alt="Arbiris logo"
          width={24}
          height={24}
          loading="eager"
        />

        <nav className="hidden items-center gap-5.75 text-[13px] text-[#8A8F98] md:flex">
          {footerLinks.map((item, index) => (
            <Link
              onClick={(e) => {
                if (!item.link.includes("#")) return;

                e.preventDefault();
                const id = item.link.split("#")[1];

                if (pathname === "/") {
                  scrollToSection(id);
                } else {
                  router.push("/#" + id);
                }
              }}
              key={index}
              href={item.link}
              className="transition-colors hover:text-[#aeb6c3]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <p className="text-[13px] text-[#8A8F98]">© 2026 Arbiris Protocol</p>
      </div>
    </section>
  );
};

export default Footer;
