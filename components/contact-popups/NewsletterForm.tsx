"use client";

import { sendNewsletter, State } from "@/actions/newsletter";
import { useEffect, useActionState } from "react";
import { IoCloseSharp } from "react-icons/io5";

const baseFields = [
  { id: "firstName", label: "First name", type: "text" },
  { id: "lastName", label: "Last name", type: "text" },
  { id: "workEmail", label: "Work email", type: "email" },
  { id: "companyName", label: "Company name", type: "text" },
  { id: "companySize", label: "Company size", type: "text" },
  { id: "industry", label: "Industry", type: "text" },
] as const;

type NewsletterFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

const initialState: State = { message: null, errors: {}, success: false };

const NewsletterForm = ({ isOpen, onClose }: NewsletterFormProps) => {
  const [state, formAction, isPending] = useActionState(sendNewsletter, initialState);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.height = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.height = "unset";
    };
  }, [isOpen]);

  // Automatically close modal after success (optional)
  useEffect(() => {
    if (state.success) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [state.success, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex md:items-center justify-center bg-black/70 px-4 py-16 backdrop-blur-md overflow-auto"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 flex size-9 items-center justify-center rounded border border-white/8 bg-[#1F2227] text-[#F7F8F8] transition-colors hover:bg-[#1a202a]"
      >
        <IoCloseSharp size={18} aria-hidden />
      </button>

      <div
        className="relative min-h-164.5 max-w-125 w-full pb-6! bg-[#08090A] p-6 border border-white/5"
        onClick={(e) => e.stopPropagation()}
      >
        <form action={formAction} className="space-y-6">
          {state.success ? (
            <div className="flex flex-col items-center justify-center text-center min-h-100 px-4 py-12">
              <div className="relative mb-8">
                <div className="w-16 h-16 rounded-full border border-[#FF9900]/25 bg-[#FF9900]/8 flex items-center justify-center">
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
                    <path d="M5 13L10.5 18.5L21 8" stroke="#FF9900" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="absolute inset-0 rounded-full border border-[#FF9900]/10 scale-[1.35] pointer-events-none" />
              </div>

              <p className="text-[11px] font-semibold text-[#FF9900] tracking-[0.12em] uppercase mb-3">Confirmed</p>
              <h3 className="text-[22px] font-semibold text-[#F7F8F8] tracking-tight mb-3 leading-snug">
                Whitepaper incoming.
              </h3>
              <p className="text-[13px] text-[#8A8F98] leading-relaxed max-w-64">
                We&apos;ll send the 2026 AI Liability Whitepaper to your work email shortly.
              </p>

              <div className="mt-10 pt-6 border-t border-white/5 w-full">
                <p className="text-[12px] text-[#8A8F98]/50">
                  Questions?{" "}
                  <a href="mailto:inquiries@arbiris.uk" className="text-[#FF9900]/70 hover:text-[#FF9900] transition-colors">
                    inquiries@arbiris.uk
                  </a>
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-5">
                {baseFields.map((field) => (
                  <label key={field.id} className="block">
                    <span className="sr-only">{field.label}</span>
                    <p className="mb-2 text-[14px] text-[#8A8F98]">{field.label}</p>
                    <input
                      name={field.id} // Name attribute is critical for Server Actions
                      type={field.type}
                      required
                      className={`h-9.5 w-full rounded border ${
                        state.errors?.[field.id] ? "border-red-500" : "border-white/8"
                      } bg-[#141516] px-4 text-[14px] text-[#F7F8F8] outline-none transition-colors focus:border-white/30`}
                    />
                    {state.errors?.[field.id] && (
                      <p className="mt-1 text-[12px] text-red-500">{state.errors[field.id]![0]}</p>
                    )}
                  </label>
                ))}
              </div>

              <div className="mt-8 flex md:flex-row flex-col md:items-center justify-between gap-3 mb-4 md:mb-0">
                <p className="text-[13px] text-[#8A8F98] max-w-[200px]">
                  {state.message && !state.success ? (
                    <span className="text-red-500">{state.message}</span>
                  ) : (
                    "You can also email us at inquiries@arbiris.uk"
                  )}
                </p>
                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded border border-white/8 bg-[#1F2227] px-6 py-3 text-[13px] text-[#F7F8F8] transition-colors hover:bg-[#1a202a] font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? "Sending..." : "Send message"}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default NewsletterForm;