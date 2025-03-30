import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  LinearProgress,
  Tabs,
  Tab,
  useTheme,
} from '@mui/material';
import {
  PlayCircle as PlayIcon,
  CheckCircle as CheckIcon,
  Lock as LockIcon,
} from '@mui/icons-material';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: string;
  progress: number;
  image: string;
  tags: string[];
  isLocked: boolean;
}

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Advanced React Development',
    description: 'Master modern React patterns and best practices for building scalable applications.',
    instructor: 'John Doe',
    duration: '8 weeks',
    level: 'Advanced',
    progress: 75,
    image: '/images/react-course.jpg',
    tags: ['React', 'TypeScript', 'State Management'],
    isLocked: false,
  },
  {
    id: '2',
    title: 'UI/UX Design Fundamentals',
    description: 'Learn the principles of user interface and experience design.',
    instructor: 'Jane Smith',
    duration: '6 weeks',
    level: 'Beginner',
    progress: 0,
    image: '/images/design-course.jpg',
    tags: ['UI/UX', 'Design', 'Prototyping'],
    isLocked: true,
  },
  // Add more mock courses as needed
];

const Learning: React.FC = () => {
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Learning Center
      </Typography>

      {/* Progress Overview */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Your Learning Progress
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="primary">
                  75%
                </Typography>
                <Typography color="text.secondary">
                  Overall Progress
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="primary">
                  3/5
                </Typography>
                <Typography color="text.secondary">
                  Courses Completed
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="primary">
                  24
                </Typography>
                <Typography color="text.secondary">
                  Hours of Learning
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Course Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab label="In Progress" />
          <Tab label="Available Courses" />
          <Tab label="Completed" />
        </Tabs>
      </Box>

      {/* Course Grid */}
      <Grid container spacing={3}>
        {mockCourses.map((course) => (
          <Grid item xs={12} md={6} key={course.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={course.image}
                alt={course.title}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {course.title}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  {course.instructor} • {course.duration} • {course.level}
                </Typography>
                <Typography variant="body2" paragraph>
                  {course.description}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {course.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      sx={{ bgcolor: 'primary.light', color: 'white' }}
                    />
                  ))}
                </Box>
                {!course.isLocked && (
                  <Box sx={{ mb: 2 }}>
                    <LinearProgress
                      variant="determinate"
                      value={course.progress}
                      sx={{ mb: 1 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {course.progress}% Complete
                    </Typography>
                  </Box>
                )}
                <Button
                  variant="contained"
                  startIcon={course.isLocked ? <LockIcon /> : <PlayIcon />}
                  disabled={course.isLocked}
                >
                  {course.isLocked ? 'Locked' : 'Continue Learning'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Learning Paths Section */}
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Recommended Learning Paths
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Frontend Development
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Master modern frontend development with React, TypeScript, and best practices.
                </Typography>
                <Button variant="outlined" color="primary">
                  View Path
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  UI/UX Design
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Learn the fundamentals of user interface and experience design.
                </Typography>
                <Button variant="outlined" color="primary">
                  View Path
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Backend Development
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Build scalable backend services with Node.js and Express.
                </Typography>
                <Button variant="outlined" color="primary">
                  View Path
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Learning; 