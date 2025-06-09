import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../lib/supabase';
import { Tool, FilterOptions } from '../types';

export const useTools = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'All Categories',
    location: 'All Locations',
    maxPrice: 100,
    condition: 'All Conditions',
    availability: 'All Times'
  });

  // Fetch tools from Supabase
  useEffect(() => {
    const fetchTools = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const { data, error: supabaseError } = await supabase
          .from('tools')
          .select('*')
          .order('created_at', { ascending: false });

        if (supabaseError) {
          throw supabaseError;
        }

        // Transform the data to match our Tool interface
        const transformedTools: Tool[] = data.map(tool => ({
          ...tool,
          contactEmail: tool.contact_email,
          contactPhone: tool.contact_phone,
          dateAdded: tool.created_at
        }));

        setTools(transformedTools);
      } catch (err) {
        console.error('Error fetching tools:', err);
        setError('Failed to load tools. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTools();
  }, []);

  // Get unique categories and locations from the data
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(tools.map(tool => tool.category)));
    return ['All Categories', ...uniqueCategories.sort()];
  }, [tools]);

  const locations = useMemo(() => {
    const uniqueLocations = Array.from(new Set(tools.map(tool => {
      // Extract city from location string (e.g., "Downtown Seattle, WA" -> "Seattle")
      const parts = tool.location.split(',');
      if (parts.length >= 2) {
        return parts[parts.length - 2].trim().replace(/^.*\s/, '');
      }
      return tool.location;
    })));
    return ['All Locations', ...uniqueLocations.sort()];
  }, [tools]);

  // Filter tools based on search query and filters
  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          tool.title.toLowerCase().includes(query) ||
          tool.description.toLowerCase().includes(query) ||
          tool.tags.some(tag => tag.toLowerCase().includes(query)) ||
          tool.owner.toLowerCase().includes(query);
        
        if (!matchesSearch) return false;
      }

      // Category filter
      if (filters.category !== 'All Categories' && tool.category !== filters.category) {
        return false;
      }

      // Location filter
      if (filters.location !== 'All Locations') {
        const locationMatch = tool.location.toLowerCase().includes(filters.location.toLowerCase());
        if (!locationMatch) return false;
      }

      // Price filter
      if (tool.price > filters.maxPrice) {
        return false;
      }

      // Condition filter
      if (filters.condition !== 'All Conditions' && tool.condition !== filters.condition.toLowerCase()) {
        return false;
      }

      return true;
    });
  }, [tools, searchQuery, filters]);

  const updateFilter = (key: keyof FilterOptions, value: string | number) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setSearchQuery('');
    setFilters({
      category: 'All Categories',
      location: 'All Locations',
      maxPrice: 100,
      condition: 'All Conditions',
      availability: 'All Times'
    });
  };

  // Function to add a new tool
  const addTool = async (toolData: Omit<Tool, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error: supabaseError } = await supabase
        .from('tools')
        .insert([{
          title: toolData.title,
          description: toolData.description,
          category: toolData.category,
          url: toolData.url,
          image: toolData.image,
          tags: toolData.tags,
          owner: toolData.owner,
          location: toolData.location,
          availability: toolData.availability,
          condition: toolData.condition,
          price: toolData.price,
          contact_email: toolData.contact_email,
          contact_phone: toolData.contact_phone
        }])
        .select()
        .single();

      if (supabaseError) {
        throw supabaseError;
      }

      // Add the new tool to the local state
      const newTool: Tool = {
        ...data,
        contactEmail: data.contact_email,
        contactPhone: data.contact_phone,
        dateAdded: data.created_at
      };

      setTools(prev => [newTool, ...prev]);
      return { success: true, data: newTool };
    } catch (err) {
      console.error('Error adding tool:', err);
      return { success: false, error: 'Failed to add tool. Please try again.' };
    }
  };

  return {
    tools: filteredTools,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    filters,
    updateFilter,
    clearFilters,
    totalTools: tools.length,
    filteredCount: filteredTools.length,
    categories,
    locations,
    addTool
  };
};