import { mockApi } from './mockApi';

class HiringService {
  constructor() {
    this.candidates = [];
    this.interviews = [];
    this.feedback = [];
  }

  async scheduleInterview(interviewData) {
    try {
      const response = await mockApi.post('/api/interviews', {
        ...interviewData,
        status: 'scheduled',
        createdAt: new Date().toISOString()
      });
      this.interviews.push(response.data);
      return response.data;
    } catch (error) {
      console.error('Error scheduling interview:', error);
      return null;
    }
  }

  async getInterviews(jobId) {
    try {
      const response = await mockApi.get(`/api/interviews/job/${jobId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching interviews:', error);
      return null;
    }
  }

  async updateInterviewStatus(interviewId, status) {
    try {
      const response = await mockApi.put(`/api/interviews/${interviewId}`, { status });
      const index = this.interviews.findIndex(i => i.id === interviewId);
      if (index !== -1) {
        this.interviews[index] = response.data;
      }
      return response.data;
    } catch (error) {
      console.error('Error updating interview status:', error);
      return null;
    }
  }

  async submitFeedback(interviewId, feedbackData) {
    try {
      const response = await mockApi.post('/api/interviews/feedback', {
        interviewId,
        ...feedbackData,
        createdAt: new Date().toISOString()
      });
      this.feedback.push(response.data);
      return response.data;
    } catch (error) {
      console.error('Error submitting feedback:', error);
      return null;
    }
  }

  async getCandidateFeedback(candidateId) {
    try {
      const response = await mockApi.get(`/api/interviews/feedback/candidate/${candidateId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching candidate feedback:', error);
      return null;
    }
  }

  async screenCandidate(candidateId, jobId) {
    try {
      const response = await mockApi.post('/api/screening', {
        candidateId,
        jobId,
        timestamp: new Date().toISOString()
      });
      return response.data;
    } catch (error) {
      console.error('Error screening candidate:', error);
      return null;
    }
  }

  async getScreeningResults(candidateId) {
    try {
      const response = await mockApi.get(`/api/screening/${candidateId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching screening results:', error);
      return null;
    }
  }

  async scheduleVideoInterview(interviewData) {
    try {
      const response = await mockApi.post('/api/interviews/video', {
        ...interviewData,
        type: 'video',
        status: 'scheduled',
        createdAt: new Date().toISOString()
      });
      this.interviews.push(response.data);
      return response.data;
    } catch (error) {
      console.error('Error scheduling video interview:', error);
      return null;
    }
  }

  async getInterviewAnalytics(jobId) {
    try {
      const response = await mockApi.get(`/api/interviews/analytics/${jobId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching interview analytics:', error);
      return null;
    }
  }

  async sendInterviewReminder(interviewId) {
    try {
      const response = await mockApi.post(`/api/interviews/${interviewId}/reminder`);
      return response.data;
    } catch (error) {
      console.error('Error sending interview reminder:', error);
      return null;
    }
  }
}

export const hiringService = new HiringService(); 