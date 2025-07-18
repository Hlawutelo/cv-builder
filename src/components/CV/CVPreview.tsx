import React from 'react';
import { CV } from '../../types/cv';
import { Download, Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

interface CVPreviewProps {
  cv: CV | null;
  onExportPDF: () => void;
}

export const CVPreview: React.FC<CVPreviewProps> = ({ cv, onExportPDF }) => {
  if (!cv) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <p className="text-gray-500">Fill out the form to see your CV preview</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <button
          onClick={onExportPDF}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Download className="w-4 h-4 mr-2" />
          Export PDF
        </button>
      </div>
      
      <div id="cv-content" className="p-8 max-w-4xl mx-auto bg-white">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {cv.personalInfo.fullName || 'Your Name'}
          </h1>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            {cv.personalInfo.email && (
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-1" />
                {cv.personalInfo.email}
              </div>
            )}
            {cv.personalInfo.phone && (
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-1" />
                {cv.personalInfo.phone}
              </div>
            )}
            {cv.personalInfo.address && (
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {cv.personalInfo.address}
              </div>
            )}
            {cv.personalInfo.website && (
              <div className="flex items-center">
                <Globe className="w-4 h-4 mr-1" />
                <a href={cv.personalInfo.website} className="text-blue-600 hover:underline">
                  {cv.personalInfo.website}
                </a>
              </div>
            )}
            {cv.personalInfo.linkedin && (
              <div className="flex items-center">
                <Linkedin className="w-4 h-4 mr-1" />
                <a href={cv.personalInfo.linkedin} className="text-blue-600 hover:underline">
                  LinkedIn
                </a>
              </div>
            )}
          </div>
        </header>

        {/* Summary */}
        {cv.summary && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b-2 border-blue-600 pb-1">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{cv.summary}</p>
          </section>
        )}

        {/* Experience */}
        {cv.experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b-2 border-blue-600 pb-1">
              Work Experience
            </h2>
            <div className="space-y-6">
              {cv.experience.map((exp, index) => (
                <div key={index} className="border-l-4 border-blue-200 pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                      <p className="text-blue-600 font-medium">{exp.company}</p>
                    </div>
                    <div className="text-sm text-gray-500 text-right">
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {cv.education.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b-2 border-blue-600 pb-1">
              Education
            </h2>
            <div className="space-y-4">
              {cv.education.map((edu, index) => (
                <div key={index} className="border-l-4 border-blue-200 pl-4">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                      <p className="text-blue-600 font-medium">{edu.institution}</p>
                      {edu.field && <p className="text-gray-600">{edu.field}</p>}
                    </div>
                    <div className="text-sm text-gray-500 text-right">
                      {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {cv.skills.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b-2 border-blue-600 pb-1">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {cv.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};