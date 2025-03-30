import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
} from '@mui/material';
import {
  Work as WorkIcon,
  School as SchoolIcon,
  Person as PersonIcon,
  Event as EventIcon,
} from '@mui/icons-material';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch('/api/user/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
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

  const renderStudentDashboard = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            <WorkIcon sx={{ mr: 1 }} />
            Job Applications
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Senior Frontend Developer"
                secondary="Tech Corp - Pending"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Full Stack Developer"
                secondary="StartupX - Under Review"
              />
            </ListItem>
          </List>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/jobs')}
            sx={{ mt: 2 }}
          >
            View All Jobs
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            <SchoolIcon sx={{ mr: 1 }} />
            Enrolled Courses
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Web Development Fundamentals"
                secondary="In Progress - 60% Complete"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Advanced React Patterns"
                secondary="Not Started"
              />
            </ListItem>
          </List>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/courses')}
            sx={{ mt: 2 }}
          >
            Browse Courses
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );

  const renderTalentDashboard = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            <EventIcon sx={{ mr: 1 }} />
            Upcoming Appointments
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Mentoring Session"
                secondary="Tomorrow at 2:00 PM"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Code Review"
                secondary="Next Week - Monday"
              />
            </ListItem>
          </List>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/appointments')}
            sx={{ mt: 2 }}
          >
            Manage Appointments
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            <SchoolIcon sx={{ mr: 1 }} />
            Your Courses
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Web Development Fundamentals"
                secondary="12 Students Enrolled"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Advanced React Patterns"
                secondary="8 Students Enrolled"
              />
            </ListItem>
          </List>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/courses/manage')}
            sx={{ mt: 2 }}
          >
            Manage Courses
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );

  const renderEmployerDashboard = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            <WorkIcon sx={{ mr: 1 }} />
            Job Postings
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Senior Frontend Developer"
                secondary="5 Applications - 2 New"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Full Stack Developer"
                secondary="3 Applications - 1 New"
              />
            </ListItem>
          </List>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/jobs/manage')}
            sx={{ mt: 2 }}
          >
            Manage Jobs
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            <PersonIcon sx={{ mr: 1 }} />
            Recent Applications
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="John Doe"
                secondary="Senior Frontend Developer - Pending Review"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Jane Smith"
                secondary="Full Stack Developer - Under Review"
              />
            </ListItem>
          </List>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/applications')}
            sx={{ mt: 2 }}
          >
            View All Applications
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.full_name || 'User'}
      </Typography>
      {user?.role === 'student' && renderStudentDashboard()}
      {user?.role === 'talent' && renderTalentDashboard()}
      {user?.role === 'employer' && renderEmployerDashboard()}
    </Container>
  );
}

export default Dashboard; 