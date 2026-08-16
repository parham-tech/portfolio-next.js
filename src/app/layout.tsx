import "./globals.css";
import type { ReactNode } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import { StoryModeProvider } from "@/context/StoryModeContext";
import { ThemeBackground } from "@/components/ThemeBackground";
import { Navbar } from "@/features/Navbar";
import { ScrollProgressProvider } from "@/context/ScrollProgressContext";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="text-white overflow-x-hidden">
  <ThemeProvider>
    <StoryModeProvider>
      <ScrollProgressProvider>
        {/* بک‌گراند */}
        <ThemeBackground />

        {/* این کانتینر */}
        <div
          id="site-container"
          className="relative min-h-screen max-w-[1600px] mx-auto"
        >
          <Navbar />
          <main>{children}</main>
        </div>
      </ScrollProgressProvider>
    </StoryModeProvider>
  </ThemeProvider>
</body>

    </html>
  );
}
