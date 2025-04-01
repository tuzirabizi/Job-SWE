const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['programming', 'design', 'business', 'marketing', 'data-science', 'other']
    },
    level: {
        type: String,
        required: true,
        enum: ['beginner', 'intermediate', 'advanced']
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    thumbnail: {
        type: String,
        required: true
    },
    duration: {
        type: Number, // in minutes
        required: true
    },
    lessons: [{
        title: String,
        description: String,
        videoUrl: String,
        duration: Number, // in minutes
        order: Number,
        resources: [{
            title: String,
            fileUrl: String,
            type: String // 'pdf', 'doc', 'zip', etc.
        }]
    }],
    prerequisites: [{
        type: String,
        trim: true
    }],
    objectives: [{
        type: String,
        trim: true
    }],
    skills: [{
        type: String,
        trim: true
    }],
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    reviews: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        comment: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    enrolledStudents: [{
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        enrolledAt: {
            type: Date,
            default: Date.now
        },
        progress: {
            type: Number,
            default: 0,
            min: 0,
            max: 100
        },
        completedLessons: [{
            type: mongoose.Schema.Types.ObjectId
        }]
    }],
    isPublished: {
        type: Boolean,
        default: false
    },
    publishedAt: Date,
    tags: [{
        type: String,
        trim: true
    }],
    certificate: {
        enabled: {
            type: Boolean,
            default: true
        },
        template: String
    },
    discount: {
        percentage: {
            type: Number,
            default: 0,
            min: 0,
            max: 100
        },
        validUntil: Date
    },
    language: {
        type: String,
        default: 'English'
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

// Method to calculate average rating
courseSchema.methods.calculateAverageRating = function() {
    if (this.reviews.length === 0) return 0;
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / this.reviews.length;
};

// Method to check if a student is enrolled
courseSchema.methods.isStudentEnrolled = function(studentId) {
    return this.enrolledStudents.some(enrollment => 
        enrollment.student.toString() === studentId.toString()
    );
};

// Method to get student progress
courseSchema.methods.getStudentProgress = function(studentId) {
    const enrollment = this.enrolledStudents.find(enrollment => 
        enrollment.student.toString() === studentId.toString()
    );
    return enrollment ? enrollment.progress : 0;
};

const Course = mongoose.model('Course', courseSchema);

module.exports = Course; 