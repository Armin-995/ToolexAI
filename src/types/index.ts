export interface Tool {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string | null;
  image?: string | null;
  tags: string[];
  owner: string;
  location: string;
  availability: string;
  condition: 'excellent' | 'good' | 'fair' | 'needs-repair';
  price: number; // Price per day in dollars
  contact_email: string;
  contact_phone?: string | null;
  created_at: string;
  updated_at: string;
}

export interface FilterOptions {
  category: string;
  location: string;
  maxPrice: number;
  condition: string;
  availability: string;
}

export type ViewMode = 'grid' | 'list';