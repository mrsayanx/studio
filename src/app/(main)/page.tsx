"use client";

import { useState, useEffect } from 'react';
import { initialServices, Service, getIconComponent, initialPricingPlans, PricingPlan, initialYouTubeVideos, YouTubeVideo, initialHomepageContent, HomepageContent } from "@/lib/services";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Skeleton } from '@/components/ui/skeleton';

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
)

const SERVICES_STORAGE_KEY = 'tekitto_services';
const PRICING_STORAGE_KEY = 'tekitto_pricing_plans';
const YOUTUBE_STORAGE_KEY = 'tekitto_youtube_videos';
const HOMEPAGE_CONTENT_STORAGE_KEY = 'tekitto_homepage_content';

export default function HomePage() {
  const [services, setServices] = useState<Service[]>([]);
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  const [youtubeVideos, setYoutubeVideos] = useState<YouTubeVideo[]>([]);
  const [homepageContent, setHomepageContent] = useState<HomepageContent>(initialHomepageContent);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedServices = localStorage.getItem(SERVICES_STORAGE_KEY);
      const storedPricing = localStorage.getItem(PRICING_STORAGE_KEY);
      const storedYoutube = localStorage.getItem(YOUTUBE_STORAGE_KEY);
      const storedHomepageContent = localStorage.getItem(HOMEPAGE_CONTENT_STORAGE_KEY);
      
      if (storedServices) {
        setServices(JSON.parse(storedServices));
      } else {
        setServices(initialServices);
      }

      if (storedPricing) {
        setPricingPlans(JSON.parse(storedPricing));
      } else {
        setPricingPlans(initialPricingPlans);
      }

       if (storedYoutube) {
        setYoutubeVideos(JSON.parse(storedYoutube));
      } else {
        setYoutubeVideos(initialYouTubeVideos);
      }

      if (storedHomepageContent) {
        setHomepageContent(JSON.parse(storedHomepageContent));
      } else {
        setHomepageContent(initialHomepageContent);
      }
    } catch (error) {
        console.error("Failed to parse from localStorage", error);
        setServices(initialServices);
        setPricingPlans(initialPricingPlans);
        setYoutubeVideos(initialYouTubeVideos);
        setHomepageContent(initialHomepageContent);
    } finally {
        setIsLoading(false);
    }
  }, []);

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
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild className="w-full sm:w-auto">
                  <Link href="#services">Explore Services</Link>
                </Button>
                <Button asChild variant="outline" className="w-full sm:w-auto">
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
            {isLoading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                      <Card key={i} className="p-6 text-center">
                          <Skeleton className="h-12 w-12 rounded-full mx-auto mb-4" />
                          <Skeleton className="h-6 w-3/4 mx-auto mb-4" />
                          <Skeleton className="h-4 w-full mx-auto mb-6" />
                          <Skeleton className="h-10 w-full mx-auto" />
                      </Card>
                  ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {services.slice(0, 8).map((service) => {
                  const Icon = getIconComponent(service.Icon);
                  return (
                    <Card key={service.id} className="flex flex-col overflow-hidden group transform transition-all duration-300 hover:scale-105 hover:shadow-primary/20 hover:shadow-lg text-center">
                      <CardHeader className="items-center p-6">
                        <div className="p-4 bg-primary/10 rounded-full mb-4 border border-primary/20">
                          <Icon className="h-8 w-8 text-primary" />
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
                  )
                })}
              </div>
            )}
             <div className="text-center mt-12">
              <Button asChild variant="secondary" size="lg">
                <Link href="/services">View All Services</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="videos" className="w-full py-12 md:py-24 lg:py-32 bg-background/90">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">{homepageContent.videoSectionTitle}</h2>
                    <p className="mt-3 max-w-2xl mx-auto text-muted-foreground md:text-xl">
                        {homepageContent.videoSectionDescription}
                    </p>
                </div>
                {isLoading ? (
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-5xl mx-auto">
                        <Card>
                            <CardContent className="p-4">
                                <Skeleton className="w-full aspect-video mb-4" />
                                <Skeleton className="h-6 w-3/4 mb-2" />
                                <Skeleton className="h-4 w-full" />
                            </CardContent>
                        </Card>
                         <Card>
                            <CardContent className="p-4">
                                <Skeleton className="w-full aspect-video mb-4" />
                                <Skeleton className="h-6 w-3/4 mb-2" />
                                <Skeleton className="h-4 w-full" />
                            </CardContent>
                        </Card>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-5xl mx-auto">
                        {youtubeVideos.map(video => (
                            <Card key={video.id} className="overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-primary/20">
                                <div className="aspect-w-16 aspect-h-9">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${video.videoId}`}
                                        title={video.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full"
                                    ></iframe>
                                </div>
                                <CardHeader>
                                    <CardTitle>{video.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>{video.description}</CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
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
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-4xl mx-auto w-full">
                    <Skeleton className="h-96 w-full" />
                    <Skeleton className="h-96 w-full" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-4xl mx-auto">
                {pricingPlans.map((plan) => (
                    <Card key={plan.id} className={`p-8 text-left transform transition-all duration-300 hover:scale-105 ${plan.isPopular ? 'border-2 border-primary shadow-primary/20 shadow-lg relative' : 'hover:border-primary'}`}>
                        {plan.isPopular && <div className="absolute top-0 right-4 -mt-4 bg-primary text-primary-foreground px-3 py-1 text-sm font-bold rounded-full">MOST POPULAR</div>}
                        <CardHeader>
                        <CardTitle className="text-2xl font-bold">{plan.title}</CardTitle>
                        <p className={`text-4xl font-bold mt-2 ${plan.isPopular ? 'text-primary' : ''}`}>{plan.price}</p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                        <ul className="space-y-2 text-muted-foreground">
                            {plan.features.map((feature, index) => (
                                <li key={index} className="flex items-center gap-2">
                                    {feature.toLowerCase().includes('whatsapp') ? <WhatsAppIcon /> : <CheckCircle2 className="text-primary w-5 h-5" />}
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        </CardContent>
                        <CardFooter>
                        <Button asChild className="w-full">
                            <Link href="https://wa.me/918345805877" target="_blank">Book Now</Link>
                        </Button>
                        </CardFooter>
                    </Card>
                ))}
                </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

    