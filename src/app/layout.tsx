import "./globals.css";
import { ReactNode } from "react";
import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
