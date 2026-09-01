"use client";

import { Eraser, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type SignaturePadProps = {
  onChange: (dataUrl: string) => void;
};

export function SignaturePad({ onChange }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const current = canvas.toDataURL("image/png");
      canvas.width = Math.round(rect.width * ratio);
      canvas.height = Math.round(rect.height * ratio);
      const context = canvas.getContext("2d");
      if (!context) return;
      context.scale(ratio, ratio);
      context.lineWidth = 2.4;
      context.lineCap = "round";
      context.lineJoin = "round";
      context.strokeStyle = "#202C33";
      if (signed) {
        const image = new Image();
        image.onload = () => context.drawImage(image, 0, 0, rect.width, rect.height);
        image.src = current;
      }
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [signed]);

  const point = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const start = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    canvas.setPointerCapture(event.pointerId);
    drawing.current = true;
    const { x, y } = point(event);
    context.beginPath();
    context.moveTo(x, y);
  };

  const move = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context || !drawing.current) return;
    const { x, y } = point(event);
    context.lineTo(x, y);
    context.stroke();
    setSigned(true);
    onChange(canvas.toDataURL("image/png"));
  };

  const stop = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    drawing.current = false;
    if (signed) onChange(canvas.toDataURL("image/png"));
    try {
      canvas.releasePointerCapture(event.pointerId);
    } catch {
      // Pointer capture may already be released on some touch devices.
    }
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    setSigned(false);
    onChange("");
  };

  return (
    <div>
      <div className="rounded-lg border border-primary/20 bg-white p-2">
        <canvas
          ref={canvasRef}
          className="h-56 w-full touch-none rounded-md bg-[linear-gradient(#E7F1F0_1px,transparent_1px),linear-gradient(90deg,#E7F1F0_1px,transparent_1px)] bg-[length:18px_18px] sm:h-72"
          aria-label="Digital signature canvas for Owner 1"
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={stop}
          onPointerLeave={(event) => {
            if (drawing.current) stop(event);
          }}
        />
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-bold text-slate">{signed ? "Owner 1 signature captured." : "Owner 1 signs here."}</p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-white px-3 py-2 text-sm font-extrabold text-ink hover:bg-background"
            onClick={clear}
          >
            <Eraser size={16} aria-hidden />
            Clear Signature
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-extrabold text-white hover:bg-ink"
            onClick={clear}
          >
            <RotateCcw size={16} aria-hidden />
            Sign Again
          </button>
        </div>
      </div>
    </div>
  );
}
