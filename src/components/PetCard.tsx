import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Pet } from "@/lib/types";
import { MapPin, Dog, Cat, Bird } from "lucide-react";

type PetCardProps = {
  pet: Pet;
};

const speciesIcon = {
  Dog: <Dog className="h-4 w-4" />,
  Cat: <Cat className="h-4 w-4" />,
  Other: <Bird className="h-4 w-4" />,
};

export function PetCard({ pet }: PetCardProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col group transition-all hover:shadow-xl hover:-translate-y-1">
      <Link href={`/pets/${pet.id}`} className="block h-full">
        <div className="relative">
          <Image
            src={pet.images[0]}
            alt={`A photo of ${pet.name}`}
            width={400}
            height={300}
            className="w-full h-48 object-cover transition-transform group-hover:scale-105"
            data-ai-hint={`${pet.species.toLowerCase()} ${pet.breed.toLowerCase()}`}
          />
           <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">{pet.status}</Badge>
        </div>
        <CardContent className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-bold font-headline">{pet.name}</h3>
          <p className="text-sm text-muted-foreground">{pet.breed}</p>
          <div className="flex items-center text-xs text-muted-foreground mt-2">
            <MapPin className="h-3 w-3 mr-1" />
            <span>{pet.location}</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <Badge variant="secondary" className="flex items-center gap-1">
              {speciesIcon[pet.species]}
              {pet.species}
            </Badge>
            <Badge variant="secondary">{pet.age}</Badge>
            <Badge variant="secondary">{pet.size}</Badge>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
