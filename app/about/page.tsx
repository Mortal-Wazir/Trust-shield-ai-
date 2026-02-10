import Nav from "@/components/nav"
import Footer from "@/components/footer"
import HowItWorks from "@/components/how-it-works"

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="text-pretty text-4xl font-semibold neon-text md:text-5xl">Fighting misinformation with AI.</h1>
        <p className="mt-4 max-w-2xl text-foreground/70 md:text-lg">
          TrustShield AI is an advanced platform for verifying the authenticity of text, images, and videos. Our AI
          Trust Engine detects deepfakes, manipulations, and misleading content in real time.
        </p>
      </main>
      <HowItWorks />
      <Footer />
    </>
  )
}
