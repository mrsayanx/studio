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
