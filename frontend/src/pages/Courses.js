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
  Rating,
  LinearProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  School as SchoolIcon,
  Person as PersonIcon,
  AccessTime as TimeIcon,
  Star as StarIcon,
} from '@mui/icons-material';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    level: '',
    category: '',
    prerequisites: '',
    syllabus: '',
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch('/api/courses', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }

        const data = await response.json();
        setCourses(data);
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

    fetchCourses();
    fetchUserRole();
  }, []);

  const handleOpenDialog = (course = null) => {
    if (course) {
      setFormData(course);
      setSelectedCourse(course);
    } else {
      setFormData({
        title: '',
        description: '',
        price: '',
        duration: '',
        level: '',
        category: '',
        prerequisites: '',
        syllabus: '',
      });
      setSelectedCourse(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCourse(null);
  };

  const handleMenuClick = (event, course) => {
    setAnchorEl(event.currentTarget);
    setSelectedCourse(course);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCourse(null);
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
      const url = selectedCourse
        ? `/api/courses/${selectedCourse.id}`
        : '/api/courses';
      const method = selectedCourse ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save course');
      }

      const updatedCourse = await response.json();
      if (selectedCourse) {
        setCourses(courses.map(course =>
          course.id === selectedCourse.id ? updatedCourse : course
        ));
      } else {
        setCourses([...courses, updatedCourse]);
      }

      handleCloseDialog();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/courses/${selectedCourse.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete course');
      }

      setCourses(courses.filter(course => course.id !== selectedCourse.id));
      handleMenuClose();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEnroll = async (courseId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/courses/${courseId}/enroll`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to enroll in course');
      }

      // Refresh courses to update enrollment status
      const updatedResponse = await fetch('/api/courses', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const updatedCourses = await updatedResponse.json();
      setCourses(updatedCourses);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography>Loading courses...</Typography>
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
          <SchoolIcon sx={{ mr: 1 }} />
          Courses
        </Typography>
        {userRole === 'talent' && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Create New Course
          </Button>
        )}
      </Box>

      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} md={6} key={course.id}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                  <Typography variant="h6" gutterBottom>
                    {course.title}
                  </Typography>
                  {userRole === 'talent' && (
                    <IconButton onClick={(e) => handleMenuClick(e, course)}>
                      <MoreVertIcon />
                    </IconButton>
                  )}
                </Box>
                <Typography color="textSecondary" gutterBottom>
                  {course.description.substring(0, 150)}...
                </Typography>
                <Box display="flex" gap={1} mb={2}>
                  <Chip
                    icon={<TimeIcon />}
                    label={course.duration}
                    size="small"
                  />
                  <Chip
                    label={course.level}
                    size="small"
                  />
                  <Chip
                    label={course.category}
                    size="small"
                  />
                </Box>
                <Box display="flex" alignItems="center" mb={1}>
                  <Rating value={course.rating || 0} readOnly size="small" />
                  <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
                    ({course.review_count || 0} reviews)
                  </Typography>
                </Box>
                <Typography variant="h6" color="primary" gutterBottom>
                  ${course.price}
                </Typography>
                {course.enrollment_status === 'enrolled' && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Progress: {course.progress || 0}%
                    </Typography>
                    <LinearProgress variant="determinate" value={course.progress || 0} />
                  </Box>
                )}
              </CardContent>
              <CardActions>
                {userRole === 'student' && (
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handleEnroll(course.id)}
                    disabled={course.enrollment_status === 'enrolled'}
                  >
                    {course.enrollment_status === 'enrolled' ? 'Enrolled' : 'Enroll Now'}
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
          handleOpenDialog(selectedCourse);
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
          {selectedCourse ? 'Edit Course' : 'Create New Course'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Course Title"
                  name="title"
                  value={formData.title}
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
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Level</InputLabel>
                  <Select
                    name="level"
                    value={formData.level}
                    onChange={handleInputChange}
                    label="Level"
                  >
                    <MenuItem value="Beginner">Beginner</MenuItem>
                    <MenuItem value="Intermediate">Intermediate</MenuItem>
                    <MenuItem value="Advanced">Advanced</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    label="Category"
                  >
                    <MenuItem value="Programming">Programming</MenuItem>
                    <MenuItem value="Design">Design</MenuItem>
                    <MenuItem value="Business">Business</MenuItem>
                    <MenuItem value="Marketing">Marketing</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Prerequisites"
                  name="prerequisites"
                  value={formData.prerequisites}
                  onChange={handleInputChange}
                  multiline
                  rows={2}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Syllabus"
                  name="syllabus"
                  value={formData.syllabus}
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
            {selectedCourse ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Courses; 