import { Search, HelpCircle, MessageCircle, BookOpen, Settings, CreditCard, Shield, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

export const HelpCenter = () => {
  const categories = [
    {
      icon: <User className="h-6 w-6" />,
      title: "Getting Started",
      description: "Learn the basics of using ToolShare",
      articles: [
        { title: "Creating an Account", link: "#" },
        { title: "Verifying Your Identity", link: "#" },
        { title: "Setting Up Your Profile", link: "#" },
        { title: "Finding Tools Near You", link: "#" }
      ]
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Borrowing Tools",
      description: "Everything about borrowing tools",
      articles: [
        { title: "How to Borrow a Tool", link: "#" },
        { title: "Understanding Fees", link: "#" },
        { title: "Insurance Coverage", link: "#" },
        { title: "Returning Tools", link: "#" }
      ]
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Sharing Tools",
      description: "Guide to sharing your tools",
      articles: [
        { title: "Listing Your Tools", link: "#" },
        { title: "Setting Your Terms", link: "#" },
        { title: "Managing Requests", link: "#" },
        { title: "Getting Paid", link: "#" }
      ]
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Safety & Trust",
      description: "Keeping our community safe",
      articles: [
        { title: "Safety Guidelines", link: "/safety" },
        { title: "User Verification", link: "#" },
        { title: "Reporting Issues", link: "#" },
        { title: "Insurance Claims", link: "#" }
      ]
    }
  ];

  const popularQuestions = [
    {
      question: "How do I verify my account?",
      answer: "To verify your account, you'll need to provide a valid government ID and proof of address. This helps us maintain a safe community for all users."
    },
    {
      question: "What happens if a tool is damaged?",
      answer: "If a tool is damaged during use, please report it immediately through the platform. Our insurance coverage will help protect both the lender and borrower."
    },
    {
      question: "How are tool prices determined?",
      answer: "Tool owners set their own prices based on the tool's value, condition, and market rates. You can find similar tools to compare prices."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through our platform."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block p-3 rounded-full bg-primary/10 mb-4">
            <HelpCircle className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">How can we help you?</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Find answers to common questions or contact our support team for assistance.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for help..."
                className="pl-12 pr-4 py-6 text-lg border-2 focus:border-primary rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {categories.map((category, index) => (
            <div key={index} className="bg-card rounded-lg p-6 border shadow-sm">
              <div className="text-primary mb-4">{category.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
              <p className="text-muted-foreground mb-4">{category.description}</p>
              <ul className="space-y-2">
                {category.articles.map((article, articleIndex) => (
                  <li key={articleIndex}>
                    <Link to={article.link} className="text-sm text-primary hover:underline">
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Popular Questions */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Popular Questions</h2>
          <div className="space-y-6">
            {popularQuestions.map((qa, index) => (
              <div key={index} className="bg-card rounded-lg p-6 border">
                <h3 className="font-semibold mb-2">{qa.question}</h3>
                <p className="text-muted-foreground">{qa.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="text-center">
          <div className="inline-block p-3 rounded-full bg-primary/10 mb-4">
            <MessageCircle className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our support team is available 24/7 to assist you with any questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg">
                Contact Support
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              <BookOpen className="mr-2 h-5 w-5" />
              View Documentation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}; 