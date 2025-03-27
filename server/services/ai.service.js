const OpenAI = require('openai');
const Job = require('../models/job.model');
const User = require('../models/user.model');
const Application = require('../models/application.model');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

class AIService {
  // Job Description Generation
  async generateJobDescription(jobDetails) {
    try {
      const prompt = `Generate a professional job description for a ${jobDetails.title} position with the following details:
        - Experience level: ${jobDetails.experience}
        - Location: ${jobDetails.location}
        - Type: ${jobDetails.type}
        - Key requirements: ${jobDetails.requirements.join(', ')}
        - Responsibilities: ${jobDetails.responsibilities.join(', ')}
        
        Please include:
        1. A compelling introduction
        2. Key responsibilities
        3. Required qualifications
        4. Preferred qualifications
        5. Benefits and perks
        6. Company culture
        7. Growth opportunities`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 1000
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error('Error generating job description:', error);
      throw error;
    }
  }

  // Resume Analysis
  async analyzeResume(resumeText, jobRequirements) {
    try {
      const prompt = `Analyze the following resume against the job requirements:
        Resume: ${resumeText}
        Job Requirements: ${jobRequirements.join(', ')}
        
        Please provide:
        1. Match percentage (0-100)
        2. Key strengths
        3. Areas for improvement
        4. Missing skills
        5. Recommendations for improvement`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 1000
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error('Error analyzing resume:', error);
      throw error;
    }
  }

  // Candidate Matching
  async matchCandidates(jobId, candidates) {
    try {
      const job = await Job.findById(jobId);
      if (!job) throw new Error('Job not found');

      const matchedCandidates = await Promise.all(
        candidates.map(async (candidate) => {
          const matchScore = await this.calculateMatchScore(job, candidate);
          return {
            candidate,
            matchScore,
            recommendations: await this.generateRecommendations(job, candidate)
          };
        })
      );

      return matchedCandidates.sort((a, b) => b.matchScore - a.matchScore);
    } catch (error) {
      console.error('Error matching candidates:', error);
      throw error;
    }
  }

  // Interview Question Generation
  async generateInterviewQuestions(jobId, candidateId) {
    try {
      const job = await Job.findById(jobId);
      const candidate = await User.findById(candidateId);
      if (!job || !candidate) throw new Error('Job or candidate not found');

      const prompt = `Generate interview questions for a ${job.title} position:
        Job Requirements: ${job.requirements.join(', ')}
        Candidate Skills: ${candidate.skills.join(', ')}
        
        Please provide:
        1. Technical questions
        2. Behavioral questions
        3. Situational questions
        4. Follow-up questions
        5. Red flags to watch for`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 1000
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error('Error generating interview questions:', error);
      throw error;
    }
  }

  // Chatbot Response
  async generateChatbotResponse(message, context) {
    try {
      const prompt = `You are an AI assistant for a job platform. Respond to the following message:
        Message: ${message}
        Context: ${context}
        
        Please provide a helpful, professional response that:
        1. Addresses the user's question directly
        2. Provides relevant information
        3. Suggests next steps if applicable
        4. Maintains a professional tone`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 500
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error('Error generating chatbot response:', error);
      throw error;
    }
  }

  // Helper Methods
  async calculateMatchScore(job, candidate) {
    // Implement match score calculation logic
    // This could include:
    // - Skills matching
    // - Experience level matching
    // - Location compatibility
    // - Education requirements
    // - Industry experience
    return 0; // Placeholder
  }

  async generateRecommendations(job, candidate) {
    // Implement recommendation generation logic
    // This could include:
    // - Skill development suggestions
    // - Course recommendations
    // - Experience opportunities
    // - Profile improvement tips
    return []; // Placeholder
  }
}

module.exports = new AIService(); 