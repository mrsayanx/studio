import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { aboutUsContent } from "@/lib/content/about-us";

export default function AboutPage() {
  const { ourStory, ourMission, team } = aboutUsContent;

  return (
    <div className="container py-12 md:py-20">
      <section className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">About Tekitto</h1>
        <p className="text-lg text-muted-foreground">
          Meet the passionate team behind our digital solutions.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <div className="prose prose-invert max-w-none text-muted-foreground space-y-4">
            {ourStory.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
          <Image 
            src="https://placehold.co/600x400.png"
            alt="The Tekitto team working collaboratively"
            fill
            style={{ objectFit: 'cover' }}
            data-ai-hint="team collaboration"
          />
        </div>
      </section>

      <section className="mb-20">
         <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <div className="prose prose-invert max-w-none text-muted-foreground space-y-4">
             {ourMission.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center mb-12">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {team.map((member) => (
            <Card key={member.name} className="text-center transform transition-all duration-300 hover:scale-105 hover:shadow-primary/20">
              <CardHeader className="items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={member.image.src} alt={member.name} data-ai-hint={member.image.hint} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle>{member.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary font-semibold">{member.role}</p>
                <p className="text-muted-foreground mt-2 text-sm">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
