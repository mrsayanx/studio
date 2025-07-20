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
