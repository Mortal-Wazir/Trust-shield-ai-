"use client"

import type React from "react"

import { useState } from "react"
import Nav from "@/components/nav"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-pretty text-4xl font-semibold neon-text md:text-5xl">Get in touch</h1>
        <p className="mt-3 text-foreground/70">We’ll get back to you shortly.</p>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Contact Form</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="grid gap-4">
              <Input placeholder="Name" required />
              <Input type="email" placeholder="Email" required />
              <Textarea placeholder="Your message..." className="min-h-32" required />
              <Button type="submit" className="neon-ring">
                Send
              </Button>
              {sent && <p className="text-sm text-foreground/70">Thanks! We’ll reach out soon.</p>}
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </>
  )
}
