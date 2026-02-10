"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ReactNode } from "react"

export default function FeatureCard({
  icon,
  title,
  children,
}: {
  icon: ReactNode
  title: string
  children: ReactNode
}) {
  return (
    <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}>
      <Card className="neon-ring bg-card/40">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-pretty">
            <span className="text-primary">{icon}</span>
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground/70">{children}</CardContent>
      </Card>
    </motion.div>
  )
}
