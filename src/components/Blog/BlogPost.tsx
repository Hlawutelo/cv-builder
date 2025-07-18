import React from 'react';
import { BlogPost as BlogPostType } from '../../types/cv';
import { ArrowLeft, Clock, User, Calendar, Share2 } from 'lucide-react';

interface BlogPostProps {
  post: BlogPostType;
  onBack: () => void;
}

export const BlogPost: React.FC<BlogPostProps> = ({ post, onBack }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'job-application': return 'bg-blue-100 text-blue-800';
      case 'career-guide': return 'bg-green-100 text-green-800';
      case 'interview-tips': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'job-application': return 'Job Application';
      case 'career-guide': return 'Career Guide';
      case 'interview-tips': return 'Interview Tips';
      default: return category;
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Blog
      </button>

      {/* Article Header */}
      <header className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(post.category)}`}>
            {getCategoryLabel(post.category)}
          </span>
          <button
            onClick={handleShare}
            className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Share2 className="w-4 h-4 mr-1" />
            Share
          </button>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {post.title}
        </h1>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              {post.author}
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {post.readTime} min read
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="bg-white rounded-lg shadow-sm p-8">
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ 
            __html: post.content
              .replace(/\n/g, '<br>')
              .replace(/## (.*?)(<br>|$)/g, '<h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">$1</h2>')
              .replace(/### (.*?)(<br>|$)/g, '<h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">$1</h3>')
              .replace(/# (.*?)(<br>|$)/g, '<h1 class="text-3xl font-bold text-gray-900 mt-8 mb-6">$1</h1>')
              .replace(/- (.*?)(<br>|$)/g, '<li class="mb-2">$1</li>')
              .replace(/❌ (.*?)(<br>|$)/g, '<div class="bg-red-50 border-l-4 border-red-400 p-4 mb-4"><p class="text-red-700">❌ $1</p></div>')
              .replace(/✅ (.*?)(<br>|$)/g, '<div class="bg-green-50 border-l-4 border-green-400 p-4 mb-4"><p class="text-green-700">✅ $1</p></div>')
          }}
        />
      </article>

      {/* Related Articles */}
      <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Continue Reading</h3>
        <p className="text-gray-600">
          Explore more career advice and job search tips in our blog section.
        </p>
        <button
          onClick={onBack}
          className="mt-4 text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          View All Articles →
        </button>
      </div>
    </div>
  );
};