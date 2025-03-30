import { mockApi } from './mockApi';

class AnalyticsService {
  constructor() {
    this.events = [];
    this.metrics = {};
  }

  async trackEvent(eventType, eventData) {
    try {
      const event = {
        type: eventType,
        data: eventData,
        timestamp: new Date().toISOString()
      };
      
      this.events.push(event);
      await mockApi.post('/api/analytics/events', event);
      
      // Update metrics based on event
      this.updateMetrics(event);
      
      return event;
    } catch (error) {
      console.error('Error tracking event:', error);
      return null;
    }
  }

  async getAnalytics(userId, timeRange = '30d') {
    try {
      const response = await mockApi.get(`/api/analytics/${userId}?timeRange=${timeRange}`);
      return response.data;
    } catch (error) {
      console.error('Error getting analytics:', error);
      return null;
    }
  }

  async getDashboardMetrics(userId) {
    try {
      const response = await mockApi.get(`/api/analytics/dashboard/${userId}`);
      this.metrics = response.data;
      return response.data;
    } catch (error) {
      console.error('Error getting dashboard metrics:', error);
      return null;
    }
  }

  updateMetrics(event) {
    const { type } = event;
    
    switch (type) {
      case 'page_view':
        this.metrics.pageViews = (this.metrics.pageViews || 0) + 1;
        break;
      case 'content_interaction':
        this.metrics.contentInteractions = (this.metrics.contentInteractions || 0) + 1;
        break;
      case 'search':
        this.metrics.searches = (this.metrics.searches || 0) + 1;
        break;
      case 'application_submit':
        this.metrics.applications = (this.metrics.applications || 0) + 1;
        break;
      case 'course_completion':
        this.metrics.courseCompletions = (this.metrics.courseCompletions || 0) + 1;
        break;
      default:
        break;
    }
  }

  getMetrics() {
    return this.metrics;
  }

  getEvents() {
    return this.events;
  }

  clearEvents() {
    this.events = [];
  }

  clearMetrics() {
    this.metrics = {};
  }
}

export const analyticsService = new AnalyticsService(); 