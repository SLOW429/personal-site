"use client";

import { Moon, Pause, Play, Sun, Video, Waves } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const COUNTER_STORAGE_KEY = "slow-visitor-count-v1";
const VIDEO_SRC = "/CLIMA%20LINDO%20video%20.mp4";
const MUSIC_STORAGE_KEY = "slow-music";
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
    if (Number.isFinite(cached) && cached >= 0) return new Response(JSON.stringify({ value: cached, count: cached }), { status: 200, headers: { "Content-Type": "application/json" } });
    if (!visitorFetchPromise) {
      visitorFetchPromise = originalFetch(input, init).then(async (response) => {
        if (!response.ok) throw new Error("visitor counter request failed");
        const json = await response.json();
        const count = Number(json?.count ?? json?.value ?? json?.data?.count ?? json?.data?.value);
        if (!Number.isFinite(count) || count < 0) return null;
        sessionStorage.setItem(COUNTER_STORAGE_KEY, String(count));
        return count;
      }).catch(() => null);
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
      const count = Math.min(95, Math.max(48, Math.floor((width * height) / 16000)));
      for (let i = 0; i < count; i++) nodes.push({ x: Math.random() * width, y: Math.random() * height, vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.18 });
    };
    const move = (event: MouseEvent) => { mouseRef.current = { x: event.clientX, y: event.clientY }; };
    const leave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const { x: mx, y: my } = mouseRef.current;
      const webRadius = 320;
      for (const node of nodes) {
        const dx = mx - node.x;
        const dy = my - node.y;
        const distance = Math.hypot(dx, dy);
        if (distance < webRadius && distance > 0) {
          const strength = (1 - distance / webRadius) ** 2 * 0.045;
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
          if (distance > 165) continue;
          const nearMouse = Math.min(Math.hypot(a.x - mx, a.y - my), Math.hypot(b.x - mx, b.y - my));
          const alpha = Math.max(0.018, (1 - distance / 165) * 0.22 + (nearMouse < webRadius ? 0.11 : 0));
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(126,196,255,${alpha})`;
          ctx.lineWidth = nearMouse < webRadius ? 1.05 : 0.65;
          ctx.stroke();
        }
      }
      if (mx > 0 && my > 0) {
        for (const node of nodes) {
          const distance = Math.hypot(node.x - mx, node.y - my);
          if (distance > webRadius) continue;
          const alpha = Math.max(0.02, (1 - distance / webRadius) * 0.28);
          ctx.beginPath();
          ctx.moveTo(mx, my);
          ctx.lineTo(node.x, node.y);
          ctx.strokeStyle = `rgba(217,237,255,${alpha})`;
          ctx.lineWidth = 0.8 + (1 - distance / webRadius) * 0.8;
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(mx, my, 5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(217,237,255,.8)";
        ctx.fill();
      }
      for (const node of nodes) {
        const distance = Math.hypot(node.x - mx, node.y - my);
        ctx.beginPath();
        ctx.arc(node.x, node.y, distance < webRadius ? 1.7 : 1, 0, Math.PI * 2);
        ctx.fillStyle = distance < webRadius ? "rgba(217,237,255,.72)" : "rgba(126,196,255,.3)";
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
  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[2] opacity-95" />;
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
  const [musicOn, setMusicOn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    installVisitorCounterCache();
    setLight(localStorage.getItem("slow-theme") === "light");
    setVideoMode(localStorage.getItem("slow-background") === "video");
    setMusicOn(localStorage.getItem(MUSIC_STORAGE_KEY) === "on");
    document.body.classList.add("slow-transparent-mains");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
    document.body.classList.toggle("light", light);
    document.body.classList.add("slow-transparent-mains");
    document.documentElement.style.colorScheme = light ? "light" : "dark";
    localStorage.setItem("slow-theme", light ? "light" : "dark");
  }, [light]);

  useEffect(() => {
    localStorage.setItem("slow-background", videoMode ? "video" : "canvas");
    const video = videoRef.current;
    if (!video) return;
    if (videoMode) {
      video.muted = true;
      video.load();
      video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [videoMode]);

  useEffect(() => {
    const sync = () => {
      const video = videoRef.current;
      const audio = audioRef.current;
      if (!video || !audio || !videoMode || !audio.duration || !video.duration) return;
      const target = audio.currentTime % video.duration;
      if (Math.abs(video.currentTime - target) > 0.2) video.currentTime = target;
    };
    const timer = window.setInterval(sync, 350);
    return () => window.clearInterval(timer);
  }, [videoMode]);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (musicOn) {
      audio.pause();
      setMusicOn(false);
      localStorage.setItem(MUSIC_STORAGE_KEY, "off");
      return;
    }
    audio.volume = 0.25;
    await audio.play().catch(() => undefined);
    const playing = !audio.paused;
    setMusicOn(playing);
    localStorage.setItem(MUSIC_STORAGE_KEY, playing ? "on" : "off");
  };

  return (
    <>
      <SpiderWebCanvas enabled={!videoMode} />
      {videoMode && <><video ref={videoRef} src={VIDEO_SRC} autoPlay loop muted playsInline preload="auto" controls={false} disablePictureInPicture disableRemotePlayback aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 h-full w-full object-cover" onLoadedData={(event) => event.currentTarget.play().catch(() => undefined)} /><div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1] bg-black/25" /></>}
      <audio ref={audioRef} id="slow-global-music" src="/clima-lindo.mp3" loop preload="metadata" />
      <div className="fixed bottom-24 left-4 z-[999] md:bottom-6 md:left-6">
        <div className="flex items-center gap-2">
          <button type="button" onClick={toggleMusic} className="flex h-11 items-center gap-2 rounded-full border border-[var(--card-border-strong)] bg-[var(--card-bg)] px-3 text-sm font-semibold text-[var(--gold)] shadow-[0_0_30px_rgba(126,196,255,.18)] backdrop-blur-xl" aria-label={musicOn ? "Pause background music" : "Play background music"} title={musicOn ? "Pause music" : "Play music"}>{musicOn ? <Pause size={16} /> : <Play size={16} />}<span className="hidden sm:inline">Music</span></button>
          <button type="button" onClick={() => setVideoMode((value) => !value)} className="flex h-11 items-center gap-2 rounded-full border border-[var(--card-border-strong)] bg-[var(--card-bg)] px-3 text-sm font-semibold text-[var(--gold)] shadow-[0_0_30px_rgba(126,196,255,.18)] backdrop-blur-xl" aria-label={videoMode ? "Use interactive spider web background" : "Use background video"} title={videoMode ? "Spider Web" : "Video background"}>{videoMode ? <Waves size={16} /> : <Video size={16} />}<span className="hidden sm:inline">{videoMode ? "Web" : "Video"}</span></button>
          <button type="button" onClick={() => setLight((value) => !value)} className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--card-border-strong)] bg-[var(--card-bg)] text-[var(--gold)] shadow-[0_0_30px_rgba(126,196,255,.18)] backdrop-blur-xl" aria-label={light ? "Switch to dark mode" : "Switch to light mode"} title={light ? "Dark mode" : "Light mode"}>{light ? <Moon size={18} /> : <Sun size={18} />}</button>
        </div>
      </div>
      <VisitorCounterRepair />
    </>
  );
}
