"use client";
import { cn } from "@/lib/utils";
import { useRef, useState, useEffect } from "react";

interface SpotlightProps {
  className?: string;
  children?: React.ReactNode;
}

export const Spotlight = ({ className, children }: SpotlightProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mousePositionRef.current = { x, y };

      if (containerRef.current) {
        containerRef.current.style.setProperty("--x", `${x}px`);
        containerRef.current.style.setProperty("--y", `${y}px`);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMounted]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden rounded-md bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800",
        className
      )}
      style={
        {
          "--x": "0px",
          "--y": "0px",
        } as React.CSSProperties
      }
    >
      <div className="pointer-events-none absolute inset-0 z-10 h-full w-full opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div
          className="absolute inset-0 z-10 bg-gradient-to-r from-indigo-500/20 to-indigo-400/5 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
          style={{
            clipPath: "circle(150px at var(--x) var(--y))",
            WebkitClipPath: "circle(150px at var(--x) var(--y))",
          }}
        />
        <div
          className="absolute inset-0 z-10 bg-gradient-to-r from-indigo-400/20 to-indigo-300/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            clipPath: "circle(100px at var(--x) var(--y))",
            WebkitClipPath: "circle(100px at var(--x) var(--y))",
          }}
        />
      </div>
      {children}
    </div>
  );
};
