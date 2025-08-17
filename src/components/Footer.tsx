import Link from "next/link";
import { PawPrint, Twitter, Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <PawPrint className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold font-headline text-primary-foreground">
                PetLink
              </span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Connecting loving families with rescue animals.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 font-headline">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/pets" className="text-muted-foreground hover:text-primary">Find a Pet</Link></li>
              <li><Link href="/community" className="text-muted-foreground hover:text-primary">Community</Link></li>
              <li><Link href="/pet-care" className="text-muted-foreground hover:text-primary">Pet Care</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 font-headline">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Donate</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Volunteer</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 font-headline">Follow Us</h4>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook /></Link>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} PetLink. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
