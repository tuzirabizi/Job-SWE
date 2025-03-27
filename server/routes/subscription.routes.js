const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscription.controller');
const { auth, checkRole } = require('../middleware/auth.middleware');
const { validateRequest } = require('../middleware/auth.middleware');
const Joi = require('joi');

// Validation schemas
const subscribeSchema = Joi.object({
  plan: Joi.string().valid('free', 'basic', 'premium').required(),
  paymentMethodId: Joi.string().when('plan', {
    is: 'free',
    then: Joi.optional(),
    otherwise: Joi.required()
  }),
  billingCycle: Joi.string().valid('monthly', 'yearly').when('plan', {
    is: 'free',
    then: Joi.optional(),
    otherwise: Joi.required()
  })
});

const updateSubscriptionSchema = Joi.object({
  plan: Joi.string().valid('basic', 'premium').required(),
  paymentMethodId: Joi.string().required()
});

const cancelSubscriptionSchema = Joi.object({
  reason: Joi.string().required()
});

// Routes
router.get('/plans',
  auth,
  subscriptionController.getPlans
);

router.post('/subscribe',
  auth,
  validateRequest(subscribeSchema),
  subscriptionController.subscribe
);

router.put('/update',
  auth,
  validateRequest(updateSubscriptionSchema),
  subscriptionController.updateSubscription
);

router.post('/cancel',
  auth,
  validateRequest(cancelSubscriptionSchema),
  subscriptionController.cancelSubscription
);

router.get('/status',
  auth,
  subscriptionController.getSubscriptionStatus
);

router.get('/history',
  auth,
  subscriptionController.getSubscriptionHistory
);

router.get('/invoices',
  auth,
  subscriptionController.getInvoices
);

// Webhook route for Stripe events
router.post('/webhook',
  express.raw({ type: 'application/json' }),
  subscriptionController.handleWebhook
);

module.exports = router; 