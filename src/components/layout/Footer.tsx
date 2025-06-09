import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

export const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">TS</span>
              </div>
              <span className="font-bold">ToolShare</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Share tools with your community. Save money, reduce waste, build connections.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="font-semibold">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <div><Link to="/browse" className="text-muted-foreground hover:text-foreground">Browse Tools</Link></div>
              <div><Link to="/share" className="text-muted-foreground hover:text-foreground">Share a Tool</Link></div>
              <div><Link to="/how-it-works" className="text-muted-foreground hover:text-foreground">How it Works</Link></div>
              <div><Link to="/safety" className="text-muted-foreground hover:text-foreground">Safety Guidelines</Link></div>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h3 className="font-semibold">Categories</h3>
            <div className="space-y-2 text-sm">
              <div><Link to="/browse?category=power-tools" className="text-muted-foreground hover:text-foreground">Power Tools</Link></div>
              <div><Link to="/browse?category=garden-tools" className="text-muted-foreground hover:text-foreground">Garden Tools</Link></div>
              <div><Link to="/browse?category=construction" className="text-muted-foreground hover:text-foreground">Construction</Link></div>
              <div><Link to="/browse?category=automotive" className="text-muted-foreground hover:text-foreground">Automotive</Link></div>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-3">
            <h3 className="font-semibold">Support</h3>
            <div className="space-y-2 text-sm">
              <div><Link to="/help" className="text-muted-foreground hover:text-foreground">Help Center</Link></div>
              <div><Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact Us</Link></div>
              <div><Link to="/terms" className="text-muted-foreground hover:text-foreground">Terms of Service</Link></div>
              <div><Link to="/privacy" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></div>
            </div>
          </div>
        </div>

        <Separator className="my-6" />
        
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; 2024 ToolShare. All rights reserved.</p>
          <p>Made with ❤️ for the community</p>
        </div>
      </div>
    </footer>
  );
};