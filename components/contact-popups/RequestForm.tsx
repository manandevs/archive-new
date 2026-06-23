"use client";

import { sendRequest, RequestState } from "@/actions/request";
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

type RequestFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

const initialState: RequestState = { message: null, errors: {}, success: false };

const RequestForm = ({ isOpen, onClose }: RequestFormProps) => {
  const [state, formAction, isPending] = useActionState(sendRequest, initialState);

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
      className="fixed inset-0 z-100 flex md:items-center justify-center bg-black/70 px-4 py-16 backdrop-blur-md overflow-auto pb-8"
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
        className="relative min-h-164.5 max-w-125 w-full bg-[#08090A] p-6 border border-white/5"
        onClick={(e) => e.stopPropagation()}
      >
        <form action={formAction} className="space-y-6">
          {state.success ? (
            <div className="py-20 text-center">
              <h3 className="text-xl text-green-500 font-bold mb-2">Request Sent!</h3>
              <p className="text-[#8A8F98]">Thank you. Our team will be in touch within 48 hours.</p>
            </div>
          ) : (
            <>
              <div className="space-y-5">
                {baseFields.map((field) => (
                  <label key={field.id} className="block">
                    <span className="sr-only">{field.label}</span>
                    <p className="mb-2 text-[14px] text-[#8A8F98]">{field.label}</p>
                    <input
                      name={field.id}
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

                <label className="block">
                  <p className="mb-2 text-[14px] text-[#8A8F98]">
                    Tell us about your situation and requirements
                  </p>
                  <textarea
                    name="message"
                    required
                    className={`h-30 w-full rounded border ${
                      state.errors?.message ? "border-red-500" : "border-white/8"
                    } bg-[#141516] px-4 py-3 text-[14px] text-[#F7F8F8] outline-none transition-colors focus:border-white/30 resize-none`}
                  />
                  {state.errors?.message && (
                    <p className="mt-1 text-[12px] text-red-500">{state.errors.message[0]}</p>
                  )}
                </label>
              </div>

              <div className="mt-8 flex md:flex-row flex-col md:items-center justify-between gap-3 mb-4 md:mb-0">
                <p className="text-[13px] text-[#8A8F98] max-w-50">
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
                  {isPending ? "Sending..." : "Send request"}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default RequestForm;
