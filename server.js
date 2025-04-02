const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Mock user data
const users = [
    {
        id: 1,
        email: 'admin@crimble.com',
        password: 'admin123',
        role: 'admin',
        name: 'Admin User'
    },
    {
        id: 2,
        email: 'student@crimble.com',
        password: 'student123',
        role: 'student',
        name: 'Student User'
    },
    {
        id: 3,
        email: 'employer@crimble.com',
        password: 'employer123',
        role: 'employer',
        name: 'Employer User'
    },
    {
        id: 4,
        email: 'talent@crimble.com',
        password: 'talent123',
        role: 'talent',
        name: 'Talent User'
    },
    {
        id: 5,
        email: 'creator@crimble.com',
        password: 'creator123',
        role: 'creator',
        name: 'Course Creator'
    }
];

// Authentication middleware
const requireAuth = (req, res, next) => {
    if (!req.session || !req.session.userId) {
        return res.redirect('/index.html');
    }
    next();
};

// Role-based access middleware
const requireRole = (role) => {
    return (req, res, next) => {
        if (req.session && req.session.role === role) {
            next();
        } else {
            res.status(403).json({
                success: false,
                message: 'Access denied. Please log in to access this feature.'
            });
        }
    };
};

// Authentication route
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Store user session
        req.session = { userId: user.id, role: user.role };
        
        // Always redirect to community page first
        res.json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                role: user.role
            },
            redirect: '/community.html'
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Invalid email or password'
        });
    }
});

// Protected routes
app.get('/api/community', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'public/community.html'));
});

app.get('/api/dashboard/:role', requireAuth, requireRole, (req, res) => {
    const { role } = req.params;
    const dashboardMap = {
        student: 'student-dashboard.html',
        talent: 'talent-dashboard.html',
        employer: 'employer-dashboard.html',
        creator: 'creator-dashboard.html',
        admin: 'admin-dashboard.html'
    };

    if (dashboardMap[role]) {
        res.sendFile(path.join(__dirname, 'public', dashboardMap[role]));
    } else {
        res.status(404).send('Dashboard not found');
    }
});

// Root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!'
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 