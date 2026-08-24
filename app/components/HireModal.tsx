"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, CheckCircle, ChevronDown, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

const ACCESS_KEY = process.env.NEXT_PUBLIC_ACCESS_KEY || "";

const TYPE_OPTIONS = [
    "Web Development",
    "Mobile App",
    "UI / UX Design",
    "Full Stack",
    "Other",
];
const BUDGET_OPTIONS = ["Under $1k", "$1k - $5k", "$5k - $15k", "$15k+"];
const TIMELINE_OPTIONS = ["ASAP", "1 - 2 weeks", "Within a month", "Flexible"];

interface HireModalProps {
    open: boolean;
    onClose: () => void;
}

const listVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

function Field({
    label,
    type = "text",
    value,
    onChange,
    error,
}: {
    label: string;
    type?: string;
    value: string;
    onChange: (v: string) => void;
    error?: string;
}) {
    const [focused, setFocused] = useState(false);
    const lifted = focused || value.length > 0;

    return (
        <motion.div variants={itemVariants} className="w-full flex flex-col">
            <div className="relative w-full">
                <motion.label
                    className="absolute left-3 pointer-events-none text-white/40 origin-left z-10"
                    animate={{
                        top: lifted ? "6px" : "50%",
                        y: lifted ? "0%" : "-50%",
                        fontSize: lifted ? "10px" : "13px",
                        color: error ? "#f87171" : focused ? "#1aa5c1" : "rgba(255,255,255,0.4)",
                    }}
                    transition={{ duration: 0.2 }}
                >
                    {label}
                </motion.label>
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="w-full pt-6 pb-2 px-3 bg-transparent text-white text-sm outline-none rounded-xl"
                    style={{
                        border: `1px solid ${error ? "rgba(248,113,113,0.7)" : focused ? "rgba(26,165,193,0.6)" : "rgba(255,255,255,0.1)"}`,
                        background: error ? "rgba(248,113,113,0.05)" : focused ? "rgba(26,165,193,0.04)" : "rgba(255,255,255,0.03)",
                        transition: "border 0.25s, background 0.25s",
                        boxShadow: error ? "0 0 14px rgba(248,113,113,0.15)" : focused ? "0 0 14px rgba(26,165,193,0.12)" : "none",
                    }}
                />
                <motion.div
                    className="absolute bottom-0 left-3 right-3 h-[1.5px] rounded-full pointer-events-none"
                    style={{ background: error ? "#f87171" : "linear-gradient(90deg, #1aa5c1, #0054ff)" }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: focused ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                />
            </div>
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-[11px] mt-1 ml-1"
                >
                    {error}
                </motion.p>
            )}
        </motion.div>
    );
}

function Area({
    label,
    value,
    onChange,
    error,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    error?: string;
}) {
    const [focused, setFocused] = useState(false);
    const lifted = focused || value.length > 0;

    return (
        <motion.div variants={itemVariants} className="w-full flex flex-col">
            <div className="relative w-full">
                <motion.label
                    className="absolute left-3 pointer-events-none text-white/40 origin-left z-10"
                    animate={{
                        top: lifted ? "6px" : "16px",
                        fontSize: lifted ? "10px" : "13px",
                        color: error ? "#f87171" : focused ? "#1aa5c1" : "rgba(255,255,255,0.4)",
                    }}
                    transition={{ duration: 0.2 }}
                >
                    {label}
                </motion.label>
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    rows={3}
                    className="w-full pt-7 pb-2 px-3 bg-transparent text-white text-sm outline-none rounded-xl resize-none"
                    style={{
                        border: `1px solid ${error ? "rgba(248,113,113,0.7)" : focused ? "rgba(26,165,193,0.6)" : "rgba(255,255,255,0.1)"}`,
                        background: error ? "rgba(248,113,113,0.05)" : focused ? "rgba(26,165,193,0.04)" : "rgba(255,255,255,0.03)",
                        transition: "border 0.25s, background 0.25s",
                        boxShadow: error ? "0 0 14px rgba(248,113,113,0.15)" : focused ? "0 0 14px rgba(26,165,193,0.12)" : "none",
                    }}
                />
                <motion.div
                    className="absolute bottom-0 left-3 right-3 h-[1.5px] rounded-full pointer-events-none"
                    style={{ background: error ? "#f87171" : "linear-gradient(90deg, #1aa5c1, #0054ff)" }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: focused ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                />
            </div>
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-[11px] mt-1 ml-1"
                >
                    {error}
                </motion.p>
            )}
        </motion.div>
    );
}

function Picker({
    label,
    options,
    value,
    onChange,
    placeholder,
    error,
}: {
    label: string;
    options: string[];
    value: string;
    onChange: (v: string) => void;
    placeholder: string;
    error?: string;
}) {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const lifted = open || value.length > 0;

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    return (
        <motion.div variants={itemVariants} className="w-full flex flex-col">
            <div ref={containerRef} className="relative w-full">
                <button
                    type="button"
                    onClick={() => setOpen((o) => !o)}
                    className="w-full pt-6 pb-2 pl-3 pr-9 bg-transparent text-sm outline-none rounded-xl text-left cursor-pointer transition-all duration-250 flex items-center justify-between"
                    style={{
                        border: `1px solid ${error ? "rgba(248,113,113,0.7)" : open ? "rgba(26,165,193,0.6)" : "rgba(255,255,255,0.1)"}`,
                        background: error ? "rgba(248,113,113,0.05)" : open ? "rgba(26,165,193,0.04)" : "rgba(255,255,255,0.03)",
                        boxShadow: error ? "0 0 14px rgba(248,113,113,0.15)" : open ? "0 0 14px rgba(26,165,193,0.12)" : "none",
                    }}
                >
                    <motion.span
                        className="absolute left-3 pointer-events-none origin-left z-10"
                        animate={{
                            top: lifted ? "6px" : "50%",
                            y: lifted ? "0%" : "-50%",
                            fontSize: lifted ? "10px" : "13px",
                            color: error ? "#f87171" : open ? "#1aa5c1" : "rgba(255,255,255,0.4)",
                        }}
                        transition={{ duration: 0.2 }}
                    >
                        {label}
                    </motion.span>
                    <span className="truncate text-white text-sm min-h-[20px] flex items-center">
                        {value ? (
                            value
                        ) : open ? (
                            <span className="text-white/40">{placeholder}</span>
                        ) : null}
                    </span>
                    <motion.div
                        animate={{ rotate: open ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    >
                        <ChevronDown
                            size={16}
                            style={{ color: error ? "#f87171" : open ? "#1aa5c1" : "rgba(255,255,255,0.35)" }}
                        />
                    </motion.div>
                </button>

                <motion.div
                    className="absolute bottom-0 left-3 right-3 h-[1.5px] rounded-full pointer-events-none z-10"
                    style={{ background: error ? "#f87171" : "linear-gradient(90deg, #1aa5c1, #0054ff)" }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: open ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                />

                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ opacity: 0, y: -8, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -6, scale: 0.96 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                            className="absolute top-full left-0 right-0 mt-1.5 z-[1400] py-1.5 bg-[#0b1626]/95 backdrop-blur-xl border border-[#1aa5c1]/30 rounded-xl shadow-[0_12px_36px_rgba(0,0,0,0.65)] overflow-hidden"
                        >
                            {options.map((opt) => {
                                const selected = value === opt;
                                return (
                                    <button
                                        key={opt}
                                        type="button"
                                        onClick={() => {
                                            onChange(opt);
                                            setOpen(false);
                                        }}
                                        className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-left cursor-pointer transition-colors duration-150 ${selected
                                            ? "bg-[#1aa5c1]/18 text-[#1aa5c1] font-semibold"
                                            : "text-white/80 hover:bg-[#1aa5c1]/10 hover:text-white"
                                            }`}
                                    >
                                        <span>{opt}</span>
                                        {selected && <Check size={14} className="text-[#1aa5c1]" />}
                                    </button>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-[11px] mt-1 ml-1"
                >
                    {error}
                </motion.p>
            )}
        </motion.div>
    );
}

export default function HireModal({ open, onClose }: HireModalProps) {
    const isMobile = useMediaQuery("(max-width: 767px)");
    const [form, setForm] = useState({
        name: "",
        email: "",
        type: "",
        budget: "",
        timeline: "",
        message: "",
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [apiError, setApiError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const set = (key: keyof typeof form) => (v: string) => {
        setForm((f) => ({ ...f, [key]: v }));
        if (errors[key]) {
            setErrors((errs) => {
                const copy = { ...errs };
                delete copy[key];
                return copy;
            });
        }
        if (apiError) setApiError("");
    };

    useEffect(() => {
        if (!open) {
            setSuccess(false);
            setLoading(false);
            setErrors({});
            setApiError("");
            setForm({
                name: "",
                email: "",
                type: "",
                budget: "",
                timeline: "",
                message: "",
            });
        }
    }, [open]);

    useEffect(() => {
        if (!open) return;
        document.body.style.overflow = "hidden";
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKey);
        };
    }, [open, onClose]);

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                onClose();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [success, onClose]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (loading) return;

        const newErrors: { [key: string]: string } = {};

        if (!form.name.trim()) {
            newErrors.name = "Name is required.";
        }

        if (!form.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (!form.type) {
            newErrors.type = "Please select a project type.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setApiError("");
        setLoading(true);

        const payload = {
            access_key: ACCESS_KEY,
            subject: `New Hire Inquiry from ${form.name || "Guest"}`,
            ...form,
        };

        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify(payload),
            });
            const result = await res.json();
            if (result.success) {
                setSuccess(true);
            } else {
                setApiError(result.message || "Failed to send message. Please try again.");
            }
        } catch {
            setApiError("Something went wrong. Please check your connection and try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        key="hire-backdrop"
                        className="fixed inset-0 z-[1300] bg-black/65 backdrop-blur-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.28 }}
                        onClick={onClose}
                    />

                    <motion.div
                        key="hire-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Hire me form"
                        initial={isMobile ? { y: "100%" } : { opacity: 0, scale: 0.92, y: 28 }}
                        animate={isMobile ? { y: 0 } : { opacity: 1, scale: 1, y: 0 }}
                        exit={isMobile ? { y: "100%" } : { opacity: 0, scale: 0.95, y: 16 }}
                        transition={{ type: "spring", stiffness: 320, damping: 30 }}
                        className={
                            isMobile
                                ? "fixed inset-x-0 bottom-0 z-[1310] rounded-t-[28px] border-t border-[#1aa5c1]/30 overflow-hidden"
                                : "fixed inset-0 z-[1310] m-auto h-fit w-full max-w-lg rounded-2xl border border-[#1aa5c1]/25 overflow-hidden"
                        }
                        style={{
                            background: "linear-gradient(135deg, #0b1526 0%, #060a13 100%)",
                            boxShadow: "0 0 80px rgba(26,165,193,0.16), 0 24px 60px rgba(0,0,0,0.55)",
                        }}
                    >
                        {/* Animated top edge */}
                        <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden">
                            <motion.div
                                className="h-full w-1/2"
                                style={{ background: "linear-gradient(90deg, #1aa5c1, #0054ff, #1aa5c1)" }}
                                animate={{ x: ["-120%", "220%"] }}
                                transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
                            />
                        </div>

                        {/* Ambient corner glows */}
                        <motion.div
                            className="absolute -top-20 -right-20 w-56 h-56 rounded-full pointer-events-none"
                            style={{ background: "radial-gradient(circle, rgba(26,165,193,0.14) 0%, transparent 70%)" }}
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full pointer-events-none"
                            style={{ background: "radial-gradient(circle, rgba(0,84,255,0.12) 0%, transparent 70%)" }}
                            animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.9, 0.4] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                        />

                        <span className="absolute top-[7px] left-[7px] w-[5px] h-[5px] rounded-full bg-[#1aa5c1] opacity-60" />
                        <span className="absolute top-[7px] right-[7px] w-[5px] h-[5px] rounded-full bg-[#0054ff] opacity-60" />
                        <span className="absolute bottom-[7px] left-[7px] w-[5px] h-[5px] rounded-full bg-[#0054ff] opacity-60" />
                        <span className="absolute bottom-[7px] right-[7px] w-[5px] h-[5px] rounded-full bg-[#1aa5c1] opacity-60" />

                        <div className="no-scrollbar relative z-10 max-h-[85vh] overflow-y-auto px-6 sm:px-8 py-7">
                            {success ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                                    className="flex flex-col items-center justify-center py-12 text-center"
                                >
                                    <motion.div
                                        initial={{ scale: 0, rotate: -25 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                                        className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                                        style={{
                                            background: "rgba(26,165,193,0.1)",
                                            border: "1px solid rgba(26,165,193,0.4)",
                                            boxShadow: "0 0 34px rgba(26,165,193,0.35)",
                                        }}
                                    >
                                        <CheckCircle size={42} color="#1aa5c1" />
                                    </motion.div>
                                    <motion.h3
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.25, duration: 0.4 }}
                                        className="text-2xl mb-2 bg-gradient-to-r from-[#1aa5c1] to-[#0054ff] bg-clip-text text-transparent"
                                        style={{ fontFamily: "'LXGW WenKai TC', cursive" }}
                                    >
                                        Thank you!
                                    </motion.h3>
                                    <motion.p
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.35, duration: 0.4 }}
                                        className="text-white/55 text-sm leading-6 max-w-[260px]"
                                    >
                                        Your inquiry has been sent. {"I'll"} get back to you within 24 hours.
                                    </motion.p>
                                    <motion.button
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.45, duration: 0.4 }}
                                        onClick={onClose}
                                        className="mt-8 px-8 py-2.5 rounded-xl text-sm text-[#c6fafa] font-semibold tracking-widest cursor-pointer"
                                        style={{
                                            fontFamily: "'LXGW WenKai TC', cursive",
                                            background: "rgba(26,165,193,0.07)",
                                            border: "1px solid rgba(26,165,193,0.45)",
                                            boxShadow: "0 0 14px rgba(26,165,193,0.12)",
                                        }}
                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Done
                                    </motion.button>
                                </motion.div>
                            ) : (
                                <>
                                    {/* Header */}
                                    <motion.div
                                        initial={{ opacity: 0, y: -12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                        className="flex items-start justify-between mb-6"
                                    >
                                        <div>
                                            <motion.p
                                                className="text-[10px] font-bold tracking-[0.35em] text-[#1aa5c1]/80 uppercase mb-1.5"
                                                animate={{ opacity: [0.65, 1, 0.65] }}
                                                transition={{ duration: 2.4, repeat: Infinity }}
                                            >
                                                Hire Me
                                            </motion.p>
                                            <h3
                                                className="text-2xl text-white"
                                                style={{ fontFamily: "'LXGW WenKai TC', cursive" }}
                                            >
                                                Let&apos;s build something great
                                            </h3>
                                            <div className="mt-3 h-[3px] w-16 rounded-full bg-gradient-to-r from-[#1aa5c1] to-[#0054ff]" />
                                        </div>
                                        <motion.button
                                            onClick={onClose}
                                            aria-label="Close"
                                            whileTap={{ scale: 0.85, rotate: 90 }}
                                            className="flex items-center justify-center w-9 h-9 rounded-lg text-white/70 hover:text-white hover:bg-[#1aa5c1]/10 border border-white/10 hover:border-[#1aa5c1]/40 transition-all duration-200 cursor-pointer flex-shrink-0"
                                        >
                                            <X size={18} />
                                        </motion.button>
                                    </motion.div>

                                    {/* Availability chip */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -14 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1, duration: 0.4 }}
                                        className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-full border border-[#1aa5c1]/30 bg-[#1aa5c1]/6"
                                    >
                                        <motion.span
                                            className="w-2 h-2 rounded-full bg-[#1aa5c1]"
                                            animate={{ opacity: [1, 0.35, 1], scale: [1, 1.35, 1] }}
                                            transition={{ duration: 1.6, repeat: Infinity }}
                                            style={{ boxShadow: "0 0 8px rgba(26,165,193,0.9)" }}
                                        />
                                        <span className="text-[11px] text-white/60 tracking-wide">
                                            Available for freelance work
                                        </span>
                                    </motion.div>

                                    <motion.form
                                        variants={listVariants}
                                        initial="hidden"
                                        animate="show"
                                        onSubmit={handleSubmit}
                                        className="flex flex-col gap-4"
                                    >
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <Field label="Your Name" value={form.name} onChange={set("name")} error={errors.name} />
                                            <Field label="Your Email" type="email" value={form.email} onChange={set("email")} error={errors.email} />
                                        </div>
                                        <Picker
                                            label="Project Type"
                                            placeholder="What do you need?"
                                            options={TYPE_OPTIONS}
                                            value={form.type}
                                            onChange={set("type")}
                                            error={errors.type}
                                        />
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <Picker
                                                label="Budget"
                                                placeholder="Estimated budget"
                                                options={BUDGET_OPTIONS}
                                                value={form.budget}
                                                onChange={set("budget")}
                                                error={errors.budget}
                                            />
                                            <Picker
                                                label="Timeline"
                                                placeholder="When to start?"
                                                options={TIMELINE_OPTIONS}
                                                value={form.timeline}
                                                onChange={set("timeline")}
                                                error={errors.timeline}
                                            />
                                        </div>
                                        <Area label="Project Details" value={form.message} onChange={set("message")} error={errors.message} />

                                        {apiError && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -6 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="p-3 rounded-xl text-xs text-red-300 bg-red-500/10 border border-red-500/30 text-center"
                                            >
                                                {apiError}
                                            </motion.div>
                                        )}

                                        <motion.button
                                            type="submit"
                                            variants={itemVariants}
                                            className="relative flex items-center justify-center gap-2 w-full py-3 rounded-xl text-[#c6fafa] font-semibold tracking-widest overflow-hidden cursor-pointer mt-1"
                                            style={{
                                                fontFamily: "'LXGW WenKai TC', cursive",
                                                background: "rgba(26,165,193,0.07)",
                                                border: "1px solid rgba(26,165,193,0.45)",
                                                boxShadow: "0 0 14px rgba(26,165,193,0.12)",
                                            }}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.97 }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.border = "1px solid rgba(0,84,255,0.7)";
                                                e.currentTarget.style.boxShadow = "0 0 22px rgba(0,84,255,0.28)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.border = "1px solid rgba(26,165,193,0.45)";
                                                e.currentTarget.style.boxShadow = "0 0 14px rgba(26,165,193,0.12)";
                                            }}
                                        >
                                            {loading && (
                                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                                                </svg>
                                            )}
                                            {!loading && <Send size={15} />}
                                            <span>{loading ? "Sending..." : "Send Inquiry"}</span>
                                            <motion.span
                                                className="absolute inset-y-0 left-0 w-16 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
                                                animate={{ x: ["-120%", "620%"] }}
                                                transition={{ duration: 2.4, repeat: Infinity, ease: "linear", repeatDelay: 1.4 }}
                                            />
                                        </motion.button>
                                    </motion.form>
                                </>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}