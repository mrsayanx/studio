"use client";

import { useState, useEffect } from 'react';
import { Service, getIconComponent } from "@/lib/services";
import { getServices } from '@/lib/firestore';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Skeleton } from '@/components/ui/skeleton';

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const servicesData = await getServices();
        setServices(servicesData);
      } catch (error) {
        console.error("Failed to fetch services from Firestore", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container py-12 md:py-24 lg:py-32">
        <div className="text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">All Services</h1>
            <p className="mt-3 max-w-2xl mx-auto text-muted-foreground md:text-xl">
            Explore our comprehensive range of digital solutions.
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
              {services.map((service) => {
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
    </div>
  );
}
