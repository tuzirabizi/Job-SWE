import { mockApi } from './mockApi';

class InternalJobService {
  constructor() {
    this.internalJobs = [];
    this.applications = [];
    this.careerPaths = [];
  }

  async getInternalJobs(companyId) {
    try {
      const response = await mockApi.get(`/api/internal-jobs/company/${companyId}`);
      this.internalJobs = response.data;
      return response.data;
    } catch (error) {
      console.error('Error fetching internal jobs:', error);
      return null;
    }
  }

  async applyForInternalJob(applicationData) {
    try {
      const response = await mockApi.post('/api/internal-jobs/applications', {
        ...applicationData,
        status: 'pending',
        appliedAt: new Date().toISOString()
      });
      this.applications.push(response.data);
      return response.data;
    } catch (error) {
      console.error('Error applying for internal job:', error);
      return null;
    }
  }

  async getEmployeeApplications(employeeId) {
    try {
      const response = await mockApi.get(`/api/internal-jobs/applications/employee/${employeeId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching employee applications:', error);
      return null;
    }
  }

  async updateApplicationStatus(applicationId, status) {
    try {
      const response = await mockApi.put(`/api/internal-jobs/applications/${applicationId}`, { status });
      const index = this.applications.findIndex(a => a.id === applicationId);
      if (index !== -1) {
        this.applications[index] = response.data;
      }
      return response.data;
    } catch (error) {
      console.error('Error updating application status:', error);
      return null;
    }
  }

  async getCareerPaths(companyId) {
    try {
      const response = await mockApi.get(`/api/internal-jobs/career-paths/${companyId}`);
      this.careerPaths = response.data;
      return response.data;
    } catch (error) {
      console.error('Error fetching career paths:', error);
      return null;
    }
  }

  async createCareerPath(careerPathData) {
    try {
      const response = await mockApi.post('/api/internal-jobs/career-paths', careerPathData);
      this.careerPaths.push(response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating career path:', error);
      return null;
    }
  }

  async getEmployeeCareerProgress(employeeId) {
    try {
      const response = await mockApi.get(`/api/internal-jobs/career-progress/${employeeId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching employee career progress:', error);
      return null;
    }
  }

  async updateEmployeeCareerGoals(employeeId, goals) {
    try {
      const response = await mockApi.put(`/api/internal-jobs/career-goals/${employeeId}`, { goals });
      return response.data;
    } catch (error) {
      console.error('Error updating career goals:', error);
      return null;
    }
  }

  async getSuccessionPlans(companyId) {
    try {
      const response = await mockApi.get(`/api/internal-jobs/succession-plans/${companyId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching succession plans:', error);
      return null;
    }
  }

  async createSuccessionPlan(planData) {
    try {
      const response = await mockApi.post('/api/internal-jobs/succession-plans', planData);
      return response.data;
    } catch (error) {
      console.error('Error creating succession plan:', error);
      return null;
    }
  }

  async getEmployeeDevelopmentPlan(employeeId) {
    try {
      const response = await mockApi.get(`/api/internal-jobs/development-plan/${employeeId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching development plan:', error);
      return null;
    }
  }

  async updateDevelopmentPlan(employeeId, plan) {
    try {
      const response = await mockApi.put(`/api/internal-jobs/development-plan/${employeeId}`, { plan });
      return response.data;
    } catch (error) {
      console.error('Error updating development plan:', error);
      return null;
    }
  }
}

export const internalJobService = new InternalJobService(); 