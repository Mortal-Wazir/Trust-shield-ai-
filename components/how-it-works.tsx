"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { Button } from "@/components/ui/button"

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function run() {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".hiw-step",
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
            },
          },
        )
        gsap.fromTo(
          ".hiw-arrow",
          { width: 0, opacity: 0.4 },
          {
            width: "100%",
            opacity: 1,
            duration: 0.8,
            delay: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
            },
          },
        )
      }, containerRef)
      return () => ctx.revert()
    }
    run()
  }, [])

  return (
    <section ref={containerRef} className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="mb-8 text-balance text-3xl font-semibold neon-text md:text-4xl">How It Works</h2>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="hiw-step rounded-xl border bg-card/40 p-6">
          <h3 className="mb-1 text-lg font-semibold">1. Input</h3>
          <p className="text-foreground/70">Provide text, an image URL, or a video URL for verification.</p>
        </div>
        <div className="hiw-step rounded-xl border bg-card/40 p-6">
          <h3 className="mb-1 text-lg font-semibold">2. Analysis</h3>
          <p className="text-foreground/70">
            Our AI Trust Engine compares sources, detects manipulation, and evaluates signals.
          </p>
        </div>
        <div className="hiw-step rounded-xl border bg-card/40 p-6">
          <h3 className="mb-1 text-lg font-semibold">3. Truth Score</h3>
          <p className="text-foreground/70">Receive a Trust Score and a concise verdict with reasoning.</p>
        </div>
      </div>
      <div className="mt-8 hidden items-center md:flex">
        <div className="hiw-arrow h-1 flex-1 rounded-full bg-gradient-to-r from-[var(--brand-purple)] via-[var(--brand-blue)] to-[var(--brand-cyan)]" />
      </div>
      <div className="mt-8">
        <Button className="neon-ring" asChild>
          <a href="/demo">Try the Live Demo</a>
        </Button>
      </div>
    </section>
  )
}
