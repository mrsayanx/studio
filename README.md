# Tekitto Digital Growth Platform - Project Code

This file contains the complete source code for your application. You can provide the entire content of this file to a tool like ChatGPT and ask it to generate a downloadable ZIP file for you.

---
---
---

### FILE: `apphosting.yaml`
```yaml
# Settings to manage and configure a Firebase App Hosting backend.
# https://firebase.google.com/docs/app-hosting/configure

runConfig:
  # Increase this value if you'd like to automatically spin up
  # more instances in response to increased traffic.
  maxInstances: 1
```

---
### FILE: `components.json`
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

---
### FILE: `netlify.toml`
```toml
# Netlify configuration for Next.js projects
# https://docs.netlify.com/integrations/frameworks/next-js/

[build]
  # Command to build the project
  command = "npm run build"
  
  # Directory to publish
  publish = ".next"

[[plugins]]
  # The official Netlify plugin for Next.js handles most of the configuration
  package = "@netlify/plugin-nextjs"
```

---
### FILE: `next.config.ts`
```ts
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true
  },
};

export default nextConfig;
```

---
### FILE: `package.json`
```json
{
  "name": "nextn",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack -p 9002",
    "genkit:dev": "genkit start -- tsx src/ai/dev.ts",
    "genkit:watch": "genkit start -- tsx --watch src/ai/dev.ts",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@genkit-ai/googleai": "^1.14.1",
    "@genkit-ai/next": "^1.14.1",
    "@hookform/resolvers": "^4.1.3",
    "@radix-ui/react-accordion": "^1.2.3",
    "@radix-ui/react-alert-dialog": "^1.1.6",
    "@radix-ui/react-avatar": "^1.1.3",
    "@radix-ui/react-checkbox": "^1.1.4",
    "@radix-ui/react-collapsible": "^1.1.11",
    "@radix-ui/react-dialog": "^1.1.6",
    "@radix-ui/react-dropdown-menu": "^2.1.6",
    "@radix-ui/react-label": "^2.1.2",
    "@radix-ui/react-menubar": "^1.1.6",
    "@radix-ui/react-popover": "^1.1.6",
    "@radix-ui/react-progress": "^1.1.2",
    "@radix-ui/react-radio-group": "^1.2.3",
    "@radix-ui/react-scroll-area": "^1.2.3",
    "@radix-ui/react-select": "^2.1.6",
    "@radix-ui/react-separator": "^1.1.2",
    "@radix-ui/react-slider": "^1.2.3",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-switch": "^1.1.3",
    "@radix-ui/react-tabs": "^1.1.3",
    "@radix-ui/react-toast": "^1.2.6",
    "@radix-ui/react-tooltip": "^1.1.8",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "date-fns": "^3.6.0",
    "dotenv": "^16.5.0",
    "embla-carousel-react": "^8.6.0",
    "firebase": "^11.9.1",
    "genkit": "^1.14.1",
    "lucide-react": "^0.475.0",
    "next": "15.3.3",
    "patch-package": "^8.0.0",
    "react": "^18.3.1",
    "react-day-picker": "^8.10.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.54.2",
    "recharts": "^2.15.1",
    "tailwind-merge": "^3.0.1",
    "tailwindcss-animate": "^1.0.7",
    "zod": "^3.24.2",
    "@netlify/plugin-nextjs": "^5.5.1"
  },
  "devDependencies": {
    "@tailwindcss/typography": "^0.5.13",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "genkit-cli": "^1.14.1",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}
```

---
### FILE: `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---
### FILE: `tailwind.config.ts`
```ts
import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        headline: ['Inter', 'sans-serif'],
        code: ['monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
} satisfies Config;
```

---
### FILE: `src/ai/dev.ts`
```ts
import { config } from 'dotenv';
config();

import '@/ai/flows/generate-taglines.ts';
```

---
### FILE: `src/ai/genkit.ts`
```ts
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.0-flash',
});
```

---
### FILE: `src/ai/flows/generate-taglines.ts`
```ts
'use server'

/**
 * @fileOverview Generates AI-driven taglines and ad copy options for service promotion.
 *
 * - generateTaglines - A function that generates taglines and ad copy.
 * - GenerateTaglinesInput - The input type for the generateTaglines function.
 * - GenerateTaglinesOutput - The return type for the generateTaglines function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTaglinesInputSchema = z.object({
  serviceName: z.string().describe('The name of the service to promote.'),
  brandName: z.string().describe('The name of the brand.'),
  brandKeywords: z.string().describe('Keywords associated with the brand.'),
});

export type GenerateTaglinesInput = z.infer<typeof GenerateTaglinesInputSchema>;

const GenerateTaglinesOutputSchema = z.object({
  taglines: z.array(z.string()).describe('An array of generated taglines.'),
  adCopy: z.string().describe('Generated ad copy for the service.'),
});

export type GenerateTaglinesOutput = z.infer<typeof GenerateTaglinesOutputSchema>;

export async function generateTaglines(input: GenerateTaglinesInput): Promise<GenerateTaglinesOutput> {
  return generateTaglinesFlow(input);
}

const generateTaglinesPrompt = ai.definePrompt({
  name: 'generateTaglinesPrompt',
  input: {schema: GenerateTaglinesInputSchema},
  output: {schema: GenerateTaglinesOutputSchema},
  prompt: `You are a marketing expert specializing in creating compelling taglines and ad copy. Generate several taglines and an ad copy for the specified service.

Service Name: {{{serviceName}}}
Brand Name: {{{brandName}}}
Brand Keywords: {{{brandKeywords}}}

Taglines (5 variations, short and catchy):
Ad Copy:`,
});

const generateTaglinesFlow = ai.defineFlow({
    name: 'generateTaglinesFlow',
    inputSchema: GenerateTaglinesInputSchema,
    outputSchema: GenerateTaglinesOutputSchema,
  },
  async input => {
    const {output} = await generateTaglinesPrompt(input);
    return output!;
  }
);
```

---
### FILE: `src/app/globals.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: Arial, Helvetica, sans-serif;
}

@layer base {
  :root {
    --background: 0 0% 0%;
    --foreground: 0 0% 100%;
    --card: 0 0% 4%;
    --card-foreground: 0 0% 98%;
    --popover: 0 0% 4%;
    --popover-foreground: 0 0% 98%;
    --primary: 240 100% 50%;
    --primary-foreground: 0 0% 100%;
    --secondary: 0 0% 15%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 15%;
    --muted-foreground: 0 0% 63.9%;
    --accent: 0 0% 20%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 20%;
    --input: 0 0% 15%;
    --ring: 240 100% 50%;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
    --radius: 0.5rem;
    --sidebar-background: 0 0% 2%;
    --sidebar-foreground: 0 0% 98%;
    --sidebar-primary: 240 100% 50%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 0 0% 15%;
    --sidebar-accent-foreground: 0 0% 98%;
    --sidebar-border: 0 0% 20%;
    --sidebar-ring: 240 100% 50%;
  }
  .dark {
    --background: 0 0% 0%;
    --foreground: 0 0% 100%;
    --card: 0 0% 4%;
    --card-foreground: 0 0% 98%;
    --popover: 0 0% 4%;
    --popover-foreground: 0 0% 98%;
    --primary: 240 100% 50%;
    --primary-foreground: 0 0% 100%;
    --secondary: 0 0% 15%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 15%;
    --muted-foreground: 0 0% 63.9%;
    --accent: 0 0% 20%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 20%;
    --input: 0 0% 15%;
    --ring: 240 100% 50%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
    --sidebar-background: 0 0% 2%;
    --sidebar-foreground: 0 0% 98%;
    --sidebar-primary: 240 100% 50%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 0 0% 15%;
    --sidebar-accent-foreground: 0 0% 98%;
    --sidebar-border: 0 0% 20%;
    --sidebar-ring: 240 100% 50%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

---
### FILE: `src/app/layout.tsx`
```tsx
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
```

---
### FILE: `src/app/(main)/layout.tsx`
```tsx
import Footer from "@/components/footer";
import Header from "@/components/header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
```

---
### FILE: `src/app/(main)/page.tsx`
```tsx
import { services } from "@/lib/services";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
)

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-40 bg-background">
          <div className="container px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
                Grow Your Business Digitally With <span className="text-primary">Tekitto</span>
              </h1>
              <p className="mt-4 text-lg text-muted-foreground md:text-xl">
                Your one-stop solution for stunning websites, engaging marketing, and powerful branding.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="#services">Explore Services</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="#pricing">View Pricing</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-background/95">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">Our Services</h2>
              <p className="mt-3 max-w-2xl mx-auto text-muted-foreground md:text-xl">
                From concept to launch, we offer everything you need to succeed online.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {services.slice(0, 8).map((service) => (
                <Card key={service.id} className="flex flex-col overflow-hidden group transform transition-all duration-300 hover:scale-105 hover:shadow-primary/20 hover:shadow-lg text-center">
                  <CardHeader className="items-center p-6">
                    <div className="p-4 bg-primary/10 rounded-full mb-4 border border-primary/20">
                      <service.Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow px-6 pb-6">
                    <p className="text-muted-foreground text-sm">{service.shortDescription}</p>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button asChild className="w-full">
                      <Link href={`/services/${service.slug}`}>View Details</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
             <div className="text-center mt-12">
              <Button asChild variant="secondary" size="lg">
                <Link href="/services">View All Services</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">Pricing Plans</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Choose the perfect plan to kickstart your digital growth.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-4xl mx-auto">
              <Card className="p-8 text-left transform transition-all duration-300 hover:scale-105 hover:border-primary">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Basic Plan</CardTitle>
                  <p className="text-4xl font-bold mt-2">₹999</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2"><CheckCircle2 className="text-primary w-5 h-5" /> Logo Design</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="text-primary w-5 h-5" /> 1 Poster Design</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="text-primary w-5 h-5" /> Facebook Page Setup Help</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="https://wa.me/918345805877" target="_blank">Book Now</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card className="p-8 text-left transform transition-all duration-300 hover:scale-105 border-2 border-primary shadow-primary/20 shadow-lg relative">
                 <div className="absolute top-0 right-4 -mt-4 bg-primary text-primary-foreground px-3 py-1 text-sm font-bold rounded-full">MOST POPULAR</div>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Premium Plan</CardTitle>
                  <p className="text-4xl font-bold mt-2 text-primary">₹2999</p>
                </CardHeader>
                <CardContent className="space-y-4">
                   <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2"><CheckCircle2 className="text-primary w-5 h-5" /> Everything in Basic Plan</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="text-primary w-5 h-5" /> 30 Days Facebook Page Support</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="text-primary w-5 h-5" /> Daily Post Guidelines</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="text-primary w-5 h-5" /> 4 Premium AI Promo Videos</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="text-primary w-5 h-5" /> 12 Custom Posters</li>
                    <li className="flex items-center gap-2"><WhatsAppIcon /> WhatsApp Marketing Help</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="https://wa.me/918345805877" target="_blank">Book Now</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
```

---
### FILE: `src/app/(main)/about/page.tsx`
```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { aboutUsContent } from "@/lib/content/about-us";

export default function AboutPage() {
  const { ourStory, ourMission, team } = aboutUsContent;

  return (
    <div className="container py-12 md:py-20">
      <section className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">About Tekitto</h1>
        <p className="text-lg text-muted-foreground">
          Meet the passionate team behind our digital solutions.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <div className="prose prose-invert max-w-none text-muted-foreground space-y-4">
            {ourStory.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
          <Image 
            src="https://placehold.co/600x400.png"
            alt="The Tekitto team working collaboratively"
            fill
            style={{ objectFit: 'cover' }}
            data-ai-hint="team collaboration"
          />
        </div>
      </section>

      <section className="mb-20">
         <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <div className="prose prose-invert max-w-none text-muted-foreground space-y-4">
             {ourMission.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center mb-12">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {team.map((member) => (
            <Card key={member.name} className="text-center transform transition-all duration-300 hover:scale-105 hover:shadow-primary/20">
              <CardHeader className="items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={member.image.src} alt={member.name} data-ai-hint={member.image.hint} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle>{member.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary font-semibold">{member.role}</p>
                <p className="text-muted-foreground mt-2 text-sm">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
```

---
### FILE: `src/app/(main)/contact/page.tsx`
```tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div className="container py-20">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="text-muted-foreground mt-4">Have a question or want to work with us? Drop us a message.</p>
      </div>
      <form className="max-w-2xl mx-auto mt-12 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Your Name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Your Email" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" placeholder="Subject" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" placeholder="Your message..." rows={6} />
        </div>
        <Button type="submit" size="lg" className="w-full">Send Message</Button>
      </form>
    </div>
  );
}
```

---
### FILE: `src/app/(main)/pricing/page.tsx`
```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  return (
     <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">Pricing Plans</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Choose the perfect plan to kickstart your digital growth.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-4xl mx-auto w-full">
              <Card className="p-8 text-left transform transition-all duration-300 hover:scale-105 hover:border-primary">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Basic Plan</CardTitle>
                  <p className="text-4xl font-bold mt-2">₹999</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2"><CheckCircle2 className="text-primary w-5 h-5" /> Logo Design</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="text-primary w-5 h-5" /> 1 Poster Design</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="text-primary w-5 h-5" /> Facebook Page Setup Help</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="https://wa.me/918345805877" target="_blank">Book Now</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card className="p-8 text-left transform transition-all duration-300 hover:scale-105 border-2 border-primary shadow-primary/20 shadow-lg relative">
                 <div className="absolute top-0 right-4 -mt-4 bg-primary text-primary-foreground px-3 py-1 text-sm font-bold rounded-full">MOST POPULAR</div>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Premium Plan</CardTitle>
                  <p className="text-4xl font-bold mt-2 text-primary">₹2999</p>
                </CardHeader>
                <CardContent className="space-y-4">
                   <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2"><CheckCircle2 className="text-primary w-5 h-5" /> Everything in Basic Plan</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="text-primary w-5 h-5" /> 30 Days Facebook Page Support</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="text-primary w-5 h-5" /> Daily Post Guidelines</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="text-primary w-5 h-5" /> 4 Premium AI Promo Videos</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="text-primary w-5 h-5" /> 12 Custom Posters</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="text-primary w-5 h-5" /> WhatsApp Marketing Help</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="https://wa.me/918345805877" target="_blank">Book Now</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
  );
}
```

---
### FILE: `src/app/(main)/products/page.tsx`
```tsx
export default function ProductsPage() {
  return (
    <div className="container text-center py-20">
      <h1 className="text-4xl font-bold">Products</h1>
      <p className="text-muted-foreground mt-4">Our products are coming soon. Stay tuned!</p>
    </div>
  );
}
```

---
### FILE: `src/app/(main)/services/page.tsx`
```tsx
import { services } from "@/lib/services";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <div className="container py-12 md:py-24 lg:py-32">
        <div className="text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">All Services</h1>
            <p className="mt-3 max-w-2xl mx-auto text-muted-foreground md:text-xl">
            Explore our comprehensive range of digital solutions.
            </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.map((service) => (
            <Card key={service.id} className="flex flex-col overflow-hidden group transform transition-all duration-300 hover:scale-105 hover:shadow-primary/20 hover:shadow-lg text-center">
                <CardHeader className="items-center p-6">
                  <div className="p-4 bg-primary/10 rounded-full mb-4 border border-primary/20">
                    <service.Icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow px-6 pb-6">
                  <p className="text-muted-foreground text-sm">{service.shortDescription}</p>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                <Button asChild className="w-full">
                    <Link href={`/services/${service.slug}`}>View Details</Link>
                </Button>
                </CardFooter>
            </Card>
            ))}
        </div>
    </div>
  );
}
```

---
### FILE: `src/app/(main)/services/[slug]/page.tsx`
```tsx
import { services } from "@/lib/services";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  const relatedServices = services.filter(s => s.id !== service.id).slice(0, 3);

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="grid md:grid-cols-5 gap-12 items-start">
        <div className="md:col-span-3">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
              <service.Icon className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold font-headline">{service.title}</h1>
          </div>
          <p className="text-2xl font-semibold text-primary mb-6">{service.price}</p>
          <div className="prose prose-invert max-w-none text-muted-foreground mb-8">
            <p>{service.description}</p>
          </div>
           <Button asChild size="lg" className="w-full md:w-auto">
            <Link href="https://wa.me/918345805877" target="_blank">Book Now</Link>
          </Button>
        </div>
        <div className="md:col-span-2">
            <Card className="bg-card/80">
                <CardHeader>
                    <CardTitle>What&apos;s Included:</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                    {service.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                        <span>{highlight}</span>
                        </li>
                    ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
      </div>

      <div className="mt-24">
        <h2 className="text-3xl font-bold text-center mb-12 font-headline">Related Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedServices.map((relatedService) => (
                <Card key={relatedService.id} className="flex flex-col overflow-hidden group transform transition-all duration-300 hover:scale-105 hover:shadow-primary/20 hover:shadow-lg text-center">
                  <CardHeader className="items-center p-6">
                    <div className="p-4 bg-primary/10 rounded-full mb-4 border border-primary/20">
                      <relatedService.Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-bold">{relatedService.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow px-6 pb-6">
                    <p className="text-muted-foreground text-sm">{relatedService.shortDescription}</p>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button asChild className="w-full">
                      <Link href={`/services/${relatedService.slug}`}>View Details</Link>
                    </Button>
                  </CardFooter>
                </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
```

---
### FILE: `src/app/(main)/tagline-generator/actions.ts`
```ts
"use server";

import { generateTaglines, GenerateTaglinesInput, GenerateTaglinesOutput } from "@/ai/flows/generate-taglines";

export async function generateTaglinesAction(
  input: GenerateTaglinesInput
): Promise<{ success: boolean; data?: GenerateTaglinesOutput; error?: string }> {
  try {
    const output = await generateTaglines(input);
    return { success: true, data: output };
  } catch (error) {
    console.error("Error generating taglines:", error);
    return { success: false, error: "Failed to generate taglines. Please try again." };
  }
}
```

---
### FILE: `src/app/(main)/tagline-generator/page.tsx`
```tsx
"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Loader2, Quote } from "lucide-react";
import { generateTaglinesAction } from "./actions";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  serviceName: z.string().min(2, "Service name is required."),
  brandName: z.string().min(2, "Brand name is required."),
  brandKeywords: z.string().min(3, "Please provide some keywords."),
});

type FormValues = z.infer<typeof formSchema>;

type GenerationOutput = {
  taglines: string[];
  adCopy: string;
};

export default function TaglineGeneratorPage() {
  const [generation, setGeneration] = useState<GenerationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceName: "",
      brandName: "Tekitto",
      brandKeywords: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setGeneration(null);
    const result = await generateTaglinesAction(values);
    setIsLoading(false);

    if (result.success && result.data) {
      setGeneration(result.data);
    } else {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: result.error || "An unknown error occurred.",
      });
    }
  }

  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto text-center">
        <Lightbulb className="mx-auto h-12 w-12 text-primary" />
        <h1 className="text-4xl font-bold mt-4 font-headline">AI Tagline & Ad Copy Generator</h1>
        <p className="text-muted-foreground mt-2">
          Craft the perfect message for your brand. Describe your service and let our AI do the magic.
        </p>
      </div>

      <div className="max-w-3xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <Card>
          <CardHeader>
            <CardTitle>Describe Your Service</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="serviceName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Website Development" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="brandName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brand Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Tekitto" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="brandKeywords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brand Keywords</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., modern, fast, reliable, digital growth" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Generate
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        <div className="space-y-8">
            {isLoading && (
                 <Card className="flex items-center justify-center h-full">
                    <div className="text-center text-muted-foreground">
                        <Loader2 className="mx-auto h-8 w-8 animate-spin" />
                        <p className="mt-2">Generating ideas...</p>
                    </div>
                </Card>
            )}

            {generation && (
                <>
                <Card>
                    <CardHeader>
                        <CardTitle>Generated Taglines</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                    {generation.taglines.map((tagline, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <Quote className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                            <p className="text-muted-foreground">{tagline}</p>
                        </div>
                    ))}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Generated Ad Copy</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground whitespace-pre-line">{generation.adCopy}</p>
                    </CardContent>
                </Card>
                </>
            )}

            {!isLoading && !generation && (
                 <Card className="flex items-center justify-center h-full border-dashed">
                    <div className="text-center text-muted-foreground p-8">
                        <Lightbulb className="mx-auto h-8 w-8" />
                        <p className="mt-2">Your generated content will appear here.</p>
                    </div>
                </Card>
            )}
        </div>
      </div>
    </div>
  );
}
```

---
### FILE: `src/components/floating-whatsapp.tsx`
```tsx
"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
)

const FloatingWhatsappButton = () => {
  return (
    <Button
      asChild
      className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-green-500 hover:bg-green-600 shadow-lg z-50 animate-bounce"
      aria-label="Chat on WhatsApp"
    >
      <Link href="https://wa.me/918345805877" target="_blank">
        <WhatsAppIcon />
      </Link>
    </Button>
  );
};

export default FloatingWhatsappButton;
```

---
### FILE: `src/components/footer.tsx`
```tsx
import { Facebook, Instagram } from "lucide-react";
import Link from "next/link";

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
)

export default function Footer() {
  return (
    <footer className="border-t py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div className="mb-4 md:mb-0">
          <p className="text-lg font-bold">
            <span className="text-primary">T</span>ekitto
          </p>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Tekitto. All rights reserved.
          </p>
        </div>
        <div className="flex space-x-4">
          <Link
            href="https://facebook.com/tekitto.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary"
          >
            <Facebook className="h-6 w-6" />
            <span className="sr-only">Facebook</span>
          </Link>
          <Link
            href="https://instagram.com/tekitto.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary"
          >
            <Instagram className="h-6 w-6" />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link
            href="https://wa.me/918345805877"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary"
          >
            <WhatsAppIcon />
            <span className="sr-only">WhatsApp</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
```

---
### FILE: `src/components/header.tsx`
```tsx
"use client";

import Link from "next/link";
import {
  Menu,
  Search,
  UploadCloud,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
  { href: "/tagline-generator", label: "AI Tools" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10 items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 border-2 border-dashed rounded-md flex items-center justify-center text-muted-foreground">
              <UploadCloud className="h-5 w-5" />
            </div>
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-lg">
                <span className="text-primary">T</span>ekitto
              </span>
            </Link>
          </div>
          <nav className="hidden gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden md:flex flex-1 max-w-sm items-center space-x-2">
            <Input
              type="search"
              placeholder="Search services..."
              className="h-9"
            />
            <Button type="submit" size="sm" variant="outline" className="px-3">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
               <SheetHeader>
                <SheetTitle>
                   <Link href="/" className="flex items-center space-x-2">
                    <span className="font-bold text-lg">
                      <span className="text-primary">T</span>ekitto
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <nav className="grid gap-6 text-lg font-medium mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
```

---
### FILE: `src/components/splash-screen.tsx`
```tsx
"use client";

import { cn } from "@/lib/utils";

const SplashScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-black overflow-hidden">
      <div className="relative">
        <style jsx>{`
          @keyframes drop {
            0% {
              transform: translateY(-200px) scaleY(0.9);
              opacity: 0;
            }
            5% {
              opacity: 0.7;
            }
            50% {
              transform: translateY(0px) scaleY(1);
              opacity: 1;
            }
            65% {
              transform: translateY(-17px) scaleY(0.9);
            }
            75% {
              transform: translateY(-22px) scaleY(0.9);
            }
            100% {
              transform: translateY(0px) scaleY(1);
            }
          }
          .welcome-text span {
            display: inline-block;
            opacity: 0;
            animation: drop 1.2s ease-out forwards;
          }
        `}</style>
        <h1
          className="welcome-text font-headline text-xl md:text-2xl lg:text-3xl font-black text-center tracking-wider text-white"
          style={{ textShadow: "0px 0px 10px rgba(255, 255, 255, 0.3)" }}
        >
          {"Welcome To ".split("").map((char, index) => (
            <span key={index} style={{ animationDelay: `${index * 0.05}s` }}>
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
          <span className="text-primary" style={{ animationDelay: `${"Welcome To ".length * 0.05}s`, textShadow: "0px 0px 15px hsl(var(--primary))" }}>
            T
          </span>
          {"ekitto".split("").map((char, index) => (
            <span key={index} style={{ animationDelay: `${("Welcome To T".length + index) * 0.05}s` }}>
              {char}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
};

export default SplashScreen;
```

---
### FILE: `src/hooks/use-mobile.tsx`
```tsx
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
```

---
### FILE: `src/hooks/use-toast.ts`
```ts
"use client"

// Inspired by react-hot-toast library
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }
```

---
### FILE: `src/lib/utils.ts`
```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---
### FILE: `src/lib/content/about-us.ts`
```ts
export const aboutUsContent = {
  ourStory: [
    "Founded with a passion for digital innovation, Tekitto started as a small team of creative minds dedicated to helping businesses thrive online. We saw a need for accessible, high-quality digital services that could empower entrepreneurs and established companies alike.",
    "From humble beginnings, we've grown into a full-service digital agency, but our core values remain the same: creativity, collaboration, and a client-first approach. We believe that every project is a partnership, and we're committed to building long-lasting relationships based on trust and results."
  ],
  ourMission: [
    "Our mission is to empower businesses with the digital tools and strategies they need to succeed in a competitive landscape. We strive to deliver exceptional design, development, and marketing solutions that are not only visually stunning but also drive growth and deliver a tangible return on investment.",
    "We are dedicated to staying at the forefront of technology, continuously learning and adapting to provide our clients with the most effective and innovative solutions available."
  ],
  team: [
    {
      name: "Alex Doe",
      role: "Founder & CEO",
      bio: "The visionary behind Tekitto, with a passion for building beautiful and functional digital experiences.",
      image: { src: "https://placehold.co/200x200.png", hint: "male portrait" }
    },
    {
      name: "Jane Smith",
      role: "Lead Designer",
      bio: "The creative genius who brings ideas to life with stunning visuals and user-centric designs.",
      image: { src: "https://placehold.co/200x200.png", hint: "female portrait" }
    },
    {
      name: "Sam Wilson",
      role: "Lead Developer",
      bio: "The coding wizard who turns complex problems into elegant, high-performance solutions.",
      image: { src: "https://placehold.co/200x200.png", hint: "male developer" }
    },
    {
      name: "Emily White",
      role: "Marketing Strategist",
      bio: "The data-driven expert who connects brands with their audiences through effective marketing.",
      image: { src: "https://placehold.co/200x200.png", hint: "female marketer" }
    },
  ],
};
```

---
### FILE: `src/lib/services.ts`
```ts
import type { LucideIcon } from "lucide-react";
import {
  PenTool,
  Palette,
  Megaphone,
  Briefcase,
  ThumbsUp,
  CreditCard,
  MessageCircle,
  Clapperboard,
  Youtube,
  Code
} from 'lucide-react';


export type Service = {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  price: string;
  highlights: string[];
  Icon: LucideIcon;
};

export const services: Service[] = [
  {
    id: 1,
    slug: 'website-development',
    title: 'Website Development',
    shortDescription: 'Custom, responsive, and high-performance websites.',
    description: 'We build robust and scalable websites tailored to your business needs. From e-commerce platforms to corporate sites, our development process ensures a flawless user experience, fast loading times, and SEO-friendly architecture.',
    price: 'Starting from ₹999',
    highlights: ['Full-stack Development', 'Responsive on all devices', 'Optimized for Speed', 'Secure and Scalable'],
    Icon: Code,
  },
  {
    id: 2,
    slug: 'website-design',
    title: 'Website Design',
    shortDescription: 'Beautiful and intuitive user interfaces.',
    description: 'Our design team creates visually stunning and user-friendly interfaces that captivate your audience. We focus on creating a seamless user journey that converts visitors into customers, reflecting your brand\'s identity in every pixel.',
    price: 'Starting from ₹999',
    highlights: ['UI/UX Research', 'Modern & Clean Layouts', 'Interactive Prototypes', 'Brand-centric Design'],
    Icon: Palette,
  },
  {
    id: 3,
    slug: 'logo-designs',
    title: 'Logo Designs',
    shortDescription: 'Memorable logos that define your brand.',
    description: 'A great logo is the cornerstone of your brand identity. We design unique and memorable logos that tell your brand\'s story and resonate with your target audience, ensuring your business stands out from the competition.',
    price: 'Starting from ₹199',
    highlights: ['Multiple Concepts', 'Vector Files Included', 'Full Copyright Ownership', 'Stationery Mockups'],
    Icon: PenTool,
  },
  {
    id: 4,
    slug: 'poster-designs',
    title: 'Poster Designs',
    shortDescription: 'Eye-catching posters for events and promotions.',
    description: 'Promote your events, products, or services with professionally designed posters. We create compelling visuals that grab attention and communicate your message effectively, whether for print or digital distribution.',
    price: 'Starting from ₹199',
    highlights: ['Print-ready Files', 'Custom Illustrations', 'Fast Turnaround', 'Multiple Size Formats'],
    Icon: Megaphone,
  },
  {
    id: 5,
    slug: 'social-media-marketing',
    title: 'Social Media Marketing',
    shortDescription: 'Engage and grow your audience on social platforms.',
    description: 'We develop and execute data-driven social media strategies to increase your brand awareness, engagement, and conversions. From content creation to community management, we handle it all.',
    price: 'Contact for Quote',
    highlights: ['Strategy Development', 'Content Creation', 'Audience Growth', 'Performance Tracking & Reporting'],
    Icon: ThumbsUp,
  },
  {
    id: 6,
    slug: 'facebook-page-setup',
    title: 'Facebook Page Setup',
    shortDescription: 'Professional setup of your Facebook business page.',
    description: 'Get your business on the world\'s largest social network. We set up and optimize your Facebook page for maximum visibility and engagement, including profile and cover photos, business info, and call-to-action buttons.',
    price: '₹999',
    highlights: ['Page Creation & Optimization', 'Custom URL', 'Cover & Profile Photo Design', 'Initial Content Strategy'],
    Icon: ThumbsUp,
  },
  {
    id: 7,
    slug: 'business-card-design',
    title: 'Business Card Design',
    shortDescription: 'Make a lasting impression with professional cards.',
    description: 'Network effectively with a business card that stands out. We design custom business cards that reflect your brand\'s professionalism and style, ensuring you leave a memorable impression.',
    price: 'Starting from ₹99',
    highlights: ['Double-sided Design', 'Print-ready PDF', 'Multiple Design Concepts', 'QR Code Integration'],
    Icon: CreditCard,
  },
  {
    id: 8,
    slug: 'whatsapp-catalog-design',
    title: 'WhatsApp Catalog Design',
    shortDescription: 'Showcase your products directly on WhatsApp.',
    description: 'Leverage WhatsApp for Business with a professionally designed product catalog. We help you set up and design your catalog to make it easy for customers to browse and purchase your products.',
    price: 'Starting from ₹499',
    highlights: ['Catalog Setup', 'Professional Product Images', 'Compelling Descriptions', 'Easy to Manage'],
    Icon: MessageCircle,
  },
  {
    id: 9,
    slug: 'ai-video-ads',
    title: 'AI Video Ads',
    shortDescription: 'Create stunning video ads with AI technology.',
    description: 'Harness the power of AI to create high-quality, engaging video ads at a fraction of the cost. We use cutting-edge tools to produce professional videos that drive results for your campaigns.',
    price: 'Starting from ₹2,500',
    highlights: ['Scriptwriting', 'AI Voiceovers', 'Stock Footage Included', 'Multiple Video Formats'],
    Icon: Clapperboard,
  },
  {
    id: 10,
    slug: 'youtube-channel-kit',
    title: 'YouTube Channel Design Kit',
    shortDescription: 'Logo, cover, and thumbnail designs for YouTube.',
    description: 'Launch or rebrand your YouTube channel with a complete design kit. We provide a custom logo, channel art (cover), and a template for your video thumbnails to create a cohesive and professional look.',
    price: 'Starting from ₹3,000',
    highlights: ['Custom Channel Logo', 'Engaging Channel Art', 'Click-worthy Thumbnail Template', 'Brand Style Guide'],
    Icon: Youtube,
  },
];
```

---
### FILE: `src/components/ui/*`
The `components/ui` directory contains many standard UI components from shadcn/ui. Due to their length, they are not listed here but can be generated by `npx shadcn-ui@latest init` and then adding the individual components. The full list of component files is:
- `accordion.tsx`
- `alert-dialog.tsx`
- `alert.tsx`
- `avatar.tsx`
- `badge.tsx`
- `button.tsx`
- `calendar.tsx`
- `card.tsx`
- `carousel.tsx`
- `chart.tsx`
- `checkbox.tsx`
- `collapsible.tsx`
- `dialog.tsx`
- `dropdown-menu.tsx`
- `form.tsx`
- `input.tsx`
- `label.tsx`
- `menubar.tsx`
- `popover.tsx`
- `progress.tsx`
- `radio-group.tsx`
- `scroll-area.tsx`
- `select.tsx`
- `separator.tsx`
- `sheet.tsx`
- `sidebar.tsx`
- `skeleton.tsx`
- `slider.tsx`
- `switch.tsx`
- `table.tsx`
- `tabs.tsx`
- `textarea.tsx`
- `toast.tsx`
- `toaster.tsx`
- `tooltip.tsx`
---
---
---
