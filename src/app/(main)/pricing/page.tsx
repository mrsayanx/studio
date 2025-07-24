"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { initialPricingPlans, PricingPlan } from '@/lib/services';
import { Skeleton } from '@/components/ui/skeleton';

const PRICING_STORAGE_KEY = 'tekitto_pricing_plans';

export default function PricingPage() {
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedPricing = localStorage.getItem(PRICING_STORAGE_KEY);
      if (storedPricing && storedPricing !== '[]') {
        setPricingPlans(JSON.parse(storedPricing));
      } else {
        setPricingPlans(initialPricingPlans);
      }
    } catch (error) {
      console.error("Failed to parse pricing from localStorage", error);
      setPricingPlans(initialPricingPlans);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-4xl mx-auto w-full">
                {pricingPlans.map(plan => (
                  <Card key={plan.id} className={`p-8 text-left transform transition-all duration-300 hover:scale-105 ${plan.isPopular ? 'border-2 border-primary shadow-primary/20 shadow-lg relative' : 'hover:border-primary'}`}>
                    {plan.isPopular && <div className="absolute top-0 right-4 -mt-4 bg-primary text-primary-foreground px-3 py-1 text-sm font-bold rounded-full">MOST POPULAR</div>}
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold">{plan.title}</CardTitle>
                      <p className={`text-4xl font-bold mt-2 ${plan.isPopular ? 'text-primary' : ''}`}>{plan.price}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-2 text-muted-foreground">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2"><CheckCircle2 className="text-primary w-5 h-5" /> {feature}</li>
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
  );
}
