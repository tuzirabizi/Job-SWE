require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const sequelize = require('./server/config/database');

// Import routes
const authRoutes = require('./routes/auth.routes');
const courseRoutes = require('./routes/course.routes');
const jobRoutes = require('./routes/job.routes');
const talentRoutes = require('./routes/talent.routes');
const studentRoutes = require('./routes/student.routes');
const chatRoutes = require('./routes/chat.routes');
const resumeRoutes = require('./routes/resume.routes');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname)));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/crimble', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/talents', talentRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/resume', resumeRoutes);

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('join-chat', (chatId) => {
        socket.join(chatId);
    });

    socket.on('send-message', (message) => {
        io.to(message.chatId).emit('receive-message', message);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Database connection and server start
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('Connected to PostgreSQL database');

    // Sync database (create tables if they don't exist)
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    console.log('Database synchronized');

    // Start server
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
}

startServer();

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Basic route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'employer-dashboard.html'));
}); 