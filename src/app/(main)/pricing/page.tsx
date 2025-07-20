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
