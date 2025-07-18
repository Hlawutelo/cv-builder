import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { apiService } from '../../services/api';
import { CV, BlogPost, CareerGuide } from '../../types/cv';
import { CVForm } from '../CV/CVForm';
import { CVPreview } from '../CV/CVPreview';
import { BlogList } from '../Blog/BlogList';
import { BlogPost as BlogPostComponent } from '../Blog/BlogPost';
import { CareerGuideList } from '../CareerGuide/CareerGuideList';
import { CareerGuideDetail } from '../CareerGuide/CareerGuideDetail';
import { Plus, FileText, LogOut, User, BookOpen, PenTool } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [cvs, setCvs] = useState<CV[]>([]);
  const [currentCV, setCurrentCV] = useState<CV | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState<'cv' | 'blog' | 'career-guide'>('cv');
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const [selectedCareerGuide, setSelectedCareerGuide] = useState<CareerGuide | null>(null);

  useEffect(() => {
    loadCVs();
  }, []);

  const loadCVs = async () => {
    try {
      setLoading(true);
      const data = await apiService.getCVs();
      setCvs(data);
      if (data.length > 0) {
        setCurrentCV(data[0]);
      }
    } catch (error) {
      console.error('Failed to load CVs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCV = async (cvData: CV) => {
    try {
      setSaving(true);
      let savedCV;
      
      if (currentCV?._id) {
        savedCV = await apiService.updateCV(currentCV._id, cvData);
      } else {
        savedCV = await apiService.createCV(cvData);
      }
      
      setCurrentCV(savedCV);
      await loadCVs();
    } catch (error) {
      console.error('Failed to save CV:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleCreateNewCV = () => {
    setCurrentCV(null);
    setActiveTab('form');
    setActiveSection('cv');
  };

  const handleSelectCV = (cv: CV) => {
    setCurrentCV(cv);
    setActiveTab('form');
    setActiveSection('cv');
  };

  const handleExportPDF = () => {
    if (!currentCV) return;
    
    // Simple PDF export using browser print
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const cvContent = document.getElementById('cv-content');
      if (cvContent) {
        printWindow.document.write(`
          <html>
            <head>
              <title>${currentCV.personalInfo.fullName} - CV</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
                .border-l-4 { border-left: 4px solid #3b82f6; }
                .pl-4 { padding-left: 1rem; }
                .mb-2 { margin-bottom: 0.5rem; }
                .mb-4 { margin-bottom: 1rem; }
                .mb-8 { margin-bottom: 2rem; }
                .text-3xl { font-size: 1.875rem; }
                .text-xl { font-size: 1.25rem; }
                .text-lg { font-size: 1.125rem; }
                .font-bold { font-weight: bold; }
                .font-semibold { font-weight: 600; }
                .text-blue-600 { color: #2563eb; }
                .text-gray-900 { color: #111827; }
                .text-gray-700 { color: #374151; }
                .text-gray-600 { color: #4b5563; }
                .text-gray-500 { color: #6b7280; }
                .border-b-2 { border-bottom: 2px solid #3b82f6; padding-bottom: 0.25rem; }
                .flex { display: flex; }
                .justify-between { justify-content: space-between; }
                .items-start { align-items: flex-start; }
                .space-y-6 > * + * { margin-top: 1.5rem; }
                .space-y-4 > * + * { margin-top: 1rem; }
                .flex-wrap { flex-wrap: wrap; }
                .gap-2 > * { margin-right: 0.5rem; margin-bottom: 0.5rem; }
                .bg-blue-100 { background-color: #dbeafe; }
                .text-blue-800 { color: #1e40af; }
                .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
                .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
                .rounded-full { border-radius: 9999px; }
                .text-sm { font-size: 0.875rem; }
                .leading-relaxed { line-height: 1.625; }
              </style>
            </head>
            <body>
              ${cvContent.innerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  const handleSelectBlogPost = (post: BlogPost) => {
    setSelectedBlogPost(post);
  };

  const handleBackToBlog = () => {
    setSelectedBlogPost(null);
  };

  const handleSelectCareerGuide = (guide: CareerGuide) => {
    setSelectedCareerGuide(guide);
  };

  const handleBackToCareerGuides = () => {
    setSelectedCareerGuide(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">CV Builder</h1>
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => setActiveSection('cv')}
                className={`flex items-center px-3 py-2 text-sm font-medium transition-colors ${
                  activeSection === 'cv'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <FileText className="w-4 h-4 mr-2" />
                CV Builder
              </button>
              <button
                onClick={() => setActiveSection('blog')}
                className={`flex items-center px-3 py-2 text-sm font-medium transition-colors ${
                  activeSection === 'blog'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <PenTool className="w-4 h-4 mr-2" />
                Blog
              </button>
              <button
                onClick={() => setActiveSection('career-guide')}
                className={`flex items-center px-3 py-2 text-sm font-medium transition-colors ${
                  activeSection === 'career-guide'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Career Guides
              </button>
            </nav>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-700">
                <User className="w-4 h-4 mr-2" />
                {user?.name}
              </div>
              <button
                onClick={logout}
                className="flex items-center px-3 py-2 text-sm text-gray-700 hover:text-gray-900"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeSection === 'cv' && (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <button
                  onClick={handleCreateNewCV}
                  className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mb-4"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New CV
                </button>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Your CVs</h3>
                  {loading ? (
                    <p className="text-sm text-gray-500">Loading...</p>
                  ) : cvs.length === 0 ? (
                    <p className="text-sm text-gray-500">No CVs yet</p>
                  ) : (
                    cvs.map((cv) => (
                      <button
                        key={cv._id}
                        onClick={() => handleSelectCV(cv)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          currentCV?._id === cv._id
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {cv.personalInfo.fullName || 'Untitled CV'}
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Tabs */}
              <div className="bg-white rounded-lg shadow-sm mb-6">
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8 px-6">
                    <button
                      onClick={() => setActiveTab('form')}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'form'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      Edit CV
                    </button>
                    <button
                      onClick={() => setActiveTab('preview')}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'preview'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      Preview
                    </button>
                  </nav>
                </div>
              </div>

              {/* Tab Content */}
              {activeTab === 'form' ? (
                <CVForm cv={currentCV} onSave={handleSaveCV} loading={saving} />
              ) : (
                <CVPreview cv={currentCV} onExportPDF={handleExportPDF} />
              )}
            </div>
          </div>
        )}

        {activeSection === 'blog' && (
          selectedBlogPost ? (
            <BlogPostComponent post={selectedBlogPost} onBack={handleBackToBlog} />
          ) : (
            <BlogList onSelectPost={handleSelectBlogPost} />
          )
        )}

        {activeSection === 'career-guide' && (
          selectedCareerGuide ? (
            <CareerGuideDetail guide={selectedCareerGuide} onBack={handleBackToCareerGuides} />
          ) : (
            <CareerGuideList onSelectGuide={handleSelectCareerGuide} />
          )
        )}
      </div>
    </div>
  );
};