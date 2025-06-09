import { useState } from 'react';
import { FilterBar } from '@/components/search/FilterBar';
import { ToolGrid } from '@/components/tools/ToolGrid';
import { ToolModal } from '@/components/tools/ToolModal';
import { useTools } from '@/hooks/useTools';
import { Tool, ViewMode } from '@/types';

export const BrowseTools = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  
  const {
    tools,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    filters,
    updateFilter,
    clearFilters,
    filteredCount,
    categories,
    locations
  } = useTools();

  const handleViewDetails = (tool: Tool) => {
    setSelectedTool(tool);
  };

  const closeModal = () => {
    setSelectedTool(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Browse Tools</h1>
        
        <FilterBar
          filters={filters}
          onFilterChange={updateFilter}
          onClearFilters={clearFilters}
          resultCount={filteredCount}
          categories={categories}
          locations={locations}
        />
        
        <div className="mt-8">
          <ToolGrid
            tools={tools}
            viewMode={viewMode}
            isLoading={isLoading}
            error={error}
            onViewDetails={handleViewDetails}
          />
        </div>
      </div>

      <ToolModal
        tool={selectedTool}
        isOpen={!!selectedTool}
        onClose={closeModal}
      />
    </div>
  );
}; 