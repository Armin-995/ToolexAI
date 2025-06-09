import { Shield, AlertTriangle, CheckCircle, UserCheck, Wrench, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const SafetyGuidelines = () => {
  const guidelines = [
    {
      icon: <UserCheck className="h-6 w-6" />,
      title: "User Verification",
      description: "All users must verify their identity and provide valid contact information. We use secure third-party verification services to ensure community safety.",
      tips: [
        "Complete your profile with accurate information",
        "Verify your email and phone number",
        "Add a profile picture for better recognition"
      ]
    },
    {
      icon: <Wrench className="h-6 w-6" />,
      title: "Tool Safety",
      description: "Ensure all tools are in good working condition and meet safety standards. Regular maintenance and proper storage are essential.",
      tips: [
        "Inspect tools before and after each use",
        "Report any damage or safety concerns immediately",
        "Follow manufacturer's safety guidelines",
        "Keep tools clean and properly maintained"
      ]
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Borrowing Guidelines",
      description: "Clear communication and respect for time commitments are crucial for a positive sharing experience.",
      tips: [
        "Agree on pickup and return times in advance",
        "Return tools in the same condition you received them",
        "Communicate promptly about any issues or delays",
        "Respect the agreed-upon duration of use"
      ]
    },
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      title: "Insurance & Protection",
      description: "Our platform provides insurance coverage for shared tools and liability protection for all users.",
      tips: [
        "Review our insurance coverage details",
        "Document tool condition before and after use",
        "Report any accidents or incidents immediately",
        "Keep records of all transactions"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block p-3 rounded-full bg-primary/10 mb-4">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Safety Guidelines</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your safety and the security of shared tools are our top priorities. Follow these guidelines to ensure a safe and positive experience for everyone.
          </p>
        </div>

        {/* Guidelines Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {guidelines.map((guideline, index) => (
            <div key={index} className="bg-card rounded-lg p-6 border shadow-sm">
              <div className="text-primary mb-4">{guideline.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{guideline.title}</h3>
              <p className="text-muted-foreground mb-4">{guideline.description}</p>
              <ul className="space-y-2">
                {guideline.tips.map((tip, tipIndex) => (
                  <li key={tipIndex} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Emergency Contact Section */}
        <div className="bg-primary/5 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Emergency Contacts</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-background rounded-lg p-6 border">
              <h3 className="font-semibold mb-2">Platform Support</h3>
              <p className="text-muted-foreground mb-4">
                For urgent platform-related issues or safety concerns
              </p>
              <div className="space-y-2">
                <p className="font-medium">Email: safety@toolshare.com</p>
                <p className="font-medium">Phone: (555) 123-4567</p>
                <p className="text-sm text-muted-foreground">Available 24/7</p>
              </div>
            </div>
            <div className="bg-background rounded-lg p-6 border">
              <h3 className="font-semibold mb-2">Insurance Claims</h3>
              <p className="text-muted-foreground mb-4">
                For reporting incidents and filing insurance claims
              </p>
              <div className="space-y-2">
                <p className="font-medium">Email: claims@toolshare.com</p>
                <p className="font-medium">Phone: (555) 987-6543</p>
                <p className="text-sm text-muted-foreground">Available 24/7</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Have Questions?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our support team is here to help you with any safety concerns or questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/help">
              <Button size="lg">
                Visit Help Center
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}; 