"use client";

import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import FloatingWhatsappButton from '@/components/floating-whatsapp';
import { ThemeProvider } from '@/components/theme-provider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Tekitto</title>
        <meta name="description" content="Grow Your Business Digitally With Tekitto" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
          {children}
          <FloatingWhatsappButton />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
