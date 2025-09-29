import "./globals.css";
import { ReactNode } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import { Navbar } from "@/features/Navbar";  // ✅ import Navbar

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Navbar />     {/* ✅ Navbar is always visible */}
          {children}     {/* page content */}
        </ThemeProvider>
      </body>
    </html>
  );
}
