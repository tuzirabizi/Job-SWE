const express = require('express');
const router = express.Router();

// @route    GET api/chat
// @desc     Get all chats for a user
// @access   Private
router.get('/', (req, res) => {
  try {
    // Mock chats data
    const chats = [
      {
        id: 1,
        type: 'employer',
        name: 'Tech Corp',
        avatar: 'https://via.placeholder.com/40',
        lastMessage: {
          text: 'We would like to schedule an interview.',
          timestamp: '2023-04-05T14:30:00Z',
          read: true
        },
        unreadCount: 0
      },
      {
        id: 2,
        type: 'employer',
        name: 'Software Inc',
        avatar: 'https://via.placeholder.com/40',
        lastMessage: {
          text: 'Thanks for your application!',
          timestamp: '2023-04-04T10:15:00Z',
          read: false
        },
        unreadCount: 3
      },
      {
        id: 3,
        type: 'ai',
        name: 'Career Assistant',
        avatar: 'https://via.placeholder.com/40',
        lastMessage: {
          text: 'Here are some tips for your interview.',
          timestamp: '2023-04-03T16:45:00Z',
          read: true
        },
        unreadCount: 0
      }
    ];

    res.json(chats);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    GET api/chat/:id/messages
// @desc     Get messages for a specific chat
// @access   Private
router.get('/:id/messages', (req, res) => {
  try {
    const { id } = req.params;
    
    // Mock messages data
    const messages = [
      {
        id: 1,
        chatId: parseInt(id),
        sender: {
          id: 2,
          name: 'Tech Corp',
          avatar: 'https://via.placeholder.com/40',
          type: 'employer'
        },
        text: 'Hello! We reviewed your application for the Frontend Developer position.',
        timestamp: '2023-04-05T14:00:00Z',
        read: true
      },
      {
        id: 2,
        chatId: parseInt(id),
        sender: {
          id: 2,
          name: 'Tech Corp',
          avatar: 'https://via.placeholder.com/40',
          type: 'employer'
        },
        text: 'We would like to schedule an interview with you.',
        timestamp: '2023-04-05T14:05:00Z',
        read: true
      },
      {
        id: 3,
        chatId: parseInt(id),
        sender: {
          id: 1,
          name: 'Test User',
          avatar: 'https://via.placeholder.com/40',
          type: 'user'
        },
        text: 'Great! I am available next week.',
        timestamp: '2023-04-05T14:10:00Z',
        read: true
      },
      {
        id: 4,
        chatId: parseInt(id),
        sender: {
          id: 2,
          name: 'Tech Corp',
          avatar: 'https://via.placeholder.com/40',
          type: 'employer'
        },
        text: 'How about Tuesday at 2 PM?',
        timestamp: '2023-04-05T14:15:00Z',
        read: true
      },
      {
        id: 5,
        chatId: parseInt(id),
        sender: {
          id: 1,
          name: 'Test User',
          avatar: 'https://via.placeholder.com/40',
          type: 'user'
        },
        text: 'That works for me!',
        timestamp: '2023-04-05T14:20:00Z',
        read: true
      },
      {
        id: 6,
        chatId: parseInt(id),
        sender: {
          id: 2,
          name: 'Tech Corp',
          avatar: 'https://via.placeholder.com/40',
          type: 'employer'
        },
        text: 'Great! We will send you a calendar invite.',
        timestamp: '2023-04-05T14:25:00Z',
        read: true
      },
      {
        id: 7,
        chatId: parseInt(id),
        sender: {
          id: 2,
          name: 'Tech Corp',
          avatar: 'https://via.placeholder.com/40',
          type: 'employer'
        },
        text: 'Looking forward to speaking with you!',
        timestamp: '2023-04-05T14:30:00Z',
        read: true
      }
    ];

    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    POST api/chat/:id/messages
// @desc     Send a message in a specific chat
// @access   Private
router.post('/:id/messages', (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    
    // Mock new message
    const newMessage = {
      id: 8,
      chatId: parseInt(id),
      sender: {
        id: 1,
        name: 'Test User',
        avatar: 'https://via.placeholder.com/40',
        type: 'user'
      },
      text,
      timestamp: new Date().toISOString(),
      read: false
    };

    res.json(newMessage);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router; 