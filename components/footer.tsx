import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
        <p className="text-sm text-foreground/60">© {new Date().getFullYear()} TrustShield AI</p>
        <div className="flex items-center gap-4 text-sm">
          <Link href="https://github.com" target="_blank" rel="noreferrer">
            GitHub
          </Link>
          <Link href="https://www.linkedin.com" target="_blank" rel="noreferrer">
            LinkedIn
          </Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  )
}
