import { mockApi } from './mockApi';

class ContentService {
  constructor() {
    this.content = {};
    this.cache = new Map();
  }

  async getContent(contentType, options = {}) {
    try {
      const cacheKey = `${contentType}-${JSON.stringify(options)}`;
      
      // Check cache first
      if (this.cache.has(cacheKey)) {
        return this.cache.get(cacheKey);
      }

      const response = await mockApi.get(`/api/content/${contentType}`, { params: options });
      const content = response.data;
      
      // Update cache
      this.cache.set(cacheKey, content);
      
      return content;
    } catch (error) {
      console.error('Error fetching content:', error);
      return null;
    }
  }

  async updateContent(contentType, contentId, updates) {
    try {
      const response = await mockApi.put(`/api/content/${contentType}/${contentId}`, updates);
      
      // Invalidate cache for this content type
      this.invalidateCache(contentType);
      
      return response.data;
    } catch (error) {
      console.error('Error updating content:', error);
      return null;
    }
  }

  async createContent(contentType, content) {
    try {
      const response = await mockApi.post(`/api/content/${contentType}`, content);
      
      // Invalidate cache for this content type
      this.invalidateCache(contentType);
      
      return response.data;
    } catch (error) {
      console.error('Error creating content:', error);
      return null;
    }
  }

  async deleteContent(contentType, contentId) {
    try {
      await mockApi.delete(`/api/content/${contentType}/${contentId}`);
      
      // Invalidate cache for this content type
      this.invalidateCache(contentType);
      
      return true;
    } catch (error) {
      console.error('Error deleting content:', error);
      return false;
    }
  }

  async getContentByCategory(contentType, category) {
    try {
      const response = await mockApi.get(`/api/content/${contentType}/category/${category}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching content by category:', error);
      return null;
    }
  }

  async searchContent(contentType, query) {
    try {
      const response = await mockApi.get(`/api/content/${contentType}/search`, {
        params: { q: query }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching content:', error);
      return null;
    }
  }

  invalidateCache(contentType) {
    // Remove all cached items for this content type
    for (const [key] of this.cache) {
      if (key.startsWith(contentType)) {
        this.cache.delete(key);
      }
    }
  }

  clearCache() {
    this.cache.clear();
  }
}

export const contentService = new ContentService(); 