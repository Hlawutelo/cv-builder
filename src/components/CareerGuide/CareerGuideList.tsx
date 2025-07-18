import React from 'react';
import { careerGuides } from '../../data/careerGuides';
import { CareerGuide } from '../../types/cv';
import { BookOpen, ArrowRight, CheckCircle } from 'lucide-react';

interface CareerGuideListProps {
  onSelectGuide: (guide: CareerGuide) => void;
}

export const CareerGuideList: React.FC<CareerGuideListProps> = ({ onSelectGuide }) => {
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'job search': return 'bg-blue-100 text-blue-800';
      case 'career transition': return 'bg-purple-100 text-purple-800';
      case 'networking': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Career Guides</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Comprehensive step-by-step guides to help you navigate your career journey with confidence
        </p>
      </div>

      {/* Career Guides Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {careerGuides.map(guide => (
          <div
            key={guide.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer group"
            onClick={() => onSelectGuide(guide)}
          >
            <div className="p-6">
              {/* Category Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(guide.category)}`}>
                  {guide.category}
                </span>
                <BookOpen className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </div>

              {/* Title */}
              <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {guide.title}
              </h2>

              {/* Description */}
              <p className="text-gray-600 mb-4 leading-relaxed">
                {guide.description}
              </p>

              {/* Steps Count */}
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  {guide.steps.length} Steps
                </div>
                <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
                  <span className="text-sm font-medium mr-1">Start Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to Accelerate Your Career?
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          These comprehensive guides will walk you through every step of your career journey, 
          from job searching to career transitions and professional networking.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex items-center text-sm text-gray-600">
            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
            Step-by-step instructions
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
            Expert tips and strategies
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
            Actionable advice
          </div>
        </div>
      </div>
    </div>
  );
};