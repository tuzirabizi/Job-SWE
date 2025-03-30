import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Work as WorkIcon,
  LocationOn as LocationIcon,
  AttachMoney as MoneyIcon,
} from '@mui/icons-material';

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    job_type: '',
    salary_range: '',
    description: '',
    requirements: '',
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch('/api/jobs', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }

        const data = await response.json();
        setJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserRole = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await fetch('/api/user/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserRole(data.role);
        }
      } catch (err) {
        console.error('Error fetching user role:', err);
      }
    };

    fetchJobs();
    fetchUserRole();
  }, []);

  const handleOpenDialog = (job = null) => {
    if (job) {
      setFormData(job);
      setSelectedJob(job);
    } else {
      setFormData({
        title: '',
        company: '',
        location: '',
        job_type: '',
        salary_range: '',
        description: '',
        requirements: '',
      });
      setSelectedJob(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedJob(null);
  };

  const handleMenuClick = (event, job) => {
    setAnchorEl(event.currentTarget);
    setSelectedJob(job);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedJob(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const url = selectedJob
        ? `/api/jobs/${selectedJob.id}`
        : '/api/jobs';
      const method = selectedJob ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save job');
      }

      const updatedJob = await response.json();
      if (selectedJob) {
        setJobs(jobs.map(job =>
          job.id === selectedJob.id ? updatedJob : job
        ));
      } else {
        setJobs([...jobs, updatedJob]);
      }

      handleCloseDialog();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/jobs/${selectedJob.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete job');
      }

      setJobs(jobs.filter(job => job.id !== selectedJob.id));
      handleMenuClose();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography>Loading jobs...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error" variant="h6">
          Error: {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4">
          <WorkIcon sx={{ mr: 1 }} />
          Jobs
        </Typography>
        {userRole === 'employer' && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Post New Job
          </Button>
        )}
      </Box>

      <Grid container spacing={3}>
        {jobs.map((job) => (
          <Grid item xs={12} md={6} key={job.id}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                  <Typography variant="h6" gutterBottom>
                    {job.title}
                  </Typography>
                  {userRole === 'employer' && (
                    <IconButton onClick={(e) => handleMenuClick(e, job)}>
                      <MoreVertIcon />
                    </IconButton>
                  )}
                </Box>
                <Typography color="textSecondary" gutterBottom>
                  {job.company}
                </Typography>
                <Box display="flex" gap={1} mb={2}>
                  <Chip
                    icon={<LocationIcon />}
                    label={job.location}
                    size="small"
                  />
                  <Chip
                    icon={<MoneyIcon />}
                    label={job.salary_range}
                    size="small"
                  />
                  <Chip
                    label={job.job_type}
                    size="small"
                  />
                </Box>
                <Typography variant="body2" color="textSecondary" paragraph>
                  {job.description.substring(0, 150)}...
                </Typography>
              </CardContent>
              <CardActions>
                {userRole === 'student' && (
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => {/* Handle apply */}}
                  >
                    Apply Now
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {
          handleMenuClose();
          handleOpenDialog(selectedJob);
        }}>
          <EditIcon sx={{ mr: 1 }} /> Edit
        </MenuItem>
        <MenuItem onClick={() => {
          handleMenuClose();
          handleDelete();
        }}>
          <DeleteIcon sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Menu>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedJob ? 'Edit Job' : 'Post New Job'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Job Title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Job Type</InputLabel>
                  <Select
                    name="job_type"
                    value={formData.job_type}
                    onChange={handleInputChange}
                    label="Job Type"
                  >
                    <MenuItem value="Full-time">Full-time</MenuItem>
                    <MenuItem value="Part-time">Part-time</MenuItem>
                    <MenuItem value="Contract">Contract</MenuItem>
                    <MenuItem value="Internship">Internship</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Salary Range"
                  name="salary_range"
                  value={formData.salary_range}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  multiline
                  rows={4}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Requirements"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  multiline
                  rows={4}
                  required
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {selectedJob ? 'Update' : 'Post'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Jobs; 