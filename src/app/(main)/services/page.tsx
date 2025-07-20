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
