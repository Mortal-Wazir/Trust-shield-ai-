import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import TransitionProvider from "@/components/transition-provider"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "TrustShield AI",
  description: "AI That Knows What’s Real.",
  generator: "v0.app",
}

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} antialiased`}>
      <body className="font-sans bg-background text-foreground">
        <Suspense fallback={null}>
          <TransitionProvider>{children}</TransitionProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
