import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Chip,
  Stack,
  Divider,
} from '@mui/material';
import {
  Search as SearchIcon,
  LocationOn,
  Work,
  AttachMoney,
  FilterList,
} from '@mui/icons-material';

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  const mockJobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'Tech Corp',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$120,000 - $150,000',
      description: 'Looking for an experienced frontend developer...',
      skills: ['React', 'TypeScript', 'Node.js'],
      posted: '2 days ago',
      applicants: 45,
      matchScore: 95,
    },
    {
      id: 2,
      title: 'Backend Developer',
      company: 'StartUp Inc',
      location: 'Remote',
      type: 'Full-time',
      salary: '$90,000 - $120,000',
      description: 'Join our growing team...',
      skills: ['Python', 'Django', 'PostgreSQL'],
      posted: '1 week ago',
      applicants: 32,
      matchScore: 88,
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery, 'in', location);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Job Opportunities
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <form onSubmit={handleSearch}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  placeholder="Search jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  InputProps={{
                    startAdornment: <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<FilterList />}
                  onClick={() => setFilterOpen(!filterOpen)}
                >
                  Filters
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {mockJobs.map((job) => (
            <Card key={job.id} sx={{ mb: 2 }}>
              <CardContent>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography variant="h6">{job.title}</Typography>
                      <Typography color="text.secondary">{job.company}</Typography>
                    </Box>
                    <Chip
                      label={`${job.matchScore}% Match`}
                      color="primary"
                      size="small"
                    />
                  </Box>
                  
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocationOn sx={{ mr: 0.5, color: 'text.secondary' }} />
                      <Typography variant="body2">{job.location}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Work sx={{ mr: 0.5, color: 'text.secondary' }} />
                      <Typography variant="body2">{job.type}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AttachMoney sx={{ mr: 0.5, color: 'text.secondary' }} />
                      <Typography variant="body2">{job.salary}</Typography>
                    </Box>
                  </Stack>

                  <Typography variant="body2" color="text.secondary">
                    {job.description}
                  </Typography>

                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Required Skills:
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      {job.skills.map((skill) => (
                        <Chip key={skill} label={skill} size="small" />
                      ))}
                    </Stack>
                  </Box>

                  <Divider />

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Posted {job.posted} • {job.applicants} applicants
                    </Typography>
                    <Button variant="contained" color="primary">
                      Apply Now
                    </Button>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Job Alerts
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Get notified when new jobs match your criteria
              </Typography>
              <Button variant="outlined" fullWidth>
                Set Up Alerts
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Jobs; 