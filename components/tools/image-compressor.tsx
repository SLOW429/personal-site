"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { LocalizedCopy } from "@/components/layout/localized-text";
import { useLocale } from "@/components/layout/locale-provider";

type ImageSource = {
  url: string;
  size: number;
};

type CompressedImage = ImageSource & {
  sourceUrl: string;
  quality: number;
};

const buttonClass =
  "mt-4 inline-flex rounded-xl bg-[var(--gold)] px-4 py-2 font-semibold text-[#071018]";
const maxFileSize = 20 * 1024 * 1024;

export default function ImageCompressor() {
  const { text } = useLocale();
  const [source, setSource] = useState<ImageSource | null>(null);
  const [result, setResult] = useState<CompressedImage | null>(null);
  const [quality, setQuality] = useState(0.8);
  const [error, setError] = useState("");
  const currentResult =
    result && source && result.sourceUrl === source.url && result.quality === quality
      ? result
      : null;

  useEffect(() => {
    if (!source) return;
    let resultUrl: string | undefined;
    let cancelled = false;
    const image = new window.Image();

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const context = canvas.getContext("2d");

      if (!context) {
        setError("Canvas is unavailable in this browser.");
        return;
      }

      context.drawImage(image, 0, 0);
      canvas.toBlob((blob) => {
        if (cancelled) return;
        if (!blob) {
          setError("Image compression failed. Try a different image.");
          return;
        }

        resultUrl = URL.createObjectURL(blob);
        setResult({
          url: resultUrl,
          size: blob.size,
          sourceUrl: source.url,
          quality,
        });
        setError("");
      }, "image/webp", quality);
    };

    image.onerror = () => {
      if (!cancelled) setError("Unable to read this image. Choose a supported image file.");
    };
    image.src = source.url;

    return () => {
      cancelled = true;
      image.onload = null;
      image.onerror = null;
      if (resultUrl) URL.revokeObjectURL(resultUrl);
    };
  }, [quality, source]);

  useEffect(() => {
    if (!source) return;
    return () => URL.revokeObjectURL(source.url);
  }, [source]);

  function selectImage(file: File | undefined) {
    if (!file) return;
    setError("");
    setResult(null);
    setSource(null);

    if (!file.type.startsWith("image/")) {
      setError("Choose a valid image file.");
      return;
    }
    if (file.size === 0) {
      setError("The selected image is empty.");
      return;
    }
    if (file.size > maxFileSize) {
      setError("Choose an image smaller than 20 MB.");
      return;
    }

    setSource({ url: URL.createObjectURL(file), size: file.size });
  }

  function updateQuality(value: number) {
    setQuality(value);
    setResult(null);
    setError("");
  }

  const savings =
    source && currentResult
      ? Math.max(0, Math.round((1 - currentResult.size / source.size) * 100))
      : null;

  return (
    <div>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <label className="block w-full text-sm">
          <span className="sr-only"><LocalizedCopy source="Choose an image" /></span>
          <input
            aria-label={text("Choose an image")}
            type="file"
            accept="image/*"
            onChange={(event) => selectImage(event.target.files?.[0])}
            className="block w-full"
          />
        </label>
        <label className="flex items-center gap-2 text-sm text-[var(--muted)]">
          <LocalizedCopy source="Quality" />
          <input
            aria-label={text("WebP quality")}
            type="range"
            min="0.4"
            max="1"
            step="0.05"
            value={quality}
            onChange={(event) => updateQuality(Number(event.target.value))}
          />
          <span>{Math.round(quality * 100)}%</span>
        </label>
      </div>

      {error && (
        <p role="alert" className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200">
          {text(error)}
        </p>
      )}

      {source && (
        <Image
          src={source.url}
          alt={text("Original image preview")}
          width={1000}
          height={800}
          unoptimized
          className="mt-5 max-h-72 w-full rounded-2xl object-contain"
        />
      )}

      {source && currentResult && (
        <div className="mt-5 grid gap-3 text-sm sm:grid-cols-3">
          <div><LocalizedCopy source="Original" /><br /><b>{Math.round(source.size / 1024)} KB</b></div>
          <div>WebP<br /><b>{Math.round(currentResult.size / 1024)} KB</b></div>
          <div><LocalizedCopy source="Saved" /><br /><b>{savings}%</b></div>
        </div>
      )}

      {currentResult && (
        <a href={currentResult.url} download="slow-compressed.webp" className={buttonClass}>
          <LocalizedCopy source="Download WebP" />
        </a>
      )}
    </div>
  );
}
