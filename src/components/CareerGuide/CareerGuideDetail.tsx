import React, { useState } from 'react';
import { CareerGuide } from '../../types/cv';
import { ArrowLeft, CheckCircle, ChevronDown, ChevronRight, BookOpen } from 'lucide-react';

interface CareerGuideDetailProps {
  guide: CareerGuide;
  onBack: () => void;
}

export const CareerGuideDetail: React.FC<CareerGuideDetailProps> = ({ guide, onBack }) => {
  const [expandedSteps, setExpandedSteps] = useState<number[]>([0]);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStep = (stepIndex: number) => {
    setExpandedSteps(prev => 
      prev.includes(stepIndex) 
        ? prev.filter(i => i !== stepIndex)
        : [...prev, stepIndex]
    );
  };

  const toggleCompleted = (stepIndex: number) => {
    setCompletedSteps(prev => 
      prev.includes(stepIndex)
        ? prev.filter(i => i !== stepIndex)
        : [...prev, stepIndex]
    );
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'job search': return 'bg-blue-100 text-blue-800';
      case 'career transition': return 'bg-purple-100 text-purple-800';
      case 'networking': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const progressPercentage = (completedSteps.length / guide.steps.length) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Career Guides
      </button>

      {/* Guide Header */}
      <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(guide.category)}`}>
            {guide.category}
          </span>
          <BookOpen className="w-6 h-6 text-gray-400" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {guide.title}
        </h1>
        
        <p className="text-lg text-gray-600 mb-6">
          {guide.description}
        </p>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm text-gray-500">
              {completedSteps.length} of {guide.steps.length} steps completed
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {guide.steps.map((step, index) => {
          const isExpanded = expandedSteps.includes(index);
          const isCompleted = completedSteps.includes(index);
          
          return (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-sm border-l-4 transition-all ${
                isCompleted 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-blue-500'
              }`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => toggleCompleted(index)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isCompleted
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-300 hover:border-green-500'
                      }`}
                    >
                      {isCompleted && <CheckCircle className="w-4 h-4" />}
                    </button>
                    <div>
                      <h3 className={`text-lg font-semibold ${
                        isCompleted ? 'text-green-800' : 'text-gray-900'
                      }`}>
                        Step {index + 1}: {step.title}
                      </h3>
                      <p className={`text-sm ${
                        isCompleted ? 'text-green-600' : 'text-gray-600'
                      }`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleStep(index)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5" />
                    ) : (
                      <ChevronRight className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {isExpanded && (
                  <div className="mt-6 ml-10">
                    <h4 className="font-medium text-gray-900 mb-3">Action Items:</h4>
                    <ul className="space-y-2">
                      {step.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion Message */}
      {completedSteps.length === guide.steps.length && (
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            Congratulations! 🎉
          </h3>
          <p className="text-green-700">
            You've completed the {guide.title} guide. You're well on your way to career success!
          </p>
        </div>
      )}
    </div>
  );
};