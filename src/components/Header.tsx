
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { PawPrint, Menu, X, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils";
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";


const navLinks = [
  { href: "/pets", label: "Find a Pet" },
  { href: "/community", label: "Community" },
  { href: "/pet-care", label: "Pet Care" },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      router.push('/');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: "Could not log you out. Please try again.",
      });
    }
  };

  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-40 w-full border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <PawPrint className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold font-headline text-primary-foreground">
            PetLink
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname.startsWith(link.href)
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
            {user ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                        <Avatar>
                            <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                            <AvatarFallback>{user.displayName?.charAt(0) || <User />}</AvatarFallback>
                        </Avatar>
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{user.displayName}</p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {user.email}
                            </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <>
                    <Button asChild>
                        <Link href="/login">
                            <LogIn className="mr-2 h-4 w-4" />
                            Sign In
                        </Link>
                    </Button>
                </>
            )}
            </div>
            <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                </Button>
                </SheetTrigger>
                <SheetContent side="right">
                <div className="p-4">
                    <div className="flex justify-between items-center mb-6">
                    <Link href="/" className="flex items-center gap-2">
                        <PawPrint className="h-8 w-8 text-primary" />
                        <span className="text-xl font-bold font-headline text-primary-foreground">
                            PetLink
                        </span>
                        </Link>
                    <SheetClose asChild>
                        <Button variant="ghost" size="icon">
                            <X className="h-6 w-6" />
                            <span className="sr-only">Close menu</span>
                        </Button>
                    </SheetClose>
                    </div>
                    <nav className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                        <SheetClose key={link.href} asChild>
                        <Link
                            href={link.href}
                            className={cn(
                            "text-lg font-medium transition-colors hover:text-primary",
                            pathname.startsWith(link.href)
                                ? "text-primary"
                                : "text-muted-foreground"
                            )}
                        >
                            {link.label}
                        </Link>
                        </SheetClose>
                    ))}
                    </nav>
                    <div className="mt-6 border-t pt-6">
                        {user ? (
                            <div className="flex flex-col gap-2">
                                 <div className="flex items-center gap-2">
                                    <Avatar>
                                        <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                                        <AvatarFallback>{user.displayName?.charAt(0) || <User />}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium">{user.displayName}</p>
                                        <p className="text-sm text-muted-foreground">{user.email}</p>
                                    </div>
                                </div>
                                <Button onClick={handleLogout} variant="outline">Log Out</Button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2">
                                <SheetClose asChild>
                                    <Button asChild>
                                      <Link href="/login">
                                        <LogIn className="mr-2 h-4 w-4" />
                                        Sign In
                                      </Link>
                                    </Button>
                                </SheetClose>
                            </div>
                        )}
                    </div>
                </div>
                </SheetContent>
            </Sheet>
            </div>
        </div>
      </div>
    </header>
  );
}
