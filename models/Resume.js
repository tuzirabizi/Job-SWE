const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    personalInfo: {
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        location: String,
        website: String,
        linkedin: String,
        github: String,
        summary: String
    },
    education: [{
        institution: String,
        degree: String,
        field: String,
        startDate: Date,
        endDate: Date,
        gpa: Number,
        achievements: [String],
        description: String
    }],
    experience: [{
        company: String,
        position: String,
        location: String,
        startDate: Date,
        endDate: Date,
        current: Boolean,
        description: String,
        achievements: [String],
        skills: [String]
    }],
    skills: {
        technical: [{
            name: String,
            level: {
                type: String,
                enum: ['beginner', 'intermediate', 'advanced', 'expert']
            }
        }],
        soft: [String],
        languages: [{
            name: String,
            proficiency: {
                type: String,
                enum: ['basic', 'intermediate', 'advanced', 'native']
            }
        }]
    },
    projects: [{
        name: String,
        description: String,
        technologies: [String],
        startDate: Date,
        endDate: Date,
        url: String,
        github: String,
        achievements: [String]
    }],
    certifications: [{
        name: String,
        issuer: String,
        date: Date,
        expiryDate: Date,
        credentialId: String,
        url: String
    }],
    achievements: [{
        title: String,
        date: Date,
        description: String
    }],
    references: [{
        name: String,
        position: String,
        company: String,
        email: String,
        phone: String,
        relationship: String
    }],
    template: {
        type: String,
        enum: ['modern', 'classic', 'minimal', 'professional'],
        default: 'modern'
    },
    styling: {
        primaryColor: String,
        secondaryColor: String,
        fontFamily: String,
        fontSize: String
    },
    visibility: {
        type: String,
        enum: ['public', 'private', 'selected'],
        default: 'private'
    },
    allowedViewers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    version: {
        type: Number,
        default: 1
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Method to get formatted resume
resumeSchema.methods.getFormattedResume = function() {
    return {
        personalInfo: this.personalInfo,
        education: this.education,
        experience: this.experience,
        skills: this.skills,
        projects: this.projects,
        certifications: this.certifications,
        achievements: this.achievements,
        references: this.references
    };
};

// Method to check if resume is viewable by user
resumeSchema.methods.isViewableBy = function(userId) {
    if (this.visibility === 'public') return true;
    if (this.visibility === 'private') return this.user.toString() === userId.toString();
    return this.allowedViewers.some(viewer => viewer.toString() === userId.toString());
};

// Method to increment version
resumeSchema.methods.incrementVersion = async function() {
    this.version += 1;
    this.lastUpdated = new Date();
    await this.save();
};

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume; 