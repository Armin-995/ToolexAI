import { ScrollText, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const TermsOfService = () => {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing and using ToolShare, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site."
    },
    {
      title: "2. User Accounts",
      content: "To use certain features of ToolShare, you must register for an account. You agree to provide accurate and complete information during registration and to keep your account information updated. You are responsible for maintaining the security of your account and password."
    },
    {
      title: "3. Tool Sharing Guidelines",
      content: "Users who share tools must ensure they are in good working condition and meet safety standards. Borrowers must use tools responsibly and return them in the same condition. Any damage or issues must be reported immediately."
    },
    {
      title: "4. Payment and Fees",
      content: "ToolShare charges a service fee for each transaction. Payment processing is handled securely through our platform. Users agree to pay all applicable fees and charges associated with their use of the service."
    },
    {
      title: "5. Insurance and Liability",
      content: "ToolShare provides insurance coverage for shared tools. However, users are responsible for their own safety and must follow all safety guidelines. We are not liable for any injuries or damages that occur during tool use."
    },
    {
      title: "6. User Conduct",
      content: "Users must not engage in any activity that violates laws or regulations, infringes on others' rights, or disrupts the service. This includes but is not limited to fraud, harassment, and unauthorized access."
    },
    {
      title: "7. Content and Intellectual Property",
      content: "Users retain ownership of their content but grant ToolShare a license to use it for service provision. All platform content, including logos and design, is owned by ToolShare and protected by intellectual property laws."
    },
    {
      title: "8. Termination",
      content: "We reserve the right to terminate or suspend accounts that violate these terms. Users may terminate their account at any time, but must fulfill any outstanding obligations."
    },
    {
      title: "9. Changes to Terms",
      content: "We may modify these terms at any time. Users will be notified of significant changes. Continued use of the service after changes constitutes acceptance of the new terms."
    },
    {
      title: "10. Governing Law",
      content: "These terms are governed by the laws of the state of California. Any disputes shall be resolved in the courts of San Francisco County, California."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block p-3 rounded-full bg-primary/10 mb-4">
            <ScrollText className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Please read these terms carefully before using ToolShare. By using our service, you agree to these terms.
          </p>
        </div>

        {/* Last Updated Notice */}
        <div className="bg-primary/5 rounded-lg p-6 mb-12 max-w-3xl mx-auto">
          <div className="flex items-start space-x-4">
            <AlertCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
            <div>
              <h2 className="font-semibold mb-2">Last Updated: March 15, 2024</h2>
              <p className="text-muted-foreground">
                These terms were last updated on March 15, 2024. We recommend reviewing them periodically for any changes.
              </p>
            </div>
          </div>
        </div>

        {/* Terms Sections */}
        <div className="max-w-3xl mx-auto space-y-8 mb-16">
          {sections.map((section, index) => (
            <div key={index} className="bg-card rounded-lg p-6 border">
              <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Questions About Our Terms?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            If you have any questions about these terms, please contact our legal team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg">
                Contact Legal Team
              </Button>
            </Link>
            <Link to="/privacy">
              <Button variant="outline" size="lg">
                View Privacy Policy
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}; 