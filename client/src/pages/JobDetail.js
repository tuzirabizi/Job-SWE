import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  Work as WorkIcon,
  AttachMoney as MoneyIcon,
  Business as BusinessIcon,
  Description as DescriptionIcon,
  School as SchoolIcon,
  Star as StarIcon,
  Share as ShareIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon
} from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openApplyDialog, setOpenApplyDialog] = useState(false);
  const [applicationData, setApplicationData] = useState({
    coverLetter: '',
    resume: null,
    expectedSalary: '',
    availability: ''
  });
  const [applying, setApplying] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/jobs/${id}`);
      setJob(response.data);
      // Check if job is saved
      if (user) {
        const savedResponse = await axios.get(`/api/users/saved-jobs/${id}`);
        setSaved(savedResponse.data.saved);
      }
    } catch (error) {
      setError('Failed to load job details');
      console.error('Error fetching job details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveJob = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      await axios.post(`/api/jobs/${id}/save`);
      setSaved(!saved);
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: `Check out this job at ${job.employer.companyName}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Show success message
    }
  };

  const handleApply = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setOpenApplyDialog(true);
  };

  const handleApplicationSubmit = async () => {
    try {
      setApplying(true);
      const formData = new FormData();
      formData.append('coverLetter', applicationData.coverLetter);
      formData.append('resume', applicationData.resume);
      formData.append('expectedSalary', applicationData.expectedSalary);
      formData.append('availability', applicationData.availability);

      await axios.post(`/api/jobs/${id}/apply`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setOpenApplyDialog(false);
      // Show success message
    } catch (error) {
      setError('Failed to submit application');
      console.error('Error applying for job:', error);
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
                {job.title}
              </Typography>
              <Box>
                <Tooltip title="Save Job">
                  <IconButton onClick={handleSaveJob}>
                    {saved ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon />}
                  </IconButton>
                </Tooltip>
                <Tooltip title="Share">
                  <IconButton onClick={handleShare}>
                    <ShareIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <BusinessIcon sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="h6" color="text.secondary">
                {job.employer.companyName}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
              <Chip
                icon={<LocationIcon />}
                label={job.location}
                variant="outlined"
              />
              <Chip
                icon={<WorkIcon />}
                label={`${job.type} • ${job.experience}`}
                variant="outlined"
              />
              <Chip
                icon={<MoneyIcon />}
                label={`$${job.salary.min.toLocaleString()} - $${job.salary.max.toLocaleString()}`}
                variant="outlined"
              />
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Job Description
            </Typography>
            <Typography paragraph>
              {job.description}
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              Requirements
            </Typography>
            <List>
              {job.requirements.map((req, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <DescriptionIcon />
                  </ListItemIcon>
                  <ListItemText primary={req} />
                </ListItem>
              ))}
            </List>

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              Responsibilities
            </Typography>
            <List>
              {job.responsibilities.map((resp, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <WorkIcon />
                  </ListItemIcon>
                  <ListItemText primary={resp} />
                </ListItem>
              ))}
            </List>

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              Required Skills
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {job.skills.map((skill, index) => (
                <Chip key={index} label={skill} />
              ))}
            </Box>

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              Benefits
            </Typography>
            <List>
              {job.benefits.map((benefit, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <StarIcon />
                  </ListItemIcon>
                  <ListItemText primary={benefit} />
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, position: 'sticky', top: 20 }}>
              <Typography variant="h6" gutterBottom>
                Quick Info
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <BusinessIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Department"
                    secondary={job.department}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <SchoolIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Experience"
                    secondary={job.experience}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <WorkIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Employment Type"
                    secondary={job.type}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <MoneyIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Salary Range"
                    secondary={`$${job.salary.min.toLocaleString()} - $${job.salary.max.toLocaleString()}`}
                  />
                </ListItem>
              </List>

              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleApply}
                sx={{ mt: 2 }}
              >
                Apply Now
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Paper>

      <Dialog
        open={openApplyDialog}
        onClose={() => setOpenApplyDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Apply for {job.title}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Cover Letter"
            value={applicationData.coverLetter}
            onChange={(e) => setApplicationData({
              ...applicationData,
              coverLetter: e.target.value
            })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            type="file"
            label="Resume"
            onChange={(e) => setApplicationData({
              ...applicationData,
              resume: e.target.files[0]
            })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Expected Salary"
            type="number"
            value={applicationData.expectedSalary}
            onChange={(e) => setApplicationData({
              ...applicationData,
              expectedSalary: e.target.value
            })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Availability"
            value={applicationData.availability}
            onChange={(e) => setApplicationData({
              ...applicationData,
              availability: e.target.value
            })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenApplyDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleApplicationSubmit}
            disabled={applying}
          >
            {applying ? <CircularProgress size={24} /> : 'Submit Application'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default JobDetail; 