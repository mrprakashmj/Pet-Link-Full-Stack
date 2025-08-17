
"use client";

import { getPets } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Dog,
  Cat,
  Bird,
  Heart,
  Calendar,
  Ruler,
  BarChart,
  Stethoscope,
  Syringe,
  AlertTriangle,
  Smile,
  Frown,
  HelpCircle,
  Phone,
  Mail,
  Globe,
  MapPin,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const speciesIcon = {
  Dog: <Dog className="h-5 w-5" />,
  Cat: <Cat className="h-5 w-5" />,
  Other: <Bird className="h-5 w-5" />,
};

const compatibilityIcons = {
    Good: <Smile className="h-5 w-5 text-green-600" />,
    'Not Good': <Frown className="h-5 w-5 text-red-600" />,
    Unknown: <HelpCircle className="h-5 w-5 text-muted-foreground" />,
}

export default function PetDetailPage() {
  const { toast } = useToast();
  const params = useParams();
  const id = params.id as string;
  const pets = getPets();
  const pet = pets.find((p) => p.id === id);
  if (!pet) {
    notFound();
  }

  const handleAdopt = () => {
    toast({
        title: "Adoption Process Started!",
        description: `Your adoption request for ${pet.name} has been received.`,
    })
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-0">
              <Carousel className="w-full">
                <CarouselContent>
                  {pet.images.map((src, index) => (
                    <CarouselItem key={index}>
                      <Image
                        src={src}
                        alt={`Photo of ${pet.name} ${index + 1}`}
                        width={800}
                        height={600}
                        className="w-full h-auto aspect-[4/3] object-cover rounded-t-lg"
                        data-ai-hint={`${pet.species.toLowerCase()} ${pet.breed.toLowerCase()}`}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">About {pet.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{pet.description}</p>
              <Separator className="my-6" />
              <h4 className="font-semibold mb-4">Buddy's Story</h4>
              <p className="text-muted-foreground">{pet.story}</p>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-1 space-y-8">
            <div>
                <h1 className="text-4xl font-bold font-headline">{pet.name}</h1>
                <p className="text-lg text-muted-foreground">{pet.breed}</p>
                <Badge className="mt-2 text-base">{pet.status}</Badge>
                <Button onClick={handleAdopt} size="lg" className="w-full mt-6 bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Heart className="mr-2 h-5 w-5" /> Adopt {pet.name}
                </Button>
            </div>
            
            <Card>
                 <CardHeader>
                    <CardTitle className="font-headline text-lg">Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                    <div className="flex justify-between">
                        <span className="font-medium text-muted-foreground flex items-center gap-2">{speciesIcon[pet.species]} Species</span>
                        <span>{pet.species}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-muted-foreground flex items-center gap-2"><Calendar className="h-5 w-5" /> Age</span>
                        <span>{pet.age}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-muted-foreground flex items-center gap-2"><Ruler className="h-5 w-5" /> Size</span>
                        <span>{pet.size}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-muted-foreground flex items-center gap-2"><BarChart className="h-5 w-5" /> Energy Level</span>
                        <span>{pet.energyLevel}</span>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-lg">Health & Compatibility</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                     <div className="flex justify-between">
                        <span className="font-medium text-muted-foreground flex items-center gap-2"><Stethoscope className="h-5 w-5" /> Medical</span>
                        <span>{pet.medicalHistory}</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="font-medium text-muted-foreground flex items-center gap-2"><Syringe className="h-5 w-5" /> Vaccinations</span>
                        <span>{pet.vaccinationStatus}</span>
                    </div>
                    {pet.specialNeeds.length > 0 &&
                        <div className="flex justify-between">
                            <span className="font-medium text-muted-foreground flex items-center gap-2"><AlertTriangle className="h-5 w-5" /> Special Needs</span>
                            <span>{pet.specialNeeds.join(', ')}</span>
                        </div>
                    }
                    <Separator />
                    <div className="flex justify-between">
                        <span className="font-medium text-muted-foreground">Good with children?</span>
                        <span>{compatibilityIcons[pet.compatibility.withChildren]}</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="font-medium text-muted-foreground">Good with other pets?</span>
                        <span>{compatibilityIcons[pet.compatibility.withPets]}</span>
                    </div>
                </CardContent>
            </Card>

        </div>
      </div>
    </div>
  );
}
