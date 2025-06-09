import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { FilterX } from 'lucide-react';
import { FilterOptions } from '../../types';

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (key: keyof FilterOptions, value: string | number) => void;
  onClearFilters: () => void;
  resultCount: number;
  categories: string[];
  locations: string[];
}

export const FilterBar = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  resultCount,
  categories,
  locations 
}: FilterBarProps) => {
  return (
    <div className="bg-muted/30 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
          {/* Filter Controls */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 flex-1">
            {/* Category Filter */}
            <div className="min-w-[180px]">
              <Select
                value={filters.category}
                onValueChange={(value) => onFilterChange('category', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location Filter */}
            <div className="min-w-[180px]">
              <Select
                value={filters.location}
                onValueChange={(value) => onFilterChange('location', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Condition Filter */}
            <div className="min-w-[160px]">
              <Select
                value={filters.condition}
                onValueChange={(value) => onFilterChange('condition', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Conditions">All Conditions</SelectItem>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                  <SelectItem value="needs-repair">Needs Repair</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Price Range */}
            <div className="min-w-[200px] space-y-2">
              <div className="text-sm font-medium">Max Price: ${filters.maxPrice}/day</div>
              <Slider
                value={[filters.maxPrice]}
                onValueChange={(value) => onFilterChange('maxPrice', value[0])}
                max={100}
                min={0}
                step={5}
                className="w-full"
              />
            </div>
          </div>

          {/* Results and Clear */}
          <div className="flex items-center justify-between sm:justify-end space-x-4">
            <div className="text-sm text-muted-foreground">
              {resultCount} tool{resultCount !== 1 ? 's' : ''} found
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              className="flex items-center space-x-2"
            >
              <FilterX className="h-4 w-4" />
              <span>Clear</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};