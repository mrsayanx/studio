"use client";

import { useState, useEffect } from 'react';
import { Service, getIconComponent, initialServices } from "@/lib/services";
import { notFound, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [service, setService] = useState<Service | undefined>(undefined);
  const [relatedServices, setRelatedServices] = useState<Service[]>([]);

  useEffect(() => {
    if (!slug) return;
    
    const allServices = [...initialServices].map((s, i) => ({...s, id: `service_${i}`}));
    const currentService = allServices.find((s: Service) => s.slug === slug);
    
    if (currentService) {
      setService(currentService);
      const related = allServices.filter((s: Service) => s.id !== currentService.id).slice(0, 3);
      setRelatedServices(related);
    } else {
      notFound();
    }
    
  }, [slug]);

  if (!service) {
    // This will be handled by the top-level loading.tsx until service is found
    return null;
  }
  
  const Icon = getIconComponent(service.Icon);
  
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="grid md:grid-cols-5 gap-12 items-start">
        <div className="md:col-span-3">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
              <Icon className="h-8 w-8 text-primary" />
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
                    <CardTitle>What's Included:</CardTitle>
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

      {relatedServices.length > 0 && (
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12 font-headline">Related Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedServices.map((relatedService) => {
                const RelatedIcon = getIconComponent(relatedService.Icon);
                return (
                  <Card key={relatedService.id} className="flex flex-col overflow-hidden group transform transition-all duration-300 hover:scale-105 hover:shadow-primary/20 hover:shadow-lg text-center">
                    <CardHeader className="items-center p-6">
                      <div className="p-4 bg-primary/10 rounded-full mb-4 border border-primary/20">
                        <RelatedIcon className="h-8 w-8 text-primary" />
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
                )
              })}
          </div>
        </div>
      )}
    </div>
  );
}
