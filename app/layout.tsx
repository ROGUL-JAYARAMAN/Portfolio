import type { Metadata, Viewport } from "next";
import { EB_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import LenisProvider from "@/components/LenisProvider";
import { MotionConfig } from "framer-motion";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rogul Jayaraman — Full Stack Developer",
  description:
    "I design, develop, test, and ship modern web products across the full stack — blending engineering fundamentals with AI-assisted development to build faster, better, and with purpose.",
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0a09",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`dark ${ebGaramond.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme")||localStorage.getItem("rogul-theme");if(t==="light"||t==="dark"){document.documentElement.classList.toggle("dark",t==="dark")}else{document.documentElement.classList.add("dark")}}catch(e){document.documentElement.classList.add("dark")}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#f5f5f5] dark:bg-[#0c0a09] text-[#0c0a09] dark:text-white antialiased overflow-x-clip">
        <ThemeProvider>
          <LenisProvider>
            <MotionConfig reducedMotion="user">{children}</MotionConfig>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
