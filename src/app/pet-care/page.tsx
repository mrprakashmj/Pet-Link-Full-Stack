import Link from "next/link";
import Image from "next/image";
import { articles } from "@/lib/data";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export default function PetCarePage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold font-headline">Pet Care Library</h1>
        <p className="text-muted-foreground mt-2">
          Your resource for a happy and healthy pet.
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <Card key={article.slug} className="flex flex-col group">
            <CardHeader className="p-0">
              <Link href={`/pet-care/${article.slug}`}>
                <Image
                  src={article.image}
                  alt={article.title}
                  width={400}
                  height={225}
                  className="rounded-t-lg object-cover aspect-video transition-transform group-hover:scale-105"
                  data-ai-hint={`${article.category.toLowerCase()} pet`}
                />
              </Link>
            </CardHeader>
            <CardContent className="p-6 flex-grow">
              <Badge variant="outline" className="mb-2">{article.category}</Badge>
              <CardTitle className="font-headline text-lg mb-2">
                <Link href={`/pet-care/${article.slug}`} className="hover:text-primary">
                  {article.title}
                </Link>
              </CardTitle>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {article.summary}
              </p>
            </CardContent>
            <CardFooter className="p-6 pt-0 flex justify-between items-center text-xs text-muted-foreground">
              <span>{article.readingTime}</span>
              <Link href={`/pet-care/${article.slug}`} className="flex items-center gap-1 text-primary font-semibold">
                Read More <ArrowRight className="h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
