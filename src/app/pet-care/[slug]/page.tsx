import { articles } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Clock } from "lucide-react";

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 md:px-6 py-8 md:py-12">
      <article>
        <header className="mb-8">
          <Badge variant="outline" className="mb-4">{article.category}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold font-headline mb-4">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={article.publishedDate}>{article.publishedDate}</time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{article.readingTime}</span>
            </div>
          </div>
        </header>
        <Image
          src={article.image}
          alt={article.title}
          width={1200}
          height={675}
          className="rounded-lg mb-8 aspect-video object-cover"
          data-ai-hint={`${article.category.toLowerCase()} pet`}
        />
        <div className="prose prose-lg max-w-none prose-p:text-foreground/80 prose-headings:font-headline prose-headings:text-foreground">
          <p className="lead text-xl text-foreground mb-6">{article.summary}</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            euismod, nisl nec ultricies lacinia, nisl nisl aliquet nisl, eget
            aliquet nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies
            lacinia, nisl nisl aliquet nisl, eget aliquet nisl nisl sit amet
            nisl.
          </p>
          <h2>Sub-heading for the Article</h2>
          <p>
            Vivamus luctus urna sed urna ultricies ac tempor dui sagittis. In
            condimentum facilisis porta. Sed nec diam eu diam mattis viverra.
            Nulla fringilla, orci ac euismod semper, magna diam porttitor
            mauris, quis sollicitudin sapien justo in libero. Vestibulum mollis
            mauris enim. Morbi euismod magna ac lorem rutrum elementum. Donec
            viverra, magna vitae semper egestas, arcu justo rhoncus metus, vitae
            suscipit erat nisi et dolor.
          </p>
          <ul>
            <li>First list item for demonstration.</li>
            <li>Second list item with more text.</li>
            <li>Third, but certainly not last.</li>
          </ul>
           <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>
        </div>
      </article>
    </div>
  );
}
