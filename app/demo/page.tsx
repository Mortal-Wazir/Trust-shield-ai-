"use client"

import type React from "react"

import { useState } from "react"
import Nav from "@/components/nav"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ButtonGroup } from "@/components/ui/button-group"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert" // show errors nicely

type AnalyzeResponse = {
  trustScore: number
  verdict: string
  reason: string
}

export default function DemoPage() {
  const [type, setType] = useState<"text" | "image" | "video">("text")
  const [value, setValue] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AnalyzeResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, input: value }),
      })
      if (!res.ok) {
        let message = "Failed to analyze"
        try {
          const j = await res.json()
          if (j?.error) message = String(j.error)
          if (j?.detail) message += ` (${String(j.detail)})`
        } catch {
          // ignore parse error, keep default message
        }
        throw new Error(message)
      }
      const data = (await res.json()) as AnalyzeResponse
      setResult(data)
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-pretty text-4xl font-semibold neon-text md:text-5xl">Live Demo</h1>
        <p className="mt-3 text-foreground/70">Paste text, an image URL, or a video URL for analysis.</p>

        <Card className="mt-8 border-foreground/15 bg-card/70 backdrop-blur">
          <CardHeader>
            <CardTitle>Analyze Content</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="grid gap-4">
              <div>
                <p className="mb-2 text-sm text-foreground/70">Input type</p>
                <ButtonGroup>
                  <Button
                    type="button"
                    variant={type === "text" ? "default" : "outline"}
                    onClick={() => setType("text")}
                  >
                    Text
                  </Button>
                  <Button
                    type="button"
                    variant={type === "image" ? "default" : "outline"}
                    onClick={() => setType("image")}
                  >
                    Image URL
                  </Button>
                  <Button
                    type="button"
                    variant={type === "video" ? "default" : "outline"}
                    onClick={() => setType("video")}
                  >
                    Video URL
                  </Button>
                </ButtonGroup>
              </div>

              {type === "text" ? (
                <Textarea
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Paste text to verify authenticity..."
                  className="min-h-32"
                  required
                  disabled={loading}
                />
              ) : (
                <Input
                  type="url"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={type === "image" ? "https://example.com/image.jpg" : "https://example.com/video.mp4"}
                  required
                  disabled={loading}
                />
              )}

              <p className="text-xs text-foreground/60">
                Tip: Text works best for quick checks. For images/videos, paste a direct file URL.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Button type="submit" className="neon-ring" disabled={loading || !value.trim()}>
                  Analyze
                </Button>
                {loading && (
                  <div className="flex items-center gap-2 text-foreground/80" role="status" aria-live="polite">
                    <Spinner className="h-4 w-4" />
                    <span className="animate-pulse">Analyzing...</span>
                  </div>
                )}
                <div className="ml-auto text-xs text-foreground/60">
                  We respect your privacy. Inputs are processed transiently.
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8">
          {error && (
            <Alert variant="destructive" role="alert">
              <AlertTitle>Analysis failed</AlertTitle>
              <AlertDescription>{error}. Please check your network and API setup, then try again.</AlertDescription>
            </Alert>
          )}
          {result && (
            <Card className="neon-ring" aria-live="polite">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Analysis Result</CardTitle>
                <Badge variant={result.verdict.toLowerCase().includes("authentic") ? "default" : "outline"}>
                  {result.verdict}
                </Badge>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2">
                <div>
                  <p className="text-sm text-foreground/60">Trust Score</p>
                  <div className="mt-2 flex items-end justify-between">
                    <div className="text-4xl font-semibold">{result.trustScore}</div>
                    <span className="text-xs text-foreground/60">out of 100</span>
                  </div>
                  <div className="mt-3">
                    <Progress value={result.trustScore} />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-foreground/60">Reasoning</p>
                  <p className="mt-2 text-foreground/80">{result.reason}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
