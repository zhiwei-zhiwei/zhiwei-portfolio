import type { Metadata } from "next"
import { JetBrains_Mono, Inter } from "next/font/google"
import "./globals.css"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Zhiwei (Jackson) Cao — Software Engineer",
  description:
    "Software Engineer specializing in ML pipelines, full-stack development, and game design. Currently at Cliffwater LLC, Chicago IL.",
  keywords: [
    "Zhiwei Cao",
    "Jackson Cao",
    "Software Engineer",
    "ML Engineer",
    "Full Stack Developer",
    "Chicago",
    "University of Chicago",
    "UW-Madison",
  ],
  authors: [{ name: "Zhiwei (Jackson) Cao" }],
  openGraph: {
    title: "Zhiwei (Jackson) Cao — Software Engineer",
    description:
      "Software Engineer specializing in ML pipelines, full-stack development, and game design.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zhiwei (Jackson) Cao — Software Engineer",
    description: "Software Engineer specializing in ML pipelines, full-stack development, and game design.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
        style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
      >
        {children}
      </body>
    </html>
  )
}
