"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export type Filters = {
  species: string;
  age: string;
  size: string;
  location: string;
};

type FilterSidebarProps = {
  filters: Filters;
  onFilterChange: (name: keyof Filters, value: string) => void;
  onReset: () => void;
};

export function FilterSidebar({ filters, onFilterChange, onReset }: FilterSidebarProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Filter Pets</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="species">Species</Label>
          <Select value={filters.species} onValueChange={(value) => onFilterChange('species', value)}>
            <SelectTrigger id="species">
              <SelectValue placeholder="All Species" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Species</SelectItem>
              <SelectItem value="Dog">Dog</SelectItem>
              <SelectItem value="Cat">Cat</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Select value={filters.age} onValueChange={(value) => onFilterChange('age', value)}>
            <SelectTrigger id="age">
              <SelectValue placeholder="Any Age" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">Any Age</SelectItem>
              <SelectItem value="Puppy/Kitten">Puppy/Kitten</SelectItem>
              <SelectItem value="Young">Young</SelectItem>
              <SelectItem value="Adult">Adult</SelectItem>
              <SelectItem value="Senior">Senior</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="size">Size</Label>
           <Select value={filters.size} onValueChange={(value) => onFilterChange('size', value)}>
            <SelectTrigger id="size">
              <SelectValue placeholder="Any Size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">Any Size</SelectItem>
              <SelectItem value="Small">Small</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Large">Large</SelectItem>
              <SelectItem value="Extra Large">Extra Large</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input 
            id="location"
            placeholder="e.g. Sunnyvale, CA"
            value={filters.location}
            onChange={(e) => onFilterChange('location', e.target.value)}
          />
        </div>
        
        <Button onClick={onReset} variant="outline" className="w-full">
            <X className="mr-2 h-4 w-4" /> Reset Filters
        </Button>
      </CardContent>
    </Card>
  );
}
