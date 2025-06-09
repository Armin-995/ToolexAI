import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Star, ExternalLink } from 'lucide-react';
import { Tool, ViewMode } from '../../types';

interface ToolCardProps {
  tool: Tool;
  viewMode: ViewMode;
  onViewDetails: (tool: Tool) => void;
}

export const ToolCard = ({ tool, viewMode, onViewDetails }: ToolCardProps) => {
  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'good': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'fair': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default: return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  if (viewMode === 'list') {
    return (
      <Card className="flex flex-col sm:flex-row overflow-hidden hover:shadow-lg transition-shadow">
        <div className="sm:w-48 h-48 sm:h-auto overflow-hidden">
          <img
            src={tool.image || 'https://images.pexels.com/photos/209235/pexels-photo-209235.jpeg?auto=compress&cs=tinysrgb&w=400'}
            alt={tool.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div>
                <h3 className="text-lg font-semibold line-clamp-1">{tool.title}</h3>
                <p className="text-sm text-muted-foreground">{tool.category}</p>
              </div>
              <div className="flex flex-col sm:items-end gap-2">
                <div className="text-2xl font-bold text-primary">${tool.price}/day</div>
                <Badge className={getConditionColor(tool.condition)}>
                  {tool.condition}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 pt-0">
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {tool.description}
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="line-clamp-1">{tool.location}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>{tool.availability}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-3">
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-col">
                <p className="text-sm font-medium">{tool.owner}</p>
                <p className="text-xs text-muted-foreground">Listed {formatDate(tool.created_at)}</p>
              </div>
              <Button onClick={() => onViewDetails(tool)} size="sm">
                View Details
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardFooter>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 overflow-hidden">
        <img
          src={tool.image || 'https://images.pexels.com/photos/209235/pexels-photo-209235.jpeg?auto=compress&cs=tinysrgb&w=400'}
          alt={tool.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold line-clamp-1">{tool.title}</h3>
            <p className="text-sm text-muted-foreground">{tool.category}</p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-primary">${tool.price}/day</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {tool.description}
        </p>
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="line-clamp-1">{tool.location}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{tool.availability}</span>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <Badge className={getConditionColor(tool.condition)}>
            {tool.condition}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {formatDate(tool.created_at)}
          </span>
        </div>
      </CardContent>
      <CardFooter className="pt-3">
        <div className="flex justify-between items-center w-full">
          <p className="text-sm font-medium">{tool.owner}</p>
          <Button onClick={() => onViewDetails(tool)} size="sm">
            Details
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};