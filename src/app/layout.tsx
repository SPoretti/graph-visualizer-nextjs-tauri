"use client";

import "./globals.css";
import TitleBar from "./components/titleBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TitleBar />
        {children}
      </body>
    </html>
  );
}
