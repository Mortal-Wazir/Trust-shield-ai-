import Nav from "@/components/nav"
import Footer from "@/components/footer"
import FeatureCard from "@/components/feature-card"

export default function FeaturesPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="text-pretty text-4xl font-semibold neon-text md:text-5xl">Features</h1>
        <p className="mt-3 max-w-2xl text-foreground/70">Built for speed, security, and clarity.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <FeatureCard icon={"🧠"} title="Real-time Fact Checker">
            Checks across reputable sources and signals to validate claims as you type.
          </FeatureCard>
          <FeatureCard icon={"🎭"} title="Deepfake Detection">
            Identifies synthetic media artifacts, blending, and voice cloning patterns.
          </FeatureCard>
          <FeatureCard icon={"📊"} title="AI Trust Scoring">
            Produces an interpretable score backed by concise reasoning and evidence.
          </FeatureCard>
          <FeatureCard icon={"🔒"} title="Source Verification">
            Traces lineage and confirms original publishers to prevent context collapse.
          </FeatureCard>
        </div>
      </main>
      <Footer />
    </>
  )
}
