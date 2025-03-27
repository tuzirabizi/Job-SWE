const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  requirements: [{
    type: String,
    trim: true
  }],
  responsibilities: [{
    type: String,
    trim: true
  }],
  location: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'internship', 'remote', 'hybrid'],
    required: true
  },
  experience: {
    type: String,
    enum: ['entry', 'mid', 'senior', 'lead', 'executive'],
    required: true
  },
  salary: {
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'USD'
    }
  },
  skills: [{
    type: String,
    trim: true
  }],
  benefits: [{
    type: String,
    trim: true
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'closed', 'archived'],
    default: 'draft'
  },
  isPromoted: {
    type: Boolean,
    default: false
  },
  promotionEndDate: {
    type: Date
  },
  applicationDeadline: {
    type: Date
  },
  applications: [{
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'shortlisted', 'interviewed', 'rejected', 'hired'],
      default: 'pending'
    },
    appliedAt: {
      type: Date,
      default: Date.now
    },
    notes: String,
    rating: {
      type: Number,
      min: 1,
      max: 5
    }
  }],
  views: {
    type: Number,
    default: 0
  },
  aiScore: {
    type: Number,
    min: 0,
    max: 100
  },
  aiSuggestions: [{
    type: String,
    trim: true
  }],
  tags: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    required: true,
    trim: true
  },
  department: {
    type: String,
    trim: true
  },
  reportingTo: {
    type: String,
    trim: true
  },
  teamSize: {
    type: Number
  },
  companyCulture: {
    type: String,
    trim: true
  },
  interviewProcess: [{
    stage: String,
    description: String
  }],
  metrics: {
    applications: {
      type: Number,
      default: 0
    },
    views: {
      type: Number,
      default: 0
    },
    conversionRate: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Index for search functionality
jobSchema.index({
  title: 'text',
  description: 'text',
  requirements: 'text',
  skills: 'text',
  location: 'text'
});

// Method to update metrics
jobSchema.methods.updateMetrics = async function() {
  this.metrics.applications = this.applications.length;
  this.metrics.conversionRate = this.metrics.views > 0 
    ? (this.metrics.applications / this.metrics.views) * 100 
    : 0;
  await this.save();
};

const Job = mongoose.model('Job', jobSchema);

module.exports = Job; 