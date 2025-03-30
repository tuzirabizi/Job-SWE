import { mockApi } from './mockApi';

class ResumeService {
  constructor() {
    this.templates = [];
    this.resumes = [];
  }

  async getTemplates() {
    try {
      const response = await mockApi.get('/api/resumes/templates');
      this.templates = response.data;
      return response.data;
    } catch (error) {
      console.error('Error fetching resume templates:', error);
      return null;
    }
  }

  async createResume(userId, resumeData) {
    try {
      const response = await mockApi.post('/api/resumes', {
        userId,
        ...resumeData,
        createdAt: new Date().toISOString()
      });
      this.resumes.push(response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating resume:', error);
      return null;
    }
  }

  async updateResume(resumeId, updates) {
    try {
      const response = await mockApi.put(`/api/resumes/${resumeId}`, updates);
      const index = this.resumes.findIndex(r => r.id === resumeId);
      if (index !== -1) {
        this.resumes[index] = response.data;
      }
      return response.data;
    } catch (error) {
      console.error('Error updating resume:', error);
      return null;
    }
  }

  async getResume(resumeId) {
    try {
      const response = await mockApi.get(`/api/resumes/${resumeId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching resume:', error);
      return null;
    }
  }

  async getUserResumes(userId) {
    try {
      const response = await mockApi.get(`/api/resumes/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user resumes:', error);
      return null;
    }
  }

  async matchSkillsWithJob(resumeId, jobId) {
    try {
      const response = await mockApi.get(`/api/resumes/${resumeId}/match/${jobId}`);
      return response.data;
    } catch (error) {
      console.error('Error matching skills with job:', error);
      return null;
    }
  }

  async generateResumePDF(resumeId) {
    try {
      const response = await mockApi.get(`/api/resumes/${resumeId}/pdf`);
      return response.data;
    } catch (error) {
      console.error('Error generating resume PDF:', error);
      return null;
    }
  }

  async importFromLinkedIn(userId) {
    try {
      const response = await mockApi.post('/api/resumes/import-linkedin', { userId });
      return response.data;
    } catch (error) {
      console.error('Error importing from LinkedIn:', error);
      return null;
    }
  }
}

export const resumeService = new ResumeService(); 