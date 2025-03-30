import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  skills: string[];
  postedDate: string;
}

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'Tech Solutions Inc.',
    location: 'New York, NY',
    type: 'Full-time',
    description: 'We are looking for an experienced Frontend Developer to join our team...',
    skills: ['React', 'TypeScript', 'Material-UI'],
    postedDate: '2024-03-30',
  },
  {
    id: '2',
    title: 'UX Designer',
    company: 'Creative Design Co.',
    location: 'Remote',
    type: 'Contract',
    description: 'Join our design team to create beautiful and intuitive user experiences...',
    skills: ['Figma', 'UI/UX', 'Prototyping'],
    postedDate: '2024-03-29',
  },
  // Add more mock jobs as needed
];

const Jobs: React.FC = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [jobType, setJobType] = useState('all');

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = jobType === 'all' || job.type.toLowerCase() === jobType.toLowerCase();
    return matchesSearch && matchesType;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Find Your Next Job
      </Typography>

      {/* Search and Filter Section */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search jobs by title, company, or location"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Job Type</InputLabel>
              <Select
                value={jobType}
                label="Job Type"
                onChange={(e) => setJobType(e.target.value)}
              >
                <MenuItem value="all">All Types</MenuItem>
                <MenuItem value="full-time">Full-time</MenuItem>
                <MenuItem value="part-time">Part-time</MenuItem>
                <MenuItem value="contract">Contract</MenuItem>
                <MenuItem value="internship">Internship</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<SearchIcon />}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Job Listings */}
      <Grid container spacing={3}>
        {filteredJobs.map((job) => (
          <Grid item xs={12} key={job.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  {job.title}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  {job.company} • {job.location} • {job.type}
                </Typography>
                <Typography variant="body2" paragraph>
                  {job.description}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {job.skills.map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      size="small"
                      sx={{ bgcolor: 'primary.light', color: 'white' }}
                    />
                  ))}
                </Box>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Learn More
                </Button>
                <Button size="small" color="primary">
                  Apply Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* No Results Message */}
      {filteredJobs.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No jobs found matching your criteria. Try adjusting your search filters.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Jobs; 