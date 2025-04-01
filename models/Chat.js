const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    attachments: [{
        type: String,
        url: String,
        name: String,
        size: Number,
        mimeType: String
    }],
    readBy: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        readAt: {
            type: Date,
            default: Date.now
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const chatSchema = new mongoose.Schema({
    participants: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        role: {
            type: String,
            enum: ['student', 'employer', 'talent', 'admin'],
            required: true
        },
        joinedAt: {
            type: Date,
            default: Date.now
        }
    }],
    messages: [messageSchema],
    lastMessage: {
        content: String,
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        createdAt: Date
    },
    type: {
        type: String,
        enum: ['direct', 'group', 'support'],
        default: 'direct'
    },
    name: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    avatar: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    metadata: {
        jobId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Job'
        },
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        },
        applicationId: {
            type: mongoose.Schema.Types.ObjectId
        }
    },
    settings: {
        notifications: {
            type: Boolean,
            default: true
        },
        muted: [{
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            until: Date
        }]
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

// Method to add a message
chatSchema.methods.addMessage = async function(senderId, content, attachments = []) {
    const message = {
        sender: senderId,
        content,
        attachments,
        readBy: [{ user: senderId }]
    };

    this.messages.push(message);
    this.lastMessage = {
        content,
        sender: senderId,
        createdAt: new Date()
    };
    this.updatedAt = new Date();

    await this.save();
    return message;
};

// Method to mark messages as read
chatSchema.methods.markAsRead = async function(userId) {
    const unreadMessages = this.messages.filter(message => 
        !message.readBy.some(read => read.user.toString() === userId.toString())
    );

    unreadMessages.forEach(message => {
        message.readBy.push({ user: userId });
    });

    await this.save();
};

// Method to get unread count
chatSchema.methods.getUnreadCount = function(userId) {
    return this.messages.filter(message => 
        !message.readBy.some(read => read.user.toString() === userId.toString())
    ).length;
};

// Method to check if user is muted
chatSchema.methods.isUserMuted = function(userId) {
    const mute = this.settings.muted.find(m => 
        m.user.toString() === userId.toString()
    );
    return mute && mute.until > new Date();
};

// Method to mute user
chatSchema.methods.muteUser = async function(userId, duration) {
    const mute = {
        user: userId,
        until: new Date(Date.now() + duration)
    };
    this.settings.muted.push(mute);
    await this.save();
};

// Method to unmute user
chatSchema.methods.unmuteUser = async function(userId) {
    this.settings.muted = this.settings.muted.filter(m => 
        m.user.toString() !== userId.toString()
    );
    await this.save();
};

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat; 