"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import ChatMessage from "./ChatMessage";
import ChatbotAvatar from "./ChatbotAvatar";
import SuggestedQuestions from "./SuggestedQuestions";
import TypingIndicator from "./TypingIndicator";
import { getContextualSuggestions, WELCOME_QUESTIONS } from "../../lib/chat-suggestions";
import type { ChatMessage as ChatMessageType } from "../../lib/chat-types";

interface ChatMessagesProps {
  messages: ChatMessageType[];
  isStreaming: boolean;
  onSelectSuggestion: (question: string) => void;
  onRetry: () => void;
}

function WelcomeScreen({ onSelect }: { onSelect: (question: string) => void }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="flex flex-col gap-5 py-3"
    >
      <div className="flex flex-col items-center text-center">
        <ChatbotAvatar size={74} showStatus />
        <h3 className="mt-4 text-[17px] font-bold text-white">
          Hey! 👋 I&apos;m{" "}
          <span className="bg-gradient-to-r from-[#a5e6fb] via-[#1aa5c1] to-[#0054ff] bg-clip-text text-transparent">
            JARVIS
          </span>
        </h3>
        <p className="mt-1.5 max-w-[290px] text-[12.5px] leading-relaxed text-white/60">
          I can tell you about Abhinand&apos;s journey, technical skills, projects, experience and
          more.
        </p>
        <p className="mt-2 text-[12.5px] font-medium text-[#7dd6f6]">
          What would you like to know?
        </p>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#1aa5c1]/30 to-transparent" />

      <SuggestedQuestions
        questions={WELCOME_QUESTIONS}
        onSelect={onSelect}
        title="Try asking"
      />
    </motion.div>
  );
}

export default function ChatMessages({
  messages,
  isStreaming,
  onSelectSuggestion,
  onRetry,
}: ChatMessagesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  const handleScroll = useCallback(() => {
    const element = scrollRef.current;
    if (!element) return;
    const distanceFromBottom =
      element.scrollHeight - element.scrollTop - element.clientHeight;
    setAutoScroll(distanceFromBottom < 90);
  }, []);

  useEffect(() => {
    if (!autoScroll) return;
    const element = scrollRef.current;
    if (!element) return;
    element.scrollTop = element.scrollHeight;
  }, [messages, isStreaming, autoScroll]);

  const lastMessage = messages[messages.length - 1];
  const isWaitingForFirstToken =
    isStreaming && lastMessage?.role === "assistant" && !lastMessage.content.trim();

  const lastUserQuestion = useMemo(() => {
    for (let index = messages.length - 1; index >= 0; index -= 1) {
      if (messages[index].role === "user") return messages[index].content;
    }
    return "";
  }, [messages]);

  const followUps = useMemo(() => {
    if (isStreaming || messages.length === 0) return [];
    if (!lastMessage || lastMessage.role !== "assistant") return [];
    if (lastMessage.failed || !lastMessage.content.trim()) return [];
    return getContextualSuggestions(lastMessage.content, lastUserQuestion);
  }, [isStreaming, lastMessage, lastUserQuestion, messages.length]);

  const scrollToLatest = () => {
    const element = scrollRef.current;
    if (!element) return;
    element.scrollTo({ top: element.scrollHeight, behavior: "smooth" });
    setAutoScroll(true);
  };

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        role="log"
        aria-live="polite"
        aria-relevant="additions text"
        aria-label="Conversation with JARVIS"
        className="no-scrollbar flex-1 overflow-y-auto overscroll-contain px-4 py-4"
      >
        {messages.length === 0 ? (
          <WelcomeScreen onSelect={onSelectSuggestion} />
        ) : (
          <div className="flex flex-col gap-4">
            {messages.map((message, index) => {
              const isLast = index === messages.length - 1;
              const streamingThis = Boolean(isStreaming && isLast && message.role === "assistant");
              if (streamingThis && !message.content.trim()) return null;
              return (
                <ChatMessage
                  key={message.id}
                  message={message}
                  isStreaming={streamingThis}
                  showRetry={isLast && Boolean(message.failed)}
                  onRetry={onRetry}
                />
              );
            })}

            {isWaitingForFirstToken && (
              <div className="flex items-center gap-2.5">
                <ChatbotAvatar size={28} animated={false} />
                <TypingIndicator />
              </div>
            )}

            {followUps.length > 0 && (
              <SuggestedQuestions
                questions={followUps}
                onSelect={onSelectSuggestion}
                title="Follow-ups"
                variant="follow-up"
                className="pl-[38px]"
              />
            )}
          </div>
        )}
      </div>

      <AnimatePresence>
        {!autoScroll && (
          <motion.button
            type="button"
            onClick={scrollToLatest}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            aria-label="Scroll to the latest message"
            className="absolute bottom-3 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-[#1aa5c1]/35 bg-[#0b1626]/95 text-[#7dd6f6] shadow-lg backdrop-blur-md transition-colors hover:border-[#1aa5c1]/70 hover:shadow-[0_0_16px_rgba(26,165,193,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1aa5c1]/70"
          >
            <ArrowDown size={14} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
