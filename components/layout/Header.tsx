"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import { motion, Variants, AnimatePresence } from "framer-motion";
import RequestForm from "../contact-popups/RequestForm";
import { usePathname, useRouter } from "next/navigation";
import { scrollToSection } from "@/utils/scroll";

const navItems = [
  { label: "Platform", link: "/#platform" },
  { label: "AARF Standard", link: "/#aarf-standard" },
  { label: "Design Partners", link: "/#design-partners" },
  { label: "Blog", link: "/blog" },
];

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [showRequest, setShowRequest] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    document.body.classList.toggle("header-mobile-nav-open", menuOpen);
    return () => document.body.classList.remove("header-mobile-nav-open");
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const handleScroll = () => {
      // Cleaned IDs matching your navItems links (#platform, #aarf-standard, #design-partners)
      const sections = ["platform", "aarf-standard", "design-partners"];
      let current = "";
      
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) {
          current = id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const handleNavClick = (e: React.MouseEvent, link: string) => {
    setMenuOpen(false);
    if (!link.includes("#")) return;
    e.preventDefault();
    const id = link.split("#")[1];
    if (pathname === "/") {
      scrollToSection(id);
    } else {
      router.push("/#" + id);
    }
  };

  // Helper logic to verify if a nav item matches the current route or anchor section
  const checkIsActive = (link: string) => {
    if (link.includes("#")) {
      return activeSection === link.split("#")[1] && pathname === "/";
    }
    return pathname === link;
  };

  return (
    <>
      <RequestForm isOpen={showRequest} onClose={() => setShowRequest(false)} />

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-60 w-full overflow-y-auto bg-[#08090A] px-4 py-6"
          >
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 rounded border border-white/8 bg-[#1F2227] px-2.5 py-1.5 text-[12px] text-[#F7F8F8] transition-colors hover:bg-[#1a202a] sm:px-3 sm:py-2 sm:text-[13px]"
              >
                <IoCloseSharp size={16} />
                Close Menu
              </button>
            </div>

            <nav className="mt-6 flex flex-col gap-1">
              {navItems.map((item, index) => {
                const isActive = checkIsActive(item.link);
                return (
                  <Link
                    key={`mobile-${index}`}
                    href={item.link}
                    onClick={(e) => handleNavClick(e, item.link)}
                    className={`block rounded px-3 py-3 text-xl transition-colors ${
                      isActive ? "text-[#f7f8f8] font-semibold bg-white/5" : "text-[#8A8F98] hover:text-[#f7f8f8]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <Image
              src="/icons/nav-menu.svg"
              alt=""
              width={200}
              height={200}
              className="absolute bottom-10 right-6 w-40 opacity-5"
              style={{ height: "auto" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.header
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="sticky top-0 z-50 w-full border-b border-white/8 backdrop-blur-md"
      >
        <div className="relative mx-auto flex h-16 w-full min-w-0 max-w-360 items-center justify-between gap-3 px-4 md:h-18.25 md:px-6 xl:px-8">
          <motion.div variants={itemVariants} className="min-w-0 shrink-0">
            <Link
              href="/"
              className="flex items-center gap-2.5"
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              <Image
                src="/icons/logo.svg"
                alt="Arbiris logo"
                width={24}
                height={24}
                priority
                style={{ height: "24px" }}
              />
              <span className="text-[16px] font-bold uppercase sm:text-[20px]">
                ARBIRIS
              </span>
            </Link>
          </motion.div>

          <nav className="mx-auto hidden items-center gap-5.75 text-[13px] font-normal text-[#8A8F98] md:flex">
            {navItems.map((item, index) => {
              const isActive = checkIsActive(item.link);
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative py-2"
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                >
                  <Link
                    href={item.link}
                    onClick={(e) => handleNavClick(e, item.link)}
                    className={`transition-colors ${
                      isActive ? "text-[#f7f8f8] font-semibold" : "text-[#8A8F98] hover:text-[#f7f8f8]"
                    }`}
                  >
                    {item.label}
                  </Link>

                  {/* Underline renders and expands into view dynamically when active */}
                  <motion.span
                    className="absolute left-0 bottom-0 h-px w-full bg-gradient-to-r from-transparent via-[#FE9900] to-transparent origin-center pointer-events-none"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{
                      scaleX: isActive ? 1 : 0,
                      opacity: isActive ? 1 : 0,
                    }}
                    variants={{
                      hover: {
                        scaleX: 1,
                        opacity: 1,
                        transition: { duration: 0.3, ease: "easeOut" }
                      }
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </motion.div>
              );
            })}
          </nav>

          <motion.div
            variants={itemVariants}
            className="flex min-w-0 shrink-0 items-center gap-2"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="#"
                onClick={(e) => { e.preventDefault(); setShowRequest(true); }}
                className="btn-animate whitespace-nowrap rounded-full bg-[#F7F8F8] text-black px-2.5 py-1.5 text-[12px] sm:px-5 sm:py-2 sm:text-[13px] font-medium"
              >
                Apply for early access
              </Link>
            </motion.div>

            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="md:hidden flex items-center gap-2 rounded-md border border-white/8 bg-[#1F2227] px-2 py-1.25 text-[12px] text-[#F7F8F8] transition-colors hover:bg-[#1a202a] sm:px-3 sm:py-2 sm:text-[13px]"
            >
              <HiOutlineMenuAlt3 size={16} />
              <p className="hidden sm:block">Open Menu</p>
            </button>
          </motion.div>
        </div>
      </motion.header>
    </>
  );
};

export default Header;
