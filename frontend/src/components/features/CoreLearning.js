import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  LinearProgress,
  Chip,
  Rating,
  CircularProgress,
} from '@mui/material';

const CoreLearning = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCourses(mockCourses);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const mockCourses = [
    {
      id: 1,
      title: 'Frontend Development Fundamentals',
      progress: 75,
      rating: 4.5,
      skills: ['HTML', 'CSS', 'JavaScript'],
      format: 'Video',
      duration: '8 hours',
      level: 'Beginner',
    },
    {
      id: 2,
      title: 'Advanced React Patterns',
      progress: 30,
      rating: 4.8,
      skills: ['React', 'TypeScript', 'Redux'],
      format: 'Interactive',
      duration: '12 hours',
      level: 'Advanced',
    },
    {
      id: 3,
      title: 'UI/UX Design Principles',
      progress: 0,
      rating: 4.6,
      skills: ['Figma', 'Design Systems', 'User Testing'],
      format: 'Workshop',
      duration: '10 hours',
      level: 'Intermediate',
    }
  ];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Recommended Courses
      </Typography>
      
      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} md={6} lg={4} key={course.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>{course.title}</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {course.skills.map((skill) => (
                    <Chip key={skill} label={skill} size="small" />
                  ))}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Rating value={course.rating} precision={0.1} readOnly size="small" />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    ({course.rating})
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {course.duration} • {course.level}
                </Typography>
                {course.progress > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">Progress</Typography>
                      <Typography variant="body2" color="text.secondary">{course.progress}%</Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={course.progress}
                      sx={{ height: 6, borderRadius: 3, mt: 1 }}
                    />
                  </Box>
                )}
              </CardContent>
              <Box sx={{ p: 2, pt: 0 }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth
                >
                  {course.progress > 0 ? 'Continue' : 'Start Learning'}
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CoreLearning; 