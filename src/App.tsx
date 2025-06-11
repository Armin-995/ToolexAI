import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/hero/HeroSection';
import { FilterBar } from './components/search/FilterBar';
import { ToolGrid } from './components/tools/ToolGrid';
import { ToolModal } from './components/tools/ToolModal';
import { useTools } from './hooks/useTools';
import { Tool, ViewMode } from './types';
import { ShareTool } from './pages/ShareTool';
import { BrowseTools } from './pages/BrowseTools';
import { HowItWorks } from './pages/HowItWorks';
import { SafetyGuidelines } from './pages/SafetyGuidelines';
import { HelpCenter } from './pages/HelpCenter';
import { ContactUs } from './pages/ContactUs';
import { TermsOfService } from './pages/TermsOfService';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import './App.css';

function HomePage() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const {
    tools,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    filters,
    updateFilter,
    clearFilters,
    filteredCount,
    categories,
    locations
  } = useTools();

  // Initialize theme
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved === 'dark' || (!saved && prefersDark);
    
    setIsDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const handleThemeToggle = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newMode);
  };

  const handleViewDetails = (tool: Tool) => {
    setSelectedTool(tool);
  };

  const closeModal = () => {
    setSelectedTool(null);
  };

  return (
    <>
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        isDarkMode={isDarkMode}
        onThemeToggle={handleThemeToggle}
      />
      
      <main>
        {/* Show hero only when no search query */}
        {!searchQuery && (
          <HeroSection
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        )}
        
        <FilterBar
          filters={filters}
          onFilterChange={updateFilter}
          onClearFilters={clearFilters}
          resultCount={filteredCount}
          categories={categories}
          locations={locations}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ToolGrid
            tools={tools}
            viewMode={viewMode}
            isLoading={isLoading}
            error={error}
            onViewDetails={handleViewDetails}
          />
        </div>
      </main>

      <Footer />

      <ToolModal
        tool={selectedTool}
        isOpen={!!selectedTool}
        onClose={closeModal}
      />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse" element={<BrowseTools />} />
          <Route 
            path="/share" 
            element={
              <ProtectedRoute>
                <ShareTool />
              </ProtectedRoute>
            } 
          />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/safety" element={<SafetyGuidelines />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;