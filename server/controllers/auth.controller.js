const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const Subscription = require('../models/subscription.model');
const { sendEmail } = require('../utils/email');
const { validateRequest } = require('../middleware/auth.middleware');

class AuthController {
  // Register new user
  async register(req, res) {
    try {
      const { email, password, firstName, lastName, role, companyName, phone, location } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
      }

      // Create new user
      const user = new User({
        email,
        password,
        firstName,
        lastName,
        role,
        companyName,
        phone,
        location
      });

      await user.save();

      // Create free subscription
      const subscription = new Subscription({
        user: user._id,
        plan: 'free',
        status: 'active'
      });
      await subscription.save();

      // Generate JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d'
      });

      // Send welcome email
      await sendEmail({
        to: email,
        subject: 'Welcome to Crimble.com',
        template: 'welcome',
        context: {
          firstName,
          role
        }
      });

      res.status(201).json({
        message: 'Registration successful',
        token,
        user: user.getPublicProfile()
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Error registering user' });
    }
  }

  // Login user
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Check password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Check if user is active
      if (!user.isActive) {
        return res.status(403).json({ message: 'Account is deactivated' });
      }

      // Generate JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d'
      });

      res.json({
        message: 'Login successful',
        token,
        user: user.getPublicProfile()
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Error logging in' });
    }
  }

  // Forgot password
  async forgotPassword(req, res) {
    try {
      const { email } = req.body;

      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Generate reset token
      const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h'
      });

      // Save reset token to user
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
      await user.save();

      // Send reset email
      await sendEmail({
        to: email,
        subject: 'Password Reset Request',
        template: 'reset-password',
        context: {
          firstName: user.firstName,
          resetLink: `${process.env.CLIENT_URL}/reset-password/${resetToken}`
        }
      });

      res.json({ message: 'Password reset email sent' });
    } catch (error) {
      console.error('Forgot password error:', error);
      res.status(500).json({ message: 'Error processing request' });
    }
  }

  // Reset password
  async resetPassword(req, res) {
    try {
      const { token, password } = req.body;

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({
        _id: decoded.id,
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
      });

      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired reset token' });
      }

      // Update password
      user.password = password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();

      // Send confirmation email
      await sendEmail({
        to: user.email,
        subject: 'Password Reset Successful',
        template: 'password-reset-success',
        context: {
          firstName: user.firstName
        }
      });

      res.json({ message: 'Password reset successful' });
    } catch (error) {
      console.error('Reset password error:', error);
      res.status(500).json({ message: 'Error resetting password' });
    }
  }

  // Change password
  async changePassword(req, res) {
    try {
      const { currentPassword, newPassword } = req.body;
      const user = req.user;

      // Verify current password
      const isMatch = await user.comparePassword(currentPassword);
      if (!isMatch) {
        return res.status(401).json({ message: 'Current password is incorrect' });
      }

      // Update password
      user.password = newPassword;
      await user.save();

      // Send confirmation email
      await sendEmail({
        to: user.email,
        subject: 'Password Changed Successfully',
        template: 'password-change-success',
        context: {
          firstName: user.firstName
        }
      });

      res.json({ message: 'Password changed successfully' });
    } catch (error) {
      console.error('Change password error:', error);
      res.status(500).json({ message: 'Error changing password' });
    }
  }

  // Verify email
  async verifyEmail(req, res) {
    try {
      const { token } = req.params;

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({
        _id: decoded.id,
        emailVerificationToken: token,
        emailVerificationExpires: { $gt: Date.now() }
      });

      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired verification token' });
      }

      // Update user verification status
      user.isVerified = true;
      user.emailVerificationToken = undefined;
      user.emailVerificationExpires = undefined;
      await user.save();

      res.json({ message: 'Email verified successfully' });
    } catch (error) {
      console.error('Email verification error:', error);
      res.status(500).json({ message: 'Error verifying email' });
    }
  }

  // Resend verification email
  async resendVerification(req, res) {
    try {
      const user = req.user;

      if (user.isVerified) {
        return res.status(400).json({ message: 'Email is already verified' });
      }

      // Generate verification token
      const verificationToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '24h'
      });

      // Save verification token
      user.emailVerificationToken = verificationToken;
      user.emailVerificationExpires = Date.now() + 86400000; // 24 hours
      await user.save();

      // Send verification email
      await sendEmail({
        to: user.email,
        subject: 'Verify Your Email',
        template: 'verify-email',
        context: {
          firstName: user.firstName,
          verificationLink: `${process.env.CLIENT_URL}/verify-email/${verificationToken}`
        }
      });

      res.json({ message: 'Verification email sent' });
    } catch (error) {
      console.error('Resend verification error:', error);
      res.status(500).json({ message: 'Error sending verification email' });
    }
  }
}

module.exports = new AuthController(); 