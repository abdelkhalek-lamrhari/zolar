import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ZOLAR Contact", // Updated browser tab title
  description: "ZOLAR ⚡ Moroccan-born streetwear by hustlers, for hustlers. Share your contact with NFC.", // Added description
  openGraph: {
    title: "ZOLAR Contact", // Open Graph title for social sharing
    description: "ZOLAR ⚡ Moroccan-born streetwear by hustlers, for hustlers. Share your contact with NFC.",
    images: [
      {
        url: "/zolar-logo.png", // Path to your main ZOLAR logo for social media preview
        width: 1200,
        height: 630,
        alt: "ZOLAR Logo",
      },
    ],
    type: "website",
    url: "https://your-zolar-app-url.com", // Replace with your actual deployed URL
  },
  twitter: {
    card: "summary_large_image",
    title: "ZOLAR Contact",
    description: "ZOLAR ⚡ Moroccan-born streetwear by hustlers, for hustlers. Share your contact with NFC.",
    images: ["/zolar-logo.png"], // Path to your main ZOLAR logo for Twitter Card preview
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
