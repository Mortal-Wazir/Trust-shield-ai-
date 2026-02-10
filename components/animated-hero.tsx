"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function AnimatedHero() {
  return (
    <section className="relative overflow-hidden">
      {/* floating neon gradient */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 grad-hero"
        initial={{ opacity: 0.3, scale: 1 }}
        animate={{ opacity: 0.6, scale: 1.05 }}
        transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, repeatType: "mirror" }}
      />
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 py-20 md:grid-cols-2 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6"
        >
          <h1 className="text-pretty text-4xl font-semibold leading-tight neon-text md:text-6xl">
            AI That Knows What’s Real.
          </h1>
          <p className="text-pretty text-foreground/70 md:text-lg">
            Empowering Digital Truth with AI. TrustShield AI detects fake news, deepfakes, and misinformation —
            instantly.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/demo">
              <Button size="lg" className="neon-ring">
                Try Demo
              </Button>
            </Link>
            <Link href="/features">
              <Button size="lg" variant="outline" className="border-foreground/20 bg-transparent">
                Explore Features
              </Button>
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.99 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          role="img"
          aria-label="Mock analysis preview with trust score 92 out of 100 and status badges"
          className="group relative aspect-[4/3] w-full rounded-2xl border ring-1 ring-foreground/10 bg-gradient-to-tr from-[var(--brand-purple)]/20 via-[var(--brand-blue)]/10 to-[var(--brand-cyan)]/20 p-2"
        >
          {/* decorative grid glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{
              background:
                "radial-gradient(120% 80% at 80% 0%, color-mix(in oklch, var(--foreground) 8%, transparent), transparent 60%)",
            }}
          />
          {/* card surface */}
          <div className="relative h-full w-full rounded-xl border bg-card/60 p-5 shadow-sm backdrop-blur-sm">
            {/* header row with status badges */}
            <div className="mb-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span
                  className="inline-block size-2 rounded-full bg-[var(--brand-cyan)] shadow-[0_0_8px] shadow-[var(--brand-cyan)]"
                  aria-hidden
                />
                <span className="text-sm font-medium text-foreground/80">Realtime Scan</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Secure</Badge>
                <Badge variant="outline">Fast</Badge>
              </div>
            </div>

            {/* body: mock analysis widgets */}
            <div className="grid h-[calc(100%-2.5rem)] grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-foreground/10 bg-secondary/20 p-4">
                <p className="text-xs text-foreground/60">Signals</p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li className="flex items-center justify-between">
                    <span>Source reliability</span>
                    <span className="text-foreground/70">High</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Semantic consistency</span>
                    <span className="text-foreground/70">High</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Manipulation likelihood</span>
                    <span className="text-foreground/70">Low</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-foreground/10 bg-secondary/20 p-4">
                <p className="text-xs text-foreground/60">Trust Score</p>
                <div className="mt-3 flex items-end justify-between">
                  <div>
                    <div className="text-4xl font-semibold">92</div>
                    <div className="text-xs text-foreground/60">out of 100</div>
                  </div>
                  <Badge variant="secondary">Likely Authentic</Badge>
                </div>
                <div className="mt-3">
                  <Progress value={92} />
                </div>
                <p className="mt-3 text-xs text-foreground/60">
                  Based on cross-source verification, metadata integrity, and model detection.
                </p>
              </div>
            </div>
          </div>

          {/* animated glow */}
          <motion.div
            className="pointer-events-none absolute -inset-4 -z-10 rounded-2xl"
            initial={{ boxShadow: "0 0 0px rgba(0,0,0,0)" }}
            animate={{ boxShadow: "0 0 120px color-mix(in oklch, var(--brand-blue) 30%, transparent)" }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "mirror" }}
          />
        </motion.div>
      </div>
    </section>
  )
}
