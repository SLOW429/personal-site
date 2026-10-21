"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const lines = [
  { command: "whoami", value: "SLOW429 — Developer • Creator • Voiceover Artist" },
  { command: "status", value: "Building useful software, tools, automations and creator experiences." },
  { command: "whereami", value: "slows.dev — my digital workshop on the open web." },
] as const;

type TypingState = {
  activeLine: number;
  visible: number;
};

export function TerminalIntro() {
  const reduceMotion = useReducedMotion() ?? false;
  const [motionReady, setMotionReady] = useState(false);
  const [typing, setTyping] = useState<TypingState>({ activeLine: 0, visible: 0 });
  const shouldReduceMotion = motionReady && reduceMotion;
  const activeLine = typing.activeLine;
  const text = lines[activeLine].value;

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMotionReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion || typing.visible >= text.length) return;

    const timer = window.setTimeout(() => {
      setTyping((current) => {
        if (current.activeLine !== activeLine) return current;
        return { ...current, visible: Math.min(current.visible + 1, text.length) };
      });
    }, 22);

    return () => window.clearTimeout(timer);
  }, [activeLine, shouldReduceMotion, text.length, typing.visible]);

  useEffect(() => {
    if (shouldReduceMotion || typing.visible < text.length) return;

    const timer = window.setTimeout(() => {
      setTyping((current) => {
        if (current.activeLine !== activeLine) return current;
        return { activeLine: (current.activeLine + 1) % lines.length, visible: 0 };
      });
    }, 1900);

    return () => window.clearTimeout(timer);
  }, [activeLine, shouldReduceMotion, text.length, typing.visible]);

  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.7, delay: shouldReduceMotion ? 0 : 0.15 }}
      className="w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-[0_25px_80px_rgba(0,0,0,.45)] backdrop-blur-2xl"
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]" />
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#ffd166]" />
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#06d6a0]" />
        <span className="ms-3 font-mono text-[11px] text-white/35">slow@dev:~</span>
      </div>
      <div className="space-y-5 px-5 py-6 font-mono text-sm leading-7 sm:px-7 sm:py-7" aria-live="polite">
        {lines.map((line, index) => {
          const done = shouldReduceMotion || index < activeLine;
          const live = !shouldReduceMotion && index === activeLine;
          const visible = shouldReduceMotion ? line.value.length : typing.visible;

          return (
            <div key={line.command} className={done || live ? "opacity-100" : "opacity-25"}>
              <div className="text-[#7ec4ff]">
                <span aria-hidden="true" className="text-white/35">$</span> {line.command}
              </div>
              <div className="ps-4 text-white/75">
                {done ? line.value : live ? line.value.slice(0, visible) : ""}
                {live && visible < line.value.length && (
                  <span aria-hidden="true" className="ms-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-[#7ec4ff]" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
