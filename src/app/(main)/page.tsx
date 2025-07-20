import { services } from "@/lib/services";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
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
                <Card key={service.id} className="flex flex-col overflow-hidden group transform transition-all duration-300 hover:scale-105 hover:shadow-primary/20 hover:shadow-lg">
                  <CardHeader className="p-0">
                    <Image
                      src={service.images[0].src}
                      alt={service.images[0].alt}
                      width={600}
                      height={400}
                      className="w-full h-48 object-cover"
                      data-ai-hint={service.images[0].hint}
                    />
                  </CardHeader>
                  <CardContent className="flex-grow p-6">
                    <CardTitle className="text-xl font-bold mb-2">{service.title}</CardTitle>
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
