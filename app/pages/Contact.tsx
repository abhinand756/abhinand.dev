"use client";

import { Mail, MapPin, Phone, Send, CheckCircle } from "lucide-react";
import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

const contactInfo = [
  { icon: MapPin, text: "Calicut, Kerala, India" },
  { icon: Mail, text: "abhinandabhi756@gmail.com" },
  { icon: Phone, text: "+91 8086714039" },
];

const socials = [
  { src: "/images/github.svg", alt: "GitHub", href: "#" },
  { src: "/images/twitter.svg", alt: "Twitter", href: "#" },
  { src: "/images/instagram.svg", alt: "Instagram", href: "#", rounded: true },
  { src: "/images/linkedin.svg", alt: "LinkedIn", href: "#" },
  { src: "/images/youtube.svg", alt: "YouTube", href: "#" },
];

function FloatingField({
  label,
  type = "text",
  name,
  value,
  onChange,
  error,
}: {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

  return (
    <div className="relative w-full mb-5">
      <motion.label
        className="absolute left-3 pointer-events-none text-white/40 origin-left"
        animate={{
          top: lifted ? "4px" : "50%",
          y: lifted ? "0%" : "-50%",
          fontSize: lifted ? "10px" : "13px",
          color: focused ? "#1aa5c1" : "rgba(255,255,255,0.4)",
        }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.label>
      <input
        type={type}
        name={name}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pt-5 pb-2 px-3 bg-transparent text-white text-sm outline-none rounded-xl"
        style={{
          border: `1px solid ${focused ? "rgba(26,165,193,0.6)" : "rgba(255,255,255,0.1)"}`,
          background: focused ? "rgba(26,165,193,0.04)" : "rgba(255,255,255,0.03)",
          transition: "border 0.25s, background 0.25s",
          boxShadow: focused ? "0 0 14px rgba(26,165,193,0.12)" : "none",
        }}
      />
      {/* Animated bottom focus line */}
      <motion.div
        className="absolute bottom-0 left-3 right-3 h-[1.5px] rounded-full"
        style={{ background: "linear-gradient(90deg, #1aa5c1, #0054ff)" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-[11px] mt-1 ml-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

function FloatingTextarea({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

  return (
    <div className="relative w-full mb-5">
      <motion.label
        className="absolute left-3 pointer-events-none text-white/40 origin-left"
        animate={{
          top: lifted ? "6px" : "16px",
          fontSize: lifted ? "10px" : "13px",
          color: focused ? "#1aa5c1" : "rgba(255,255,255,0.4)",
        }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.label>
      <textarea
        name={name}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full pt-6 pb-2 px-3 bg-transparent text-white text-sm outline-none rounded-xl resize-none"
        style={{
          border: `1px solid ${focused ? "rgba(26,165,193,0.6)" : "rgba(255,255,255,0.1)"}`,
          background: focused ? "rgba(26,165,193,0.04)" : "rgba(255,255,255,0.03)",
          transition: "border 0.25s, background 0.25s",
          boxShadow: focused ? "0 0 14px rgba(26,165,193,0.12)" : "none",
        }}
      />
      <motion.div
        className="absolute bottom-0 left-3 right-3 h-[1.5px] rounded-full"
        style={{ background: "linear-gradient(90deg, #1aa5c1, #0054ff)" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}

export default function Contact() {
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [formRef, formInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [infoRef, infoInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setNameError("");
    setEmailError("");

    let valid = true;
    if (!name.trim()) { setNameError("Name is required."); valid = false; }
    if (!email.trim()) { setEmailError("Email is required."); valid = false; }
    if (!valid) { setLoading(false); return; }

    const formData = new FormData(event.target as HTMLFormElement);
    formData.append("access_key", process.env.NEXT_PUBLIC_ACCESS_KEY || "");
    const json = JSON.stringify(Object.fromEntries(formData));

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: json,
    });
    const result = await response.json();
    setLoading(false);

    if (result.success) {
      setSuccess(true);
      setName(""); setEmail(""); setMessage("");
      setTimeout(() => setSuccess(false), 4000);
    }
  }

  return (
    <div
      id="contact"
      className="min-h-screen flex flex-col justify-center items-center py-12 md:py-24 px-4 overflow-hidden w-full max-w-full"
    >
      {/* Title */}
      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: 36 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center mb-14"
      >
        <h2 className="text-3xl md:text-4xl font-[fantasy] bg-gradient-to-r from-[#1aa5c1] to-[#0054ff] bg-clip-text text-transparent mb-3">
          Contact
        </h2>
        <div className="w-16 h-[3px] rounded-full bg-gradient-to-r from-[#1aa5c1] to-[#0054ff]" />
        <p className="mt-4 text-white/50 text-sm text-center max-w-sm leading-6">
          Have a project in mind or just want to say hello? Drop a message.
        </p>
      </motion.div>

      <div className="flex flex-col lg:flex-row items-start justify-center gap-8 w-full max-w-4xl">

        {/* ── Form card ── */}
        <motion.div
          ref={formRef}
          initial={{ opacity: 0, y: 30 }}
          animate={formInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-full lg:w-[420px] px-6 py-7 rounded-2xl"
          style={{
            background: "rgba(26,165,193,0.04)",
            border: "1px solid rgba(26,165,193,0.18)",
            boxShadow: "0 0 40px rgba(26,165,193,0.06)",
          }}
        >
          {/* Corner dots */}
          <span className="absolute top-[5px] left-[5px] w-[5px] h-[5px] rounded-full bg-[#1aa5c1] opacity-50" />
          <span className="absolute top-[5px] right-[5px] w-[5px] h-[5px] rounded-full bg-[#0054ff] opacity-50" />
          <span className="absolute bottom-[5px] left-[5px] w-[5px] h-[5px] rounded-full bg-[#0054ff] opacity-50" />
          <span className="absolute bottom-[5px] right-[5px] w-[5px] h-[5px] rounded-full bg-[#1aa5c1] opacity-50" />

          <h4
            className="text-center text-xl font-[fantasy] text-white mb-6"
            style={{ background: "linear-gradient(90deg,#1aa5c1,#0054ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            Get in touch
          </h4>

          <form onSubmit={handleSubmit} className="flex flex-col">
            <FloatingField label="Your Name" name="name" value={name} onChange={setName} error={nameError} />
            <FloatingField label="Your Email" type="email" name="email" value={email} onChange={setEmail} error={emailError} />
            <FloatingTextarea label="Your Message" name="message" value={message} onChange={setMessage} />

            <motion.button
              type="submit"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-[10px] text-sm font-semibold mt-1"
              style={{
                fontFamily: "'LXGW WenKai TC', cursive",
                background: "rgba(26,165,193,0.07)",
                border: "1px solid rgba(26,165,193,0.45)",
                color: "#c6fafa",
                boxShadow: "0 0 10px rgba(26,165,193,0.1)",
              }}
              whileHover={{ scale: 1.03, boxShadow: "0 0 22px rgba(26,165,193,0.3)" }}
              whileTap={{ scale: 0.97 }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = "1px solid rgba(0,84,255,0.7)";
                e.currentTarget.style.boxShadow = "0 0 18px rgba(0,84,255,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = "1px solid rgba(26,165,193,0.45)";
                e.currentTarget.style.boxShadow = "0 0 10px rgba(26,165,193,0.1)";
              }}
            >
              {loading ? (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                </svg>
              ) : (
                <>
                  <Send size={14} />
                  SUBMIT
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* ── Info panel ── */}
        <motion.div
          ref={infoRef}
          initial={{ opacity: 0, y: 30 }}
          animate={infoInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-full lg:w-[320px] px-6 py-7 rounded-2xl flex flex-col gap-8"
          style={{
            background: "rgba(26,165,193,0.04)",
            border: "1px solid rgba(26,165,193,0.18)",
            boxShadow: "0 0 40px rgba(26,165,193,0.06)",
          }}
        >
          <span className="absolute top-[5px] left-[5px] w-[5px] h-[5px] rounded-full bg-[#1aa5c1] opacity-50" />
          <span className="absolute top-[5px] right-[5px] w-[5px] h-[5px] rounded-full bg-[#0054ff] opacity-50" />
          <span className="absolute bottom-[5px] left-[5px] w-[5px] h-[5px] rounded-full bg-[#0054ff] opacity-50" />
          <span className="absolute bottom-[5px] right-[5px] w-[5px] h-[5px] rounded-full bg-[#1aa5c1] opacity-50" />

          {/* Contact info rows */}
          <div className="flex flex-col gap-5">
            {contactInfo.map((item, i) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, x: 20 }}
                animate={infoInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: "easeOut" }}
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 group cursor-default"
              >
                <div
                  className="flex items-center justify-center w-9 h-9 rounded-xl flex-shrink-0 transition-all duration-300 group-hover:shadow-[0_0_16px_rgba(26,165,193,0.4)]"
                  style={{
                    background: "rgba(26,165,193,0.1)",
                    border: "1px solid rgba(26,165,193,0.25)",
                  }}
                >
                  <item.icon size={16} color="#1aa5c1" />
                </div>
                <span className="text-white/65 text-sm group-hover:text-white/90 transition-colors duration-200">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#1aa5c1]/25 to-transparent" />

          {/* Social icons */}
          <div className="flex items-center gap-3 flex-wrap">
            {socials.map((s, i) => (
              <motion.a
                key={s.alt}
                href={s.href}
                aria-label={s.alt}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={infoInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.4, ease: "backOut" }}
                whileHover={{ scale: 1.22, y: -3, boxShadow: "0 0 16px rgba(26,165,193,0.45)" }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center justify-center w-9 h-9 rounded-xl cursor-pointer transition-all duration-200"
                style={{
                  background: "rgba(26,165,193,0.08)",
                  border: "1px solid rgba(26,165,193,0.2)",
                }}
              >
                <Image
                  src={s.src}
                  alt={s.alt}
                  width={18}
                  height={18}
                  className={s.rounded ? "rounded-md" : ""}
                />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Success toast */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            className="fixed bottom-8 flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm text-white"
            style={{
              background: "rgba(6,11,20,0.95)",
              border: "1px solid rgba(26,165,193,0.5)",
              boxShadow: "0 0 28px rgba(26,165,193,0.25)",
            }}
          >
            <CheckCircle size={16} className="text-[#1aa5c1]" />
            Message sent successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
