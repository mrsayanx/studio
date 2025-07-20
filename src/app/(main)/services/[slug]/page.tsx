import { services } from "@/lib/services";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
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
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <Carousel className="w-full">
            <CarouselContent>
              {service.images.map((image, index) => (
                <CarouselItem key={index}>
                  <Card>
                    <CardContent className="p-0">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={600}
                        height={400}
                        className="rounded-lg object-cover w-full h-auto aspect-[3/2]"
                        data-ai-hint={image.hint}
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>
        <div>
          <h1 className="text-4xl font-bold font-headline mb-4">{service.title}</h1>
          <p className="text-2xl font-semibold text-primary mb-6">{service.price}</p>
          <div className="prose prose-invert max-w-none text-muted-foreground mb-6">
            <p>{service.description}</p>
          </div>
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">What's Included:</h3>
            <ul className="space-y-2">
              {service.highlights.map((highlight, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
          <Button asChild size="lg" className="w-full md:w-auto">
            <Link href="https://wa.me/918345805877" target="_blank">Book Now</Link>
          </Button>
        </div>
      </div>

      <div className="mt-24">
        <h2 className="text-3xl font-bold text-center mb-12 font-headline">Related Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedServices.map((relatedService) => (
                <Card key={relatedService.id} className="flex flex-col overflow-hidden group transform transition-all duration-300 hover:scale-105 hover:shadow-primary/20 hover:shadow-lg">
                  <CardHeader className="p-0">
                    <Image
                      src={relatedService.images[0].src}
                      alt={relatedService.images[0].alt}
                      width={600}
                      height={400}
                      className="w-full h-48 object-cover"
                      data-ai-hint={relatedService.images[0].hint}
                    />
                  </CardHeader>
                  <CardContent className="flex-grow p-6">
                    <CardTitle className="text-xl font-bold mb-2">{relatedService.title}</CardTitle>
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
