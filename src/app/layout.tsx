"use client";

import "./globals.css";
import TitleBar from "@/components/ui/titleBar";
import { ThemeProvider } from "@/components/theme-provider";
import { TreeProvider } from "@/components/tree-context";

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
          <TreeProvider>
            <TitleBar />
            {children}
          </TreeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
