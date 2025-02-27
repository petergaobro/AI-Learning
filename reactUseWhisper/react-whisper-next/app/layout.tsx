import "@/styles/globals.css"
import { Metadata } from "next"

// import { fontSans } from "@/lib/fonts"
// import { cn } from "@/lib/utils"
import twcm from "@/lib/twcm"
import { Toaster } from "@/components/ui/toaster-provider"
import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {

  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={twcm(
            "min-h-screen bg-background font-sans antialiased",
            // fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative flex flex-col min-h-screen">
              <SiteHeader />
              <div className="flex-1">{children}</div>
            </div>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
