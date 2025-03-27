const express = require('express');
const router = express.Router();

// @route    GET api/jobs
// @desc     Get all jobs
// @access   Public
router.get('/', (req, res) => {
  try {
    // Mock jobs data
    const jobs = [
      {
        id: 1,
        title: 'Frontend Developer',
        company: 'Tech Corp',
        location: 'New York, NY',
        type: 'Full-time',
        experience: 'Mid-level',
        salary: '$80,000 - $100,000',
        description: 'We are looking for a frontend developer...',
        requirements: 'React, JavaScript, HTML, CSS',
        createdAt: '2023-04-01T12:00:00Z'
      },
      {
        id: 2,
        title: 'Backend Developer',
        company: 'Software Inc',
        location: 'Remote',
        type: 'Full-time',
        experience: 'Senior',
        salary: '$110,000 - $140,000',
        description: 'We are looking for a backend developer...',
        requirements: 'Node.js, Express, MongoDB',
        createdAt: '2023-04-02T12:00:00Z'
      },
      {
        id: 3,
        title: 'UI/UX Designer',
        company: 'Design Studio',
        location: 'San Francisco, CA',
        type: 'Contract',
        experience: 'Junior',
        salary: '$70,000 - $90,000',
        description: 'We are looking for a UI/UX designer...',
        requirements: 'Figma, Adobe XD, Sketch',
        createdAt: '2023-04-03T12:00:00Z'
      }
    ];

    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    GET api/jobs/:id
// @desc     Get job by ID
// @access   Public
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    // Mock job data
    const job = {
      id: parseInt(id),
      title: 'Frontend Developer',
      company: 'Tech Corp',
      location: 'New York, NY',
      type: 'Full-time',
      experience: 'Mid-level',
      salary: '$80,000 - $100,000',
      description: 'We are looking for a talented frontend developer to join our team...',
      requirements: 'React, JavaScript, HTML, CSS',
      responsibilities: 'Build user interfaces, implement designs, optimize performance',
      benefits: 'Health insurance, 401k, remote work options',
      skills: ['React', 'JavaScript', 'HTML', 'CSS', 'Redux'],
      createdAt: '2023-04-01T12:00:00Z',
      employer: {
        id: 1,
        name: 'Tech Corp',
        logo: 'https://via.placeholder.com/150',
        website: 'https://example.com',
        location: 'New York, NY',
        about: 'Tech Corp is a leading technology company...'
      }
    };

    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    POST api/jobs/apply/:id
// @desc     Apply for a job
// @access   Private
router.post('/apply/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { coverLetter, resume } = req.body;

    // Mock application response
    res.json({
      success: true,
      message: 'Application submitted successfully',
      application: {
        id: 1,
        jobId: parseInt(id),
        userId: 1,
        status: 'Pending',
        appliedAt: new Date().toISOString()
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router; 