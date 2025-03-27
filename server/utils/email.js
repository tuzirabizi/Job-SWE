const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs').promises;
const path = require('path');

// Create email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Load email templates
const loadTemplate = async (templateName) => {
  try {
    const templatePath = path.join(__dirname, '../templates/emails', `${templateName}.hbs`);
    const template = await fs.readFile(templatePath, 'utf-8');
    return handlebars.compile(template);
  } catch (error) {
    console.error(`Error loading email template ${templateName}:`, error);
    throw error;
  }
};

// Send email
const sendEmail = async ({ to, subject, template, context, attachments = [] }) => {
  try {
    // Load and compile template
    const compiledTemplate = await loadTemplate(template);
    const html = compiledTemplate(context);

    // Send email
    const info = await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`,
      to,
      subject,
      html,
      attachments
    });

    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

// Email templates
const templates = {
  // Welcome email
  welcome: {
    subject: 'Welcome to Crimble.com',
    template: 'welcome',
    context: {
      firstName: '',
      role: ''
    }
  },

  // Password reset
  resetPassword: {
    subject: 'Password Reset Request',
    template: 'reset-password',
    context: {
      firstName: '',
      resetLink: ''
    }
  },

  // Password reset success
  passwordResetSuccess: {
    subject: 'Password Reset Successful',
    template: 'password-reset-success',
    context: {
      firstName: ''
    }
  },

  // Password change success
  passwordChangeSuccess: {
    subject: 'Password Changed Successfully',
    template: 'password-change-success',
    context: {
      firstName: ''
    }
  },

  // Email verification
  verifyEmail: {
    subject: 'Verify Your Email',
    template: 'verify-email',
    context: {
      firstName: '',
      verificationLink: ''
    }
  },

  // Subscription confirmation
  subscriptionConfirmation: {
    subject: 'Subscription Confirmation',
    template: 'subscription-confirmation',
    context: {
      firstName: '',
      plan: '',
      amount: '',
      currency: ''
    }
  },

  // Subscription update
  subscriptionUpdate: {
    subject: 'Subscription Updated',
    template: 'subscription-update',
    context: {
      firstName: '',
      plan: '',
      amount: '',
      currency: ''
    }
  },

  // Subscription cancellation
  subscriptionCancellation: {
    subject: 'Subscription Cancelled',
    template: 'subscription-cancellation',
    context: {
      firstName: '',
      plan: '',
      effectiveDate: ''
    }
  },

  // Payment failure
  paymentFailure: {
    subject: 'Payment Failed',
    template: 'payment-failure',
    context: {
      firstName: '',
      amount: '',
      currency: '',
      dueDate: ''
    }
  },

  // Chat invitation
  chatInvitation: {
    subject: 'Added to Chat',
    template: 'chat-invitation',
    context: {
      firstName: '',
      chatTitle: ''
    }
  },

  // Job application received
  jobApplicationReceived: {
    subject: 'New Job Application Received',
    template: 'job-application-received',
    context: {
      firstName: '',
      jobTitle: '',
      applicantName: '',
      applicationLink: ''
    }
  },

  // Interview scheduled
  interviewScheduled: {
    subject: 'Interview Scheduled',
    template: 'interview-scheduled',
    context: {
      firstName: '',
      jobTitle: '',
      companyName: '',
      interviewDate: '',
      interviewTime: '',
      interviewType: '',
      interviewLink: ''
    }
  },

  // Job offer
  jobOffer: {
    subject: 'Job Offer',
    template: 'job-offer',
    context: {
      firstName: '',
      jobTitle: '',
      companyName: '',
      offerAmount: '',
      currency: '',
      benefits: [],
      offerLink: ''
    }
  }
};

module.exports = {
  sendEmail,
  templates
}; 