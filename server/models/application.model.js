const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user.model');
const Job = require('./job.model');

const Application = sequelize.define('Application', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  coverLetter: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  resume: {
    type: DataTypes.STRING,
    allowNull: false
  },
  expectedSalary: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  availability: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'reviewed', 'shortlisted', 'interviewed', 'offered', 'rejected', 'withdrawn'),
    defaultValue: 'pending'
  },
  notes: {
    type: DataTypes.TEXT
  },
  aiMatchScore: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
      max: 100
    }
  },
  interviewDate: {
    type: DataTypes.DATE
  },
  interviewNotes: {
    type: DataTypes.TEXT
  },
  offerDetails: {
    type: DataTypes.JSONB
  },
  offerStatus: {
    type: DataTypes.ENUM('pending', 'accepted', 'rejected', 'expired'),
    defaultValue: 'pending'
  }
});

// Define associations
Application.belongsTo(User, {
  foreignKey: 'candidateId',
  as: 'candidate'
});

Application.belongsTo(Job, {
  foreignKey: 'jobId',
  as: 'job'
});

module.exports = Application; 