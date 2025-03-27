const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controller');
const { auth, checkRole, checkSubscription, checkFeatureAccess } = require('../middleware/auth.middleware');
const { validateRequest } = require('../middleware/auth.middleware');
const Joi = require('joi');

// Validation schemas
const createChatSchema = Joi.object({
  participants: Joi.array().items(Joi.string()).min(1),
  type: Joi.string().valid('direct', 'group', 'ai_support', 'interview').required(),
  title: Joi.string().when('type', {
    is: 'direct',
    then: Joi.optional(),
    otherwise: Joi.required()
  }),
  context: Joi.object({
    type: Joi.string().valid('general', 'job_application', 'interview', 'subscription', 'technical_support'),
    jobId: Joi.string(),
    applicationId: Joi.string()
  })
});

const sendMessageSchema = Joi.object({
  content: Joi.string().required(),
  type: Joi.string().valid('text', 'image', 'file', 'video', 'system', 'ai'),
  attachments: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      url: Joi.string().required(),
      type: Joi.string().required(),
      size: Joi.number()
    })
  )
});

const updateChatSettingsSchema = Joi.object({
  settings: Joi.object({
    isArchived: Joi.boolean(),
    isMuted: Joi.boolean(),
    aiEnabled: Joi.boolean(),
    aiSettings: Joi.object({
      model: Joi.string().valid('gpt-4', 'gpt-3.5-turbo'),
      temperature: Joi.number().min(0).max(2),
      maxTokens: Joi.number()
    })
  })
});

const addParticipantSchema = Joi.object({
  userId: Joi.string().required()
});

// Routes
router.post('/',
  auth,
  checkSubscription,
  validateRequest(createChatSchema),
  chatController.createChat
);

router.get('/',
  auth,
  chatController.getUserChats
);

router.get('/:id',
  auth,
  chatController.getChat
);

router.post('/:id/messages',
  auth,
  checkSubscription,
  validateRequest(sendMessageSchema),
  chatController.sendMessage
);

router.put('/:id/settings',
  auth,
  validateRequest(updateChatSettingsSchema),
  chatController.updateChatSettings
);

router.post('/:id/participants',
  auth,
  validateRequest(addParticipantSchema),
  chatController.addParticipant
);

router.delete('/:id/participants',
  auth,
  validateRequest(addParticipantSchema),
  chatController.removeParticipant
);

router.post('/:id/archive',
  auth,
  chatController.archiveChat
);

router.get('/:id/analytics',
  auth,
  checkRole('admin'),
  chatController.getChatAnalytics
);

module.exports = router; 