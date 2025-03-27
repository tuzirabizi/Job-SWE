const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user.model');

const Subscription = sequelize.define('Subscription', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  plan: {
    type: DataTypes.ENUM('free', 'basic', 'professional', 'enterprise'),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('active', 'cancelled', 'expired', 'past_due'),
    defaultValue: 'active'
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  billingCycle: {
    type: DataTypes.ENUM('monthly', 'yearly'),
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  currency: {
    type: DataTypes.STRING,
    defaultValue: 'USD'
  },
  stripeSubscriptionId: {
    type: DataTypes.STRING,
    unique: true
  },
  stripeCustomerId: {
    type: DataTypes.STRING,
    unique: true
  },
  paymentMethodId: {
    type: DataTypes.STRING
  },
  cancelReason: {
    type: DataTypes.TEXT
  },
  features: {
    type: DataTypes.JSONB,
    allowNull: false
  },
  autoRenew: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  lastBillingDate: {
    type: DataTypes.DATE
  },
  nextBillingDate: {
    type: DataTypes.DATE
  },
  trialEndDate: {
    type: DataTypes.DATE
  }
});

// Define associations
Subscription.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

module.exports = Subscription; 