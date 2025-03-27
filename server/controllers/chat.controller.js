const Chat = require('../models/chat.model');
const User = require('../models/user.model');
const aiService = require('../services/ai.service');
const { sendEmail } = require('../utils/email');

class ChatController {
  // Create new chat
  async createChat(req, res) {
    try {
      const { participants, type, title, context } = req.body;
      const currentUser = req.user;

      // Add current user to participants if not included
      if (!participants.includes(currentUser._id)) {
        participants.push(currentUser._id);
      }

      // Create chat
      const chat = new Chat({
        participants: participants.map(userId => ({
          user: userId,
          role: userId === currentUser._id ? currentUser.role : 'user'
        })),
        type,
        title,
        context
      });

      await chat.save();

      // Populate participants
      await chat.populate('participants.user', 'firstName lastName role');

      res.status(201).json({
        message: 'Chat created successfully',
        chat
      });
    } catch (error) {
      console.error('Create chat error:', error);
      res.status(500).json({ message: 'Error creating chat' });
    }
  }

  // Get user's chats
  async getUserChats(req, res) {
    try {
      const chats = await Chat.find({
        'participants.user': req.user._id
      })
        .populate('participants.user', 'firstName lastName role')
        .sort({ updatedAt: -1 });

      res.json(chats);
    } catch (error) {
      console.error('Get user chats error:', error);
      res.status(500).json({ message: 'Error fetching chats' });
    }
  }

  // Get chat by ID
  async getChat(req, res) {
    try {
      const chat = await Chat.findById(req.params.id)
        .populate('participants.user', 'firstName lastName role')
        .populate('messages.sender', 'firstName lastName role');

      if (!chat) {
        return res.status(404).json({ message: 'Chat not found' });
      }

      // Check if user is a participant
      const isParticipant = chat.participants.some(
        p => p.user._id.toString() === req.user._id.toString()
      );

      if (!isParticipant) {
        return res.status(403).json({ message: 'Not authorized to view this chat' });
      }

      // Mark messages as read
      await chat.markAsRead(req.user._id);

      res.json(chat);
    } catch (error) {
      console.error('Get chat error:', error);
      res.status(500).json({ message: 'Error fetching chat' });
    }
  }

  // Send message
  async sendMessage(req, res) {
    try {
      const { content, type = 'text', attachments = [] } = req.body;
      const chat = await Chat.findById(req.params.id);

      if (!chat) {
        return res.status(404).json({ message: 'Chat not found' });
      }

      // Check if user is a participant
      const isParticipant = chat.participants.some(
        p => p.user.toString() === req.user._id.toString()
      );

      if (!isParticipant) {
        return res.status(403).json({ message: 'Not authorized to send messages in this chat' });
      }

      // Add message
      await chat.addMessage({
        sender: req.user._id,
        content,
        type,
        attachments
      });

      // Handle AI chatbot response if enabled
      if (chat.settings.aiEnabled && chat.type === 'ai_support') {
        const aiResponse = await aiService.generateChatbotResponse(content, {
          chatId: chat._id,
          context: chat.context,
          userRole: req.user.role
        });

        await chat.addMessage({
          sender: process.env.AI_USER_ID,
          content: aiResponse,
          type: 'text',
          metadata: {
            isAI: true,
            aiModel: chat.settings.aiSettings.model
          }
        });
      }

      // Populate message sender
      await chat.populate('messages.sender', 'firstName lastName role');

      res.json({
        message: 'Message sent successfully',
        chat
      });
    } catch (error) {
      console.error('Send message error:', error);
      res.status(500).json({ message: 'Error sending message' });
    }
  }

  // Update chat settings
  async updateChatSettings(req, res) {
    try {
      const { settings } = req.body;
      const chat = await Chat.findById(req.params.id);

      if (!chat) {
        return res.status(404).json({ message: 'Chat not found' });
      }

      // Check if user is a participant
      const isParticipant = chat.participants.some(
        p => p.user.toString() === req.user._id.toString()
      );

      if (!isParticipant) {
        return res.status(403).json({ message: 'Not authorized to update chat settings' });
      }

      chat.settings = {
        ...chat.settings,
        ...settings
      };

      await chat.save();

      res.json({
        message: 'Chat settings updated successfully',
        chat
      });
    } catch (error) {
      console.error('Update chat settings error:', error);
      res.status(500).json({ message: 'Error updating chat settings' });
    }
  }

  // Add participant
  async addParticipant(req, res) {
    try {
      const { userId } = req.body;
      const chat = await Chat.findById(req.params.id);

      if (!chat) {
        return res.status(404).json({ message: 'Chat not found' });
      }

      // Check if user is already a participant
      const isParticipant = chat.participants.some(
        p => p.user.toString() === userId
      );

      if (isParticipant) {
        return res.status(400).json({ message: 'User is already a participant' });
      }

      // Get user role
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Add participant
      chat.participants.push({
        user: userId,
        role: user.role
      });

      await chat.save();

      // Send notification email
      await sendEmail({
        to: user.email,
        subject: 'Added to Chat',
        template: 'chat-invitation',
        context: {
          firstName: user.firstName,
          chatTitle: chat.title
        }
      });

      res.json({
        message: 'Participant added successfully',
        chat
      });
    } catch (error) {
      console.error('Add participant error:', error);
      res.status(500).json({ message: 'Error adding participant' });
    }
  }

  // Remove participant
  async removeParticipant(req, res) {
    try {
      const { userId } = req.body;
      const chat = await Chat.findById(req.params.id);

      if (!chat) {
        return res.status(404).json({ message: 'Chat not found' });
      }

      // Check if user is a participant
      const participantIndex = chat.participants.findIndex(
        p => p.user.toString() === userId
      );

      if (participantIndex === -1) {
        return res.status(404).json({ message: 'Participant not found' });
      }

      // Remove participant
      chat.participants.splice(participantIndex, 1);

      await chat.save();

      res.json({
        message: 'Participant removed successfully',
        chat
      });
    } catch (error) {
      console.error('Remove participant error:', error);
      res.status(500).json({ message: 'Error removing participant' });
    }
  }

  // Archive chat
  async archiveChat(req, res) {
    try {
      const chat = await Chat.findById(req.params.id);

      if (!chat) {
        return res.status(404).json({ message: 'Chat not found' });
      }

      // Check if user is a participant
      const isParticipant = chat.participants.some(
        p => p.user.toString() === req.user._id.toString()
      );

      if (!isParticipant) {
        return res.status(403).json({ message: 'Not authorized to archive this chat' });
      }

      chat.settings.isArchived = true;
      await chat.save();

      res.json({
        message: 'Chat archived successfully',
        chat
      });
    } catch (error) {
      console.error('Archive chat error:', error);
      res.status(500).json({ message: 'Error archiving chat' });
    }
  }

  // Get chat analytics
  async getChatAnalytics(req, res) {
    try {
      const chat = await Chat.findById(req.params.id);

      if (!chat) {
        return res.status(404).json({ message: 'Chat not found' });
      }

      // Check if user is a participant
      const isParticipant = chat.participants.some(
        p => p.user.toString() === req.user._id.toString()
      );

      if (!isParticipant) {
        return res.status(403).json({ message: 'Not authorized to view chat analytics' });
      }

      // Calculate analytics
      const analytics = {
        totalMessages: chat.analytics.totalMessages,
        aiResponses: chat.analytics.aiResponses,
        averageResponseTime: chat.analytics.averageResponseTime,
        satisfactionScore: chat.analytics.satisfactionScore,
        feedback: chat.analytics.feedback
      };

      res.json(analytics);
    } catch (error) {
      console.error('Get chat analytics error:', error);
      res.status(500).json({ message: 'Error fetching chat analytics' });
    }
  }
}

module.exports = new ChatController(); 