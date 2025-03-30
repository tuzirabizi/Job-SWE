import { mockApi } from './mockApi';

class AIService {
  constructor() {
    this.userPreferences = {};
    this.recommendations = {};
  }

  async initializeUserPreferences(userId) {
    try {
      const response = await mockApi.get(`/api/users/${userId}/preferences`);
      this.userPreferences = response.data;
      return response.data;
    } catch (error) {
      console.error('Error initializing user preferences:', error);
      return null;
    }
  }

  async getPersonalizedRecommendations(userId, contentType) {
    try {
      const response = await mockApi.get(`/api/recommendations/${userId}/${contentType}`);
      this.recommendations[contentType] = response.data;
      return response.data;
    } catch (error) {
      console.error('Error getting personalized recommendations:', error);
      return null;
    }
  }

  async updateUserPreferences(userId, preferences) {
    try {
      const response = await mockApi.put(`/api/users/${userId}/preferences`, preferences);
      this.userPreferences = response.data;
      return response.data;
    } catch (error) {
      console.error('Error updating user preferences:', error);
      return null;
    }
  }

  getPersonalizedContent(content, userPreferences) {
    // Apply AI-driven content filtering and sorting based on user preferences
    return content.filter(item => {
      const relevanceScore = this.calculateRelevanceScore(item, userPreferences);
      return relevanceScore > 0.6; // Only show content with high relevance
    }).sort((a, b) => {
      const scoreA = this.calculateRelevanceScore(a, userPreferences);
      const scoreB = this.calculateRelevanceScore(b, userPreferences);
      return scoreB - scoreA;
    });
  }

  calculateRelevanceScore(item, preferences) {
    let score = 0;
    const weights = {
      skills: 0.4,
      interests: 0.3,
      experience: 0.2,
      location: 0.1
    };

    // Calculate score based on matching skills
    if (preferences.skills && item.skills) {
      const matchingSkills = preferences.skills.filter(skill => 
        item.skills.includes(skill)
      ).length;
      score += (matchingSkills / preferences.skills.length) * weights.skills;
    }

    // Calculate score based on matching interests
    if (preferences.interests && item.interests) {
      const matchingInterests = preferences.interests.filter(interest => 
        item.interests.includes(interest)
      ).length;
      score += (matchingInterests / preferences.interests.length) * weights.interests;
    }

    // Calculate score based on experience level
    if (preferences.experienceLevel && item.experienceLevel) {
      score += (preferences.experienceLevel === item.experienceLevel) * weights.experience;
    }

    // Calculate score based on location
    if (preferences.location && item.location) {
      score += (preferences.location === item.location) * weights.location;
    }

    return score;
  }
}

export const aiService = new AIService(); 