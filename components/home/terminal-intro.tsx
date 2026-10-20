"use client";

import { motion } from "framer-motion";
<<<<<<< HEAD
import { useEffect, useState } from "react";
=======
import { useEffect, useMemo, useState } from "react";
>>>>>>> b9f0c72aee7db334f2a2f0fe520cea678ccfce84

const lines = [
  { command: "whoami", value: "SLOW429 — Developer • Creator • Voiceover Artist" },
  { command: "status", value: "Building useful software, tools, automations and creator experiences." },
  { command: "whereami", value: "slows.dev — my digital workshop on the open web." },
] as const;

export function TerminalIntro() {
<<<<<<< HEAD
  const [typing, setTyping] = useState({ activeLine: 0, visible: 0 });

  useEffect(() => {
    const text = lines[typing.activeLine].value;
    const timer = window.setInterval(() => {
      setTyping((current) => {
        return current.visible >= text.length
          ? current
          : { ...current, visible: current.visible + 1 };
      });
    }, 22);
    const stopTimer = window.setTimeout(() => window.clearInterval(timer), (text.length + 1) * 22);
    return () => {
      window.clearInterval(timer);
      window.clearTimeout(stopTimer);
    };
  }, [typing.activeLine]);

  useEffect(() => {
    const text = lines[typing.activeLine].value;
    if (typing.visible < text.length) return;
    const timer = window.setTimeout(() => {
      setTyping(({ activeLine }) => ({
        activeLine: (activeLine + 1) % lines.length,
        visible: 0,
      }));
    }, 1900);
    return () => window.clearTimeout(timer);
  }, [typing.activeLine, typing.visible]);
=======
  const [activeLine, setActiveLine] = useState(0);
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    setVisible(0);
    const text = lines[activeLine].value;
    const timer = window.setInterval(() => {
      setVisible((current) => {
        if (current >= text.length) {
          window.clearInterval(timer);
          return current;
        }
        return current + 1;
      });
    }, 22);
    return () => window.clearInterval(timer);
  }, [activeLine]);

  useEffect(() => {
    const text = lines[activeLine].value;
    if (visible < text.length) return;
    const timer = window.setTimeout(() => setActiveLine((value) => (value + 1) % lines.length), 1900);
    return () => window.clearTimeout(timer);
  }, [activeLine, visible]);

  const current = useMemo(() => lines[activeLine], [activeLine]);
>>>>>>> b9f0c72aee7db334f2a2f0fe520cea678ccfce84

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15 }}
      className="w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-[0_25px_80px_rgba(0,0,0,.45)] backdrop-blur-2xl"
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffd166]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#06d6a0]" />
        <span className="ml-3 font-mono text-[11px] text-white/35">slow@dev:~</span>
      </div>
      <div className="space-y-5 px-5 py-6 font-mono text-sm leading-7 sm:px-7 sm:py-7">
        {lines.map((line, index) => {
<<<<<<< HEAD
          const done = index < typing.activeLine;
          const live = index === typing.activeLine;
=======
          const done = index < activeLine;
          const live = index === activeLine;
>>>>>>> b9f0c72aee7db334f2a2f0fe520cea678ccfce84
          return (
            <div key={line.command} className={done || live ? "opacity-100" : "opacity-25"}>
              <div className="text-[#7ec4ff]">
                <span className="text-white/35">$</span> {line.command}
              </div>
              <div className="pl-4 text-white/75">
<<<<<<< HEAD
                {done ? line.value : live ? line.value.slice(0, typing.visible) : ""}
                {live && typing.visible < line.value.length && <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-[#7ec4ff]" />}
=======
                {done ? line.value : live ? line.value.slice(0, visible) : ""}
                {live && visible < line.value.length && <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-[#7ec4ff]" />}
>>>>>>> b9f0c72aee7db334f2a2f0fe520cea678ccfce84
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
