const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { validateRequest } = require('../middleware/auth.middleware');
const { rateLimit } = require('../middleware/auth.middleware');
const Joi = require('joi');

// Validation schemas
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  role: Joi.string().valid('admin', 'employer', 'jobseeker').required(),
  companyName: Joi.string().when('role', {
    is: 'employer',
    then: Joi.required(),
    otherwise: Joi.optional()
  }),
  phone: Joi.string(),
  location: Joi.string()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required()
});

const resetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().min(6).required()
});

const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().min(6).required()
});

// Routes
router.post('/register', 
  rateLimit(5, 3600000), // 5 requests per hour
  validateRequest(registerSchema),
  authController.register
);

router.post('/login',
  rateLimit(5, 3600000), // 5 requests per hour
  validateRequest(loginSchema),
  authController.login
);

router.post('/forgot-password',
  rateLimit(3, 3600000), // 3 requests per hour
  validateRequest(forgotPasswordSchema),
  authController.forgotPassword
);

router.post('/reset-password',
  rateLimit(3, 3600000), // 3 requests per hour
  validateRequest(resetPasswordSchema),
  authController.resetPassword
);

router.post('/change-password',
  rateLimit(3, 3600000), // 3 requests per hour
  validateRequest(changePasswordSchema),
  authController.changePassword
);

router.get('/verify-email/:token',
  rateLimit(3, 3600000), // 3 requests per hour
  authController.verifyEmail
);

router.post('/resend-verification',
  rateLimit(3, 3600000), // 3 requests per hour
  authController.resendVerification
);

module.exports = router; 