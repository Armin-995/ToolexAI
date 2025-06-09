import { ToolCard } from './ToolCard';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage } from '../ui/ErrorMessage';
import { Tool, ViewMode } from '../../types';

interface ToolGridProps {
  tools: Tool[];
  viewMode: ViewMode;
  isLoading: boolean;
  error: string | null;
  onViewDetails: (tool: Tool) => void;
}

export const ToolGrid = ({ tools, viewMode, isLoading, error, onViewDetails }: ToolGridProps) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (tools.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔧</div>
        <h3 className="text-lg font-semibold mb-2">No tools found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search criteria or filters to find more tools.
        </p>
      </div>
    );
  }

  const gridClasses = viewMode === 'grid' 
    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
    : 'space-y-4';

  return (
    <div className={gridClasses}>
      {tools.map((tool) => (
        <ToolCard
          key={tool.id}
          tool={tool}
          viewMode={viewMode}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};