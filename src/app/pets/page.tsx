
"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { PetCard } from "@/components/PetCard";
import { FilterSidebar, type Filters } from "@/components/FilterSidebar";
import { getPets } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PawPrint } from "lucide-react";

const initialFilters: Filters = {
  species: 'All',
  age: 'All',
  size: 'All',
  location: '',
};

export default function PetsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pets = getPets();
  
  const getFiltersFromParams = (): Filters => ({
    species: searchParams.get('species') || 'All',
    age: searchParams.get('age') || 'All',
    size: searchParams.get('size') || 'All',
    location: searchParams.get('location') || '',
  });

  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || "");
  const [filters, setFilters] = useState<Filters>(getFiltersFromParams());
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || "name-asc");

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('q', searchTerm);
    if (filters.species !== 'All') params.set('species', filters.species);
    if (filters.age !== 'All') params.set('age', filters.age);
    if (filters.size !== 'All') params.set('size', filters.size);
    if (filters.location) params.set('location', filters.location);
    if (sortBy !== 'name-asc') params.set('sortBy', sortBy);

    router.replace(`${pathname}?${params.toString()}`);
  }, [searchTerm, filters, sortBy, router, pathname]);

  const handleFilterChange = (name: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    setSearchTerm("");
    setSortBy("name-asc");
  };

  const filteredPets = useMemo(() => {
    let tempPets = [...pets];

    // Search term filtering
    if (searchTerm) {
      tempPets = tempPets.filter(pet =>
        pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.breed.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sidebar filters
    if (filters.species !== 'All') {
      tempPets = tempPets.filter(pet => pet.species === filters.species);
    }
    if (filters.size !== 'All') {
      tempPets = tempPets.filter(pet => pet.size === filters.size);
    }
    if (filters.location) {
      tempPets = tempPets.filter(pet =>
        pet.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    if (filters.age !== 'All') {
        tempPets = tempPets.filter(pet => {
            const ageNum = parseInt(pet.age);
            if(filters.age === 'Puppy/Kitten') return ageNum < 1;
            if(filters.age === 'Young') return ageNum >= 1 && ageNum <=3;
            if(filters.age === 'Adult') return ageNum > 3 && ageNum <= 7;
            if(filters.age === 'Senior') return ageNum > 7;
            return true;
        });
    }

    // Sorting
    tempPets.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'age-asc':
          return parseInt(a.age) - parseInt(b.age);
        case 'age-desc':
          return parseInt(b.age) - parseInt(a.age);
        default:
          return 0;
      }
    });

    return tempPets;
  }, [searchTerm, filters, sortBy, pets]);

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold font-headline">Find a Pet</h1>
        <p className="text-muted-foreground mt-2">
          Your new best friend is waiting for you.
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <FilterSidebar filters={filters} onFilterChange={handleFilterChange} onReset={resetFilters} />
        </aside>
        <main className="md:col-span-3">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6 p-4 border rounded-lg bg-card">
            <div className="relative w-full sm:w-auto sm:flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by name or breed..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
                <label htmlFor="sort-by" className="text-sm font-medium text-muted-foreground">Sort by:</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger id="sort-by" className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                        <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                        <SelectItem value="age-asc">Age (Youngest)</SelectItem>
                        <SelectItem value="age-desc">Age (Oldest)</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </div>

          {filteredPets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPets.map((pet) => (
                <PetCard key={pet.id} pet={pet} />
              ))}
            </div>
          ) : (
            <Alert className="mt-8">
                <PawPrint className="h-4 w-4" />
                <AlertTitle>No Pets Found</AlertTitle>
                <AlertDescription>
                    No pets matched your current search criteria. Try adjusting your filters or search term.
                </AlertDescription>
            </Alert>
          )}
        </main>
      </div>
    </div>
  );
}
