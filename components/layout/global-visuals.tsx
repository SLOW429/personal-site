"use client";

import { Moon, Sun, Video, Waves } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const COUNTER_STORAGE_KEY = "slow-visitor-count-v1";
const COUNTER_URL = "https://api.counterapi.dev/v1/slows-dev/visitors/up";
const VIDEO_SRC = encodeURI("/CLIMA LINDO video .mp4");
type Node = { x: number; y: number; vx: number; vy: number };

let visitorFetchPromise: Promise<number | null> | null = null;
let fetchPatched = false;

function installVisitorCounterCache() {
  if (typeof window === "undefined" || fetchPatched) return;
  fetchPatched = true;

  const originalFetch = window.fetch.bind(window);
  window.fetch = async (input, init) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    const isVisitorRequest = url.includes("countapi.mileshilliard.com") || url.includes("api.counterapi.dev");
    if (!isVisitorRequest) return originalFetch(input, init);

    const cached = Number(sessionStorage.getItem(COUNTER_STORAGE_KEY));
    if (Number.isFinite(cached) && cached >= 0) {
      return new Response(JSON.stringify({ value: cached, count: cached }), { status: 200, headers: { "Content-Type": "application/json" } });
    }

    if (!visitorFetchPromise) {
      visitorFetchPromise = originalFetch(input, init)
        .then(async (response) => {
          if (!response.ok) throw new Error("visitor counter request failed");
          const json = await response.json();
          const count = Number(json?.count ?? json?.value ?? json?.data?.count ?? json?.data?.value);
          if (!Number.isFinite(count) || count < 0) return null;
          sessionStorage.setItem(COUNTER_STORAGE_KEY, String(count));
          return count;
        })
        .catch(() => null);
    }

    const count = await visitorFetchPromise;
    if (count === null) return new Response(JSON.stringify({}), { status: 503 });
    return new Response(JSON.stringify({ value: count, count }), { status: 200, headers: { "Content-Type": "application/json" } });
  };
}

function SpiderWebCanvas({ enabled }: { enabled: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let frame = 0;
    let width = 0;
    let height = 0;
    const nodes: Node[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes.length = 0;
      const count = Math.min(85, Math.max(44, Math.floor((width * height) / 18000)));
      for (let i = 0; i < count; i++) nodes.push({ x: Math.random() * width, y: Math.random() * height, vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22 });
    };

    const move = (event: MouseEvent) => { mouseRef.current = { x: event.clientX, y: event.clientY }; };
    const leave = () => { mouseRef.current = { x: -9999, y: -9999 }; };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const { x: mx, y: my } = mouseRef.current;
      for (const node of nodes) {
        const dx = mx - node.x;
        const dy = my - node.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 260 && distance > 0) {
          const strength = (1 - distance / 260) * 0.035;
          node.x += dx * strength;
          node.y += dy * strength;
        }
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < -20 || node.x > width + 20) node.vx *= -1;
        if (node.y < -20 || node.y > height + 20) node.vy *= -1;
      }

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const distance = Math.hypot(b.x - a.x, b.y - a.y);
          if (distance > 150) continue;
          const nearMouse = Math.min(Math.hypot(a.x - mx, a.y - my), Math.hypot(b.x - mx, b.y - my));
          const alpha = Math.max(0.02, (1 - distance / 150) * 0.18 + (nearMouse < 260 ? 0.1 : 0));
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(126,196,255,${alpha})`;
          ctx.lineWidth = nearMouse < 260 ? 1.2 : 0.7;
          ctx.stroke();
        }
      }

      for (const node of nodes) {
        const distance = Math.hypot(node.x - mx, node.y - my);
        ctx.beginPath();
        ctx.arc(node.x, node.y, distance < 260 ? 1.8 : 1.1, 0, Math.PI * 2);
        ctx.fillStyle = distance < 260 ? "rgba(217,237,255,.72)" : "rgba(126,196,255,.3)";
        ctx.fill();
      }
      frame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
    };
  }, [enabled]);

  if (!enabled) return null;
  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 opacity-90" />;
}

function VisitorCounterRepair() {
  useEffect(() => {
    installVisitorCounterCache();

    const badge = Array.from(document.querySelectorAll("div")).find((element) => element.textContent?.trim().endsWith("visitors"));
    const value = badge?.querySelector("span.font-mono");
    const cached = Number(sessionStorage.getItem(COUNTER_STORAGE_KEY));
    if (value && Number.isFinite(cached)) value.textContent = cached.toLocaleString();
  }, []);

  return null;
}

export function GlobalVisuals() {
  const [light, setLight] = useState(false);
  const [videoMode, setVideoMode] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    installVisitorCounterCache();
    const savedTheme = localStorage.getItem("slow-theme") === "light";
    const savedVideo = localStorage.getItem("slow-background") === "video";
    setLight(savedTheme);
    setVideoMode(savedVideo);
    document.documentElement.classList.toggle("light", savedTheme);
    document.body.classList.toggle("light", savedTheme);
    document.documentElement.style.colorScheme = savedTheme ? "light" : "dark";
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
    document.body.classList.toggle("light", light);
    document.documentElement.style.colorScheme = light ? "light" : "dark";
    localStorage.setItem("slow-theme", light ? "light" : "dark");
  }, [light]);

  useEffect(() => {
    localStorage.setItem("slow-background", videoMode ? "video" : "canvas");
    const video = videoRef.current;
    const audio = document.getElementById("bg-music") as HTMLAudioElement | null;
    if (video && audio) video.currentTime = audio.currentTime;
  }, [videoMode]);

  useEffect(() => {
    const sync = () => {
      const video = videoRef.current;
      const audio = document.getElementById("bg-music") as HTMLAudioElement | null;
      if (!video || !audio || !videoMode || audio.paused) return;
      if (Math.abs(video.currentTime - audio.currentTime) > 0.2) video.currentTime = audio.currentTime;
    };
    const timer = window.setInterval(sync, 500);
    return () => window.clearInterval(timer);
  }, [videoMode]);

  return (
    <>
      <SpiderWebCanvas enabled={!videoMode} />
      {videoMode && (
        <>
          <video ref={videoRef} src={VIDEO_SRC} autoPlay loop muted playsInline preload="auto" controls={false} disablePictureInPicture disableRemotePlayback aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 h-full w-full object-cover" />
          <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1] bg-black/25" />
        </>
      )}

      <div className="fixed right-6 top-6 z-[999] flex items-center gap-2">
        <button type="button" onClick={() => setVideoMode((value) => !value)} className="flex h-12 items-center gap-2 rounded-full border border-[var(--card-border-strong)] bg-[var(--card-bg)] px-4 text-sm font-semibold text-[var(--gold)] shadow-[0_0_30px_rgba(126,196,255,.18)] backdrop-blur-xl" aria-label={videoMode ? "Use interactive spider web background" : "Use background video"} title={videoMode ? "Spider Web" : "Video background"}>
          {videoMode ? <Waves size={17} /> : <Video size={17} />}
          <span className="hidden sm:inline">{videoMode ? "Web" : "Video"}</span>
        </button>
        <button type="button" onClick={() => setLight((value) => !value)} className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--card-border-strong)] bg-[var(--card-bg)] text-[var(--gold)] shadow-[0_0_30px_rgba(126,196,255,.18)] backdrop-blur-xl" aria-label={light ? "Switch to dark mode" : "Switch to light mode"} title={light ? "Dark mode" : "Light mode"}>
          {light ? <Moon size={19} /> : <Sun size={19} />}
        </button>
      </div>

      <VisitorCounterRepair />
    </>
  );
}
