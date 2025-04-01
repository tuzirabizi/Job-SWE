const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
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
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['full-time', 'part-time', 'contract', 'internship', 'remote', 'hybrid']
    },
    experience: {
        type: String,
        required: true,
        enum: ['entry-level', 'mid-level', 'senior', 'lead', 'manager', 'director']
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
    education: {
        type: String,
        required: true,
        enum: ['high-school', 'bachelor', 'master', 'phd', 'any']
    },
    benefits: [{
        type: String,
        trim: true
    }],
    status: {
        type: String,
        enum: ['draft', 'published', 'closed'],
        default: 'draft'
    },
    applications: [{
        applicant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        resume: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Resume'
        },
        coverLetter: String,
        status: {
            type: String,
            enum: ['pending', 'reviewing', 'shortlisted', 'interviewed', 'rejected', 'hired'],
            default: 'pending'
        },
        appliedAt: {
            type: Date,
            default: Date.now
        },
        screening: {
            score: Number,
            notes: String,
            completedAt: Date
        },
        interview: {
            scheduledAt: Date,
            type: {
                type: String,
                enum: ['phone', 'video', 'in-person']
            },
            feedback: String,
            status: {
                type: String,
                enum: ['scheduled', 'completed', 'cancelled']
            }
        },
        offer: {
            salary: Number,
            startDate: Date,
            status: {
                type: String,
                enum: ['pending', 'accepted', 'rejected']
            }
        }
    }],
    deadline: Date,
    views: {
        type: Number,
        default: 0
    },
    tags: [{
        type: String,
        trim: true
    }],
    department: {
        type: String,
        trim: true
    },
    teamSize: {
        type: Number,
        min: 1
    },
    reportingTo: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Method to get application statistics
jobSchema.methods.getApplicationStats = function() {
    const total = this.applications.length;
    const stats = {
        total,
        pending: 0,
        reviewing: 0,
        shortlisted: 0,
        interviewed: 0,
        rejected: 0,
        hired: 0
    };

    this.applications.forEach(application => {
        stats[application.status]++;
    });

    return stats;
};

// Method to check if job is active
jobSchema.methods.isActive = function() {
    return this.status === 'published' && 
           (!this.deadline || this.deadline > new Date());
};

// Method to increment views
jobSchema.methods.incrementViews = async function() {
    this.views += 1;
    await this.save();
};

const Job = mongoose.model('Job', jobSchema);

module.exports = Job; 