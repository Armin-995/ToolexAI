import { Shield, AlertCircle, Lock, Eye, Database, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const PrivacyPolicy = () => {
  const sections = [
    {
      icon: <Database className="h-6 w-6" />,
      title: "Information We Collect",
      content: [
        "Personal information (name, email, phone number, address)",
        "Payment information (processed securely through our payment providers)",
        "Profile information (profile picture, bio, preferences)",
        "Usage data (how you interact with our platform)",
        "Device information (browser type, IP address, device type)"
      ]
    },
    {
      icon: <Share2 className="h-6 w-6" />,
      title: "How We Use Your Information",
      content: [
        "To provide and maintain our service",
        "To process transactions and manage your account",
        "To communicate with you about your account and our services",
        "To improve our platform and user experience",
        "To ensure platform safety and prevent fraud",
        "To comply with legal obligations"
      ]
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Information Sharing",
      content: [
        "We share information with other users only as necessary to facilitate tool sharing",
        "We use trusted third-party services for payments, verification, and analytics",
        "We may share information with law enforcement when required by law",
        "We never sell your personal information to third parties"
      ]
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Your Rights",
      content: [
        "Access your personal information",
        "Correct inaccurate information",
        "Request deletion of your information",
        "Opt-out of marketing communications",
        "Export your data",
        "Object to certain processing of your data"
      ]
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Data Security",
      content: [
        "We use industry-standard encryption to protect your data",
        "Regular security audits and updates",
        "Limited access to personal information",
        "Secure data storage and transmission",
        "Regular backups and disaster recovery procedures"
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
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We take your privacy seriously. This policy explains how we collect, use, and protect your personal information.
          </p>
        </div>

        {/* Last Updated Notice */}
        <div className="bg-primary/5 rounded-lg p-6 mb-12 max-w-3xl mx-auto">
          <div className="flex items-start space-x-4">
            <AlertCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
            <div>
              <h2 className="font-semibold mb-2">Last Updated: March 15, 2024</h2>
              <p className="text-muted-foreground">
                This privacy policy was last updated on March 15, 2024. We may update this policy periodically to reflect changes in our practices or legal requirements.
              </p>
            </div>
          </div>
        </div>

        {/* Policy Sections */}
        <div className="max-w-3xl mx-auto space-y-8 mb-16">
          {sections.map((section, index) => (
            <div key={index} className="bg-card rounded-lg p-6 border">
              <div className="flex items-start space-x-4 mb-4">
                <div className="text-primary mt-1">{section.icon}</div>
                <h2 className="text-xl font-semibold">{section.title}</h2>
              </div>
              <ul className="space-y-2 ml-10">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-muted-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Cookie Policy */}
        <div className="bg-card rounded-lg p-6 border max-w-3xl mx-auto mb-16">
          <h2 className="text-xl font-semibold mb-4">Cookie Policy</h2>
          <p className="text-muted-foreground mb-4">
            We use cookies and similar technologies to improve your experience on our platform. These help us:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>Remember your preferences and settings</li>
            <li>Understand how you use our platform</li>
            <li>Provide personalized content and recommendations</li>
            <li>Improve our services and user experience</li>
            <li>Ensure platform security and prevent fraud</li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Questions About Your Privacy?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            If you have any questions about our privacy practices or would like to exercise your rights, please contact our privacy team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg">
                Contact Privacy Team
              </Button>
            </Link>
            <Link to="/terms">
              <Button variant="outline" size="lg">
                View Terms of Service
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}; 