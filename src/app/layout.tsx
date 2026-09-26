import "./globals.css";
import type { ReactNode } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import { StoryModeProvider } from "@/context/StoryModeContext";
import { ThemeBackground } from "@/components/ThemeBackground";
import { Navbar } from "@/features/Navbar";
import { ScrollProgressProvider } from "@/context/ScrollProgressContext";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="text-white antialiased">
  <ThemeProvider>
    <StoryModeProvider>
      <ScrollProgressProvider>
        {/* Skip to Content Link for A11y */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-yellow-400 focus:text-black focus:rounded-lg focus:font-bold"
        >
          Skip to content
        </a>

        {/* بک‌گراند */}
        <ThemeBackground />

        {/* این کانتینر */}
        <div
          id="site-container"
          className="relative min-h-screen max-w-[1600px] mx-auto"
        >
          <Navbar />
          <main id="main-content">{children}</main>
        </div>
      </ScrollProgressProvider>
    </StoryModeProvider>
  </ThemeProvider>
</body>

    </html>
  );
}
