import React, { useState, useEffect } from 'react';
import { resumeService } from '../../services/resumeService';

const ResumeBuilder = ({ userId }) => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [resume, setResume] = useState({
    title: '',
    template: 'modern',
    sections: {
      personalInfo: {
        name: '',
        email: '',
        phone: '',
        location: ''
      },
      summary: '',
      experience: [],
      education: [],
      skills: []
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTemplates();
    loadUserResumes();
  }, [userId]);

  const loadTemplates = async () => {
    try {
      const templates = await resumeService.getTemplates();
      setTemplates(templates);
    } catch (error) {
      setError('Error loading templates');
      console.error('Error loading templates:', error);
    }
  };

  const loadUserResumes = async () => {
    try {
      const userResumes = await resumeService.getUserResumes(userId);
      if (userResumes && userResumes.length > 0) {
        setResume(userResumes[0]);
        setSelectedTemplate(userResumes[0].template);
      }
    } catch (error) {
      setError('Error loading resumes');
      console.error('Error loading resumes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setResume(prev => ({ ...prev, template }));
  };

  const handlePersonalInfoChange = (field, value) => {
    setResume(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        personalInfo: {
          ...prev.sections.personalInfo,
          [field]: value
        }
      }
    }));
  };

  const handleAddExperience = () => {
    setResume(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        experience: [
          ...prev.sections.experience,
          {
            company: '',
            position: '',
            duration: '',
            description: ''
          }
        ]
      }
    }));
  };

  const handleAddEducation = () => {
    setResume(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        education: [
          ...prev.sections.education,
          {
            school: '',
            degree: '',
            year: ''
          }
        ]
      }
    }));
  };

  const handleAddSkill = (skill) => {
    setResume(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        skills: [...prev.sections.skills, skill]
      }
    }));
  };

  const handleSave = async () => {
    try {
      if (resume.id) {
        await resumeService.updateResume(resume.id, resume);
      } else {
        await resumeService.createResume(userId, resume);
      }
      setError(null);
    } catch (error) {
      setError('Error saving resume');
      console.error('Error saving resume:', error);
    }
  };

  const handleGeneratePDF = async () => {
    try {
      const pdfData = await resumeService.generateResumePDF(resume.id);
      window.open(pdfData.pdfUrl, '_blank');
    } catch (error) {
      setError('Error generating PDF');
      console.error('Error generating PDF:', error);
    }
  };

  const handleImportLinkedIn = async () => {
    try {
      const importedData = await resumeService.importFromLinkedIn(userId);
      setResume(importedData);
      setError(null);
    } catch (error) {
      setError('Error importing from LinkedIn');
      console.error('Error importing from LinkedIn:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Resume Builder</h2>
        <div className="space-x-4">
          <button
            onClick={handleSave}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Save Resume
          </button>
          <button
            onClick={handleGeneratePDF}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Generate PDF
          </button>
          <button
            onClick={handleImportLinkedIn}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Import from LinkedIn
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Template Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Choose Template</h3>
        <div className="grid grid-cols-3 gap-4">
          {templates.map((template) => (
            <div
              key={template}
              className={`p-4 border rounded-lg cursor-pointer ${
                selectedTemplate === template
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200'
              }`}
              onClick={() => handleTemplateSelect(template)}
            >
              <div className="text-center font-medium capitalize">{template}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Personal Information */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={resume.sections.personalInfo.name}
              onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={resume.sections.personalInfo.email}
              onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              value={resume.sections.personalInfo.phone}
              onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              value={resume.sections.personalInfo.location}
              onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Professional Summary</h3>
        <textarea
          value={resume.sections.summary}
          onChange={(e) =>
            setResume(prev => ({
              ...prev,
              sections: {
                ...prev.sections,
                summary: e.target.value
              }
            }))
          }
          rows="4"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      {/* Experience */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Work Experience</h3>
          <button
            onClick={handleAddExperience}
            className="text-indigo-600 hover:text-indigo-900"
          >
            + Add Experience
          </button>
        </div>
        {resume.sections.experience.map((exp, index) => (
          <div key={index} className="mb-4 p-4 border rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Company</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => {
                    const newExperience = [...resume.sections.experience];
                    newExperience[index] = { ...exp, company: e.target.value };
                    setResume(prev => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        experience: newExperience
                      }
                    }));
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Position</label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => {
                    const newExperience = [...resume.sections.experience];
                    newExperience[index] = { ...exp, position: e.target.value };
                    setResume(prev => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        experience: newExperience
                      }
                    }));
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Duration</label>
                <input
                  type="text"
                  value={exp.duration}
                  onChange={(e) => {
                    const newExperience = [...resume.sections.experience];
                    newExperience[index] = { ...exp, duration: e.target.value };
                    setResume(prev => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        experience: newExperience
                      }
                    }));
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={exp.description}
                  onChange={(e) => {
                    const newExperience = [...resume.sections.experience];
                    newExperience[index] = { ...exp, description: e.target.value };
                    setResume(prev => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        experience: newExperience
                      }
                    }));
                  }}
                  rows="3"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Education */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Education</h3>
          <button
            onClick={handleAddEducation}
            className="text-indigo-600 hover:text-indigo-900"
          >
            + Add Education
          </button>
        </div>
        {resume.sections.education.map((edu, index) => (
          <div key={index} className="mb-4 p-4 border rounded-lg">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">School</label>
                <input
                  type="text"
                  value={edu.school}
                  onChange={(e) => {
                    const newEducation = [...resume.sections.education];
                    newEducation[index] = { ...edu, school: e.target.value };
                    setResume(prev => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        education: newEducation
                      }
                    }));
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Degree</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => {
                    const newEducation = [...resume.sections.education];
                    newEducation[index] = { ...edu, degree: e.target.value };
                    setResume(prev => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        education: newEducation
                      }
                    }));
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Year</label>
                <input
                  type="text"
                  value={edu.year}
                  onChange={(e) => {
                    const newEducation = [...resume.sections.education];
                    newEducation[index] = { ...edu, year: e.target.value };
                    setResume(prev => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        education: newEducation
                      }
                    }));
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {resume.sections.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
            >
              {skill}
              <button
                onClick={() => {
                  const newSkills = resume.sections.skills.filter((_, i) => i !== index);
                  setResume(prev => ({
                    ...prev,
                    sections: {
                      ...prev.sections,
                      skills: newSkills
                    }
                  }));
                }}
                className="ml-2 text-indigo-600 hover:text-indigo-900"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Add a skill"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                const input = e.target;
                if (input.value.trim()) {
                  handleAddSkill(input.value.trim());
                  input.value = '';
                }
              }
            }}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder; 