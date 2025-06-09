import { ArrowRight, Search, Share2, Handshake, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const HowItWorks = () => {
  const steps = [
    {
      icon: <Search className="h-8 w-8" />,
      title: "Find Tools",
      description: "Browse our extensive collection of tools shared by community members. Use filters to find exactly what you need.",
      action: "Browse Tools",
      actionLink: "/browse"
    },
    {
      icon: <Share2 className="h-8 w-8" />,
      title: "Share Your Tools",
      description: "List your tools to help others and earn community credits. Set your own terms and availability.",
      action: "Share a Tool",
      actionLink: "/share"
    },
    {
      icon: <Handshake className="h-8 w-8" />,
      title: "Connect & Borrow",
      description: "Connect with tool owners, arrange pickup or delivery, and borrow tools for your projects.",
      action: "Learn More",
      actionLink: "/safety"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Safe & Secure",
      description: "Our platform includes insurance coverage, user verification, and secure payment processing.",
      action: "Safety Guidelines",
      actionLink: "/safety"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">How ToolShare Works</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join our community of tool sharers and borrowers. Save money, reduce waste, and build connections in your neighborhood.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="bg-card rounded-lg p-6 border shadow-sm">
              <div className="text-primary mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground mb-4">{step.description}</p>
              <Link to={step.actionLink}>
                <Button variant="outline" className="w-full">
                  {step.action}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-primary/5 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Benefits of Tool Sharing</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">Save Money</div>
              <p className="text-muted-foreground">
                Borrow tools instead of buying them. Save hundreds on tools you only need occasionally.
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">Reduce Waste</div>
              <p className="text-muted-foreground">
                Share resources with your community. Reduce tool waste and promote sustainability.
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">Build Community</div>
              <p className="text-muted-foreground">
                Connect with neighbors, share skills, and build a stronger local community.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of community members who are already sharing tools and building connections.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/browse">
              <Button size="lg">
                Browse Tools
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/share">
              <Button variant="outline" size="lg">
                Share Your Tools
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}; 