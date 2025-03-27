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
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  CircularProgress,
  Tabs,
  Tab,
  Chip,
  IconButton,
  Tooltip,
  Divider
} from '@mui/material';
import {
  Work as WorkIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  Description as DescriptionIcon,
  AttachMoney as MoneyIcon,
  Star as StarIcon,
  Bookmark as BookmarkIcon,
  Chat as ChatIcon,
  Notifications as NotificationsIcon,
  Assessment as AssessmentIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [dashboardData, setDashboardData] = useState({
    applications: [],
    savedJobs: [],
    recommendedJobs: [],
    messages: [],
    notifications: [],
    stats: {
      totalApplications: 0,
      activeApplications: 0,
      savedJobs: 0,
      unreadMessages: 0,
      unreadNotifications: 0
    }
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/dashboard');
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const JobSeekerDashboard = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Your Applications
          </Typography>
          <List>
            {dashboardData.applications.map((application) => (
              <React.Fragment key={application.id}>
                <ListItem>
                  <ListItemIcon>
                    <WorkIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={application.job.title}
                    secondary={`${application.job.employer.companyName} • Applied ${new Date(application.appliedAt).toLocaleDateString()}`}
                  />
                  <Chip
                    label={application.status}
                    color={
                      application.status === 'pending' ? 'default' :
                      application.status === 'reviewed' ? 'primary' :
                      application.status === 'shortlisted' ? 'success' :
                      application.status === 'rejected' ? 'error' :
                      'default'
                    }
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => navigate('/jobs')}
            sx={{ mt: 2 }}
          >
            Browse More Jobs
          </Button>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Recommended Jobs
          </Typography>
          <List>
            {dashboardData.recommendedJobs.map((job) => (
              <React.Fragment key={job.id}>
                <ListItem>
                  <ListItemIcon>
                    <WorkIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={job.title}
                    secondary={`${job.employer.companyName} • ${job.location}`}
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => navigate(`/jobs/${job.id}`)}
                  >
                    View
                  </Button>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Quick Stats
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Active Applications
                  </Typography>
                  <Typography variant="h4">
                    {dashboardData.stats.activeApplications}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Saved Jobs
                  </Typography>
                  <Typography variant="h4">
                    {dashboardData.stats.savedJobs}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Recent Messages
          </Typography>
          <List>
            {dashboardData.messages.slice(0, 3).map((message) => (
              <ListItem key={message.id}>
                <ListItemIcon>
                  <ChatIcon />
                </ListItemIcon>
                <ListItemText
                  primary={message.sender}
                  secondary={message.preview}
                />
              </ListItem>
            ))}
          </List>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => navigate('/messages')}
            sx={{ mt: 2 }}
          >
            View All Messages
          </Button>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Notifications
          </Typography>
          <List>
            {dashboardData.notifications.slice(0, 3).map((notification) => (
              <ListItem key={notification.id}>
                <ListItemIcon>
                  <NotificationsIcon />
                </ListItemIcon>
                <ListItemText
                  primary={notification.title}
                  secondary={notification.message}
                />
              </ListItem>
            ))}
          </List>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => navigate('/notifications')}
            sx={{ mt: 2 }}
          >
            View All Notifications
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );

  const EmployerDashboard = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6">
              Recent Applications
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/employer/post-job')}
            >
              Post New Job
            </Button>
          </Box>
          <List>
            {dashboardData.applications.map((application) => (
              <React.Fragment key={application.id}>
                <ListItem>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={application.candidate.name}
                    secondary={`Applied for ${application.job.title} • ${new Date(application.appliedAt).toLocaleDateString()}`}
                  />
                  <Box>
                    <Chip
                      label={application.status}
                      color={
                        application.status === 'pending' ? 'default' :
                        application.status === 'reviewed' ? 'primary' :
                        application.status === 'shortlisted' ? 'success' :
                        application.status === 'rejected' ? 'error' :
                        'default'
                      }
                      sx={{ mr: 1 }}
                    />
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => navigate(`/employer/applications/${application.id}`)}
                    >
                      Review
                    </Button>
                  </Box>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Active Job Postings
          </Typography>
          <List>
            {dashboardData.activeJobs?.map((job) => (
              <React.Fragment key={job.id}>
                <ListItem>
                  <ListItemIcon>
                    <WorkIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={job.title}
                    secondary={`${job.applications.length} applications • Posted ${new Date(job.createdAt).toLocaleDateString()}`}
                  />
                  <Box>
                    <Tooltip title="View Applications">
                      <IconButton onClick={() => navigate(`/employer/jobs/${job.id}/applications`)}>
                        <DescriptionIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Job">
                      <IconButton onClick={() => navigate(`/employer/jobs/${job.id}/edit`)}>
                        <AssessmentIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Company Overview
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Active Jobs
                  </Typography>
                  <Typography variant="h4">
                    {dashboardData.stats.activeJobs}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Total Applications
                  </Typography>
                  <Typography variant="h4">
                    {dashboardData.stats.totalApplications}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Recent Messages
          </Typography>
          <List>
            {dashboardData.messages.slice(0, 3).map((message) => (
              <ListItem key={message.id}>
                <ListItemIcon>
                  <ChatIcon />
                </ListItemIcon>
                <ListItemText
                  primary={message.sender}
                  secondary={message.preview}
                />
              </ListItem>
            ))}
          </List>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => navigate('/messages')}
            sx={{ mt: 2 }}
          >
            View All Messages
          </Button>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Company Analytics
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <TrendingUpIcon />
              </ListItemIcon>
              <ListItemText
                primary="Job Views"
                secondary={`${dashboardData.stats.jobViews} this month`}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <StarIcon />
              </ListItemIcon>
              <ListItemText
                primary="Average Application Rate"
                secondary={`${dashboardData.stats.applicationRate}%`}
              />
            </ListItem>
          </List>
        </Paper>
      </Grid>
    </Grid>
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome back, {user.firstName}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's what's happening with your {user.role === 'candidate' ? 'job search' : 'company'}
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Overview" />
          <Tab label="Messages" />
          <Tab label="Settings" />
        </Tabs>
      </Box>

      {activeTab === 0 && (
        user.role === 'candidate' ? <JobSeekerDashboard /> : <EmployerDashboard />
      )}
    </Container>
  );
}

export default Dashboard; 