import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/lib/auth';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

export const ShareTool = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    location: '',
    condition: '',
    price: '',
    images: [] as File[],
    tags: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    try {
      // Upload images first
      const imageUrls = await Promise.all(
        formData.images.map(async (file) => {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Math.random()}.${fileExt}`;
          const { data, error } = await supabase.storage
            .from('tool-images')
            .upload(fileName, file);

          if (error) throw error;
          return supabase.storage.from('tool-images').getPublicUrl(data.path).data.publicUrl;
        })
      );

      // Create tool record
      const { data: tool, error } = await supabase
        .from('tools')
        .insert([
          {
            title: formData.name,
            category: formData.category,
            description: formData.description,
            location: formData.location,
            condition: formData.condition,
            price: parseFloat(formData.price),
            images: imageUrls,
            tags: formData.tags.split(',').map(tag => tag.trim()),
            owner_id: user.id,
            owner_email: user.email,
            contact_email: user.email,
            status: 'available'
          }
        ])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Tool Shared Successfully! 🎉",
        description: "Your tool has been listed and is now available for borrowing.",
      });

      navigate(`/browse?tool=${tool.id}`);
    } catch (error) {
      console.error('Error sharing tool:', error);
      toast({
        variant: "destructive",
        title: "Error Sharing Tool",
        description: "There was a problem sharing your tool. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Share Your Tool</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Tool Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Bosch Cordless Drill"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="power-tools">Power Tools</SelectItem>
                <SelectItem value="hand-tools">Hand Tools</SelectItem>
                <SelectItem value="garden-tools">Garden Tools</SelectItem>
                <SelectItem value="cleaning-tools">Cleaning Tools</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your tool, its features, and any relevant details..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Your neighborhood or area"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Daily Rate ($)</Label>
            <Input
              id="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="Enter daily rental rate"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="condition">Condition</Label>
            <Select
              value={formData.condition}
              onValueChange={(value) => setFormData({ ...formData, condition: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="like-new">Like New</SelectItem>
                <SelectItem value="good">Good</SelectItem>
                <SelectItem value="fair">Fair</SelectItem>
                <SelectItem value="poor">Poor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="e.g., cordless, battery-powered, professional"
            />
            <p className="text-sm text-muted-foreground">
              Add tags to help others find your tool
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="images">Images</Label>
            <Input
              id="images"
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                if (files.length > 5) {
                  toast({
                    variant: "destructive",
                    title: "Too Many Images",
                    description: "You can upload up to 5 images.",
                  });
                  return;
                }
                setFormData({ ...formData, images: files });
              }}
            />
            <p className="text-sm text-muted-foreground">
              Upload up to 5 images of your tool
            </p>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sharing Tool...
              </>
            ) : (
              'Share Tool'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}; 