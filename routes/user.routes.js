const express = require('express');
const router = express.Router();

// @route    GET api/users/profile
// @desc     Get current user profile
// @access   Private
router.get('/profile', (req, res) => {
  try {
    // Mock profile data
    res.json({
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      role: 'jobseeker',
      profilePicture: 'https://via.placeholder.com/150',
      location: 'New York, NY',
      bio: 'Experienced software developer',
      skills: ['JavaScript', 'React', 'Node.js'],
      experience: [
        {
          id: 1,
          title: 'Software Developer',
          company: 'Tech Co',
          location: 'New York, NY',
          from: '2020-01-01',
          to: null,
          current: true,
          description: 'Building web applications'
        }
      ],
      education: [
        {
          id: 1,
          school: 'University',
          degree: 'Bachelor of Science',
          fieldOfStudy: 'Computer Science',
          from: '2016-09-01',
          to: '2020-05-30',
          current: false
        }
      ]
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    PUT api/users/profile
// @desc     Update user profile
// @access   Private
router.put('/profile', (req, res) => {
  try {
    // Mock update response
    res.json({
      success: true,
      message: 'Profile updated successfully'
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router; 