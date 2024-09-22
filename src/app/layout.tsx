"use client";

import "./globals.css";
import TitleBar from "../components/ui/titleBar";
import { ThemeProvider } from "../components/theme-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TitleBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
