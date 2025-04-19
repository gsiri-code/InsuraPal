"use client"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export const BackgroundBeams = ({
  className,
}: {
  className?: string
}) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        setCursorPosition({ x, y })
      }
    }

    const handleMouseEnter = () => {
      setIsHovered(true)
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", handleMouseMove)
      container.addEventListener("mouseenter", handleMouseEnter)
      container.addEventListener("mouseleave", handleMouseLeave)

      return () => {
        container.removeEventListener("mousemove", handleMouseMove)
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn(
        "h-full w-full overflow-hidden [--x-px:0] [--y-px:0] [--size-px:0] [--opacity:0.15] [--beam-color:theme(colors.indigo.500)]",
        className,
      )}
      style={
        {
          "--x-px": `${cursorPosition.x}px`,
          "--y-px": `${cursorPosition.y}px`,
          "--size-px": isHovered ? "400px" : "0px",
        } as React.CSSProperties
      }
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-[--y-px] left-[--x-px] h-[--size-px] w-[--size-px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[--beam-color] opacity-[--opacity] blur-[calc(var(--size-px)/8)] transition-[height,width] duration-700 ease-in-out" />
        <div className="absolute top-[--y-px] left-[--x-px] h-[--size-px] w-[--size-px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[--beam-color] opacity-[--opacity]] blur-[calc(var(--size-px)/8)] transition-[height,width] duration-700 ease-in-out" />
        <div className="absolute inset-0 z-10 bg-[radial-gradient(transparent,_theme(colors.background/90%)_70%)]" />
      </div>
    </div>
  )
}
