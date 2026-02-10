import Nav from "@/components/nav"
import Footer from "@/components/footer"
import AnimatedHero from "@/components/animated-hero"
import HowItWorks from "@/components/how-it-works"
import FeatureCard from "@/components/feature-card"

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <AnimatedHero />
        <section className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="mb-8 text-balance text-3xl font-semibold neon-text md:text-4xl">Core Capabilities</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard icon={"🧠"} title="Real-time Fact Checker">
              Instantly verify claims with cross-referenced sources.
            </FeatureCard>
            <FeatureCard icon={"🎭"} title="Deepfake Detection">
              Spot AI-generated faces, voices, and tampered media.
            </FeatureCard>
            <FeatureCard icon={"📊"} title="AI Trust Scoring">
              Clear, actionable Trust Scores to guide decisions.
            </FeatureCard>
            <FeatureCard icon={"🔒"} title="Source Verification">
              Trace content to original sources and detect manipulation.
            </FeatureCard>
          </div>
        </section>
        <HowItWorks />
      </main>
      <Footer />
    </>
  )
}
