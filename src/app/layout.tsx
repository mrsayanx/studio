"use client";
import type { Metadata } from 'next';
import { useState, useEffect } from 'react';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import SplashScreen from '@/components/splash-screen';
import FloatingWhatsappButton from '@/components/floating-whatsapp';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Using sessionStorage to show splash screen only once per session.
    if (sessionStorage.getItem('splashShown')) {
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem('splashShown', 'true');
    }, 1000); // Splash screen duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en" className="dark">
      <head>
        <title>Tekitto</title>
        <meta name="description" content="Grow Your Business Digitally With Tekitto" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {loading ? (
          <SplashScreen />
        ) : (
          <>
            {children}
            <FloatingWhatsappButton />
            <Toaster />
          </>
        )}
      </body>
    </html>
  );
}
