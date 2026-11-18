"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  radius: number;
  phase: number;
};

const PARTICLE_COUNT = 34;
const CONNECTION_DISTANCE = 142;

export function AmbientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, (_, index) => ({
      x: (index * 67.7) % 1,
      y: (index * 31.3) % 1,
      radius: 0.7 + (index % 3) * 0.45,
      phase: index * 1.73,
    }));

    let width = 0;
    let height = 0;
    let frame = 0;
    let time = 0;
    let pointerX = -1000;
    let pointerY = -1000;
    let smoothX = pointerX;
    let smoothY = pointerY;
    let visible = true;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      draw();
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      const points = particles.map((particle) => {
        const x = ((particle.x * width + Math.sin(time + particle.phase) * 12) % width + width) % width;
        const y = ((particle.y * height + Math.cos(time * 0.7 + particle.phase) * 10) % height + height) % height;
        const dx = x - smoothX;
        const dy = y - smoothY;
        const distance = Math.hypot(dx, dy);
        const influence = distance < 190 ? (1 - distance / 190) * 16 : 0;
        const angle = Math.atan2(dy, dx);
        return {
          x: x + Math.cos(angle) * influence,
          y: y + Math.sin(angle) * influence,
          radius: particle.radius,
        };
      });

      for (let index = 0; index < points.length; index += 1) {
        const point = points[index];
        if (!point) continue;

        for (let nextIndex = index + 1; nextIndex < points.length; nextIndex += 1) {
          const next = points[nextIndex];
          if (!next) continue;
          const distance = Math.hypot(point.x - next.x, point.y - next.y);
          if (distance > CONNECTION_DISTANCE) continue;
          context.beginPath();
          context.moveTo(point.x, point.y);
          context.lineTo(next.x, next.y);
          context.strokeStyle = `rgba(143, 211, 255, ${(1 - distance / CONNECTION_DISTANCE) * 0.11})`;
          context.lineWidth = 0.7;
          context.stroke();
        }

        context.beginPath();
        context.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        context.fillStyle = "rgba(201, 230, 255, 0.38)";
        context.fill();
      }
    };

    const animate = () => {
      frame = 0;
      if (!visible || motionPreference.matches) return;
      time += 0.006;
      smoothX += (pointerX - smoothX) * 0.045;
      smoothY += (pointerY - smoothY) * 0.045;
      draw();
      frame = window.requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (frame || !visible || motionPreference.matches) return;
      frame = window.requestAnimationFrame(animate);
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointerX = event.clientX - bounds.left;
      pointerY = event.clientY - bounds.top;
      startAnimation();
    };

    const onVisibilityChange = () => {
      visible = !document.hidden;
      if (!visible && frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      } else {
        startAnimation();
      }
    };

    const onMotionChange = () => {
      if (motionPreference.matches && frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      } else {
        startAnimation();
      }
      draw();
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    motionPreference.addEventListener("change", onMotionChange);
    startAnimation();

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      motionPreference.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-75"
    />
  );
}
