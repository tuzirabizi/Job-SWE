import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Avatar,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  FormControlLabel,
  Chip,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  Description as DescriptionIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  PhotoCamera as PhotoCameraIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  Language as LanguageIcon
} from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

function Profile() {
  const { user, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    skills: [],
    experience: [],
    education: [],
    resume: null,
    profilePicture: null,
    preferences: {
      emailNotifications: true,
      jobAlerts: true,
      privacySettings: 'public',
      language: 'en'
    }
  });
  const [openSkillDialog, setOpenSkillDialog] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [openExperienceDialog, setOpenExperienceDialog] = useState(false);
  const [newExperience, setNewExperience] = useState({
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    description: ''
  });
  const [openEducationDialog, setOpenEducationDialog] = useState(false);
  const [newEducation, setNewEducation] = useState({
    school: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        ...profileData,
        ...user
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePreferenceChange = (e) => {
    const { name, checked } = e.target;
    setProfileData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [name]: checked
      }
    }));
  };

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('profilePicture', file);
        const response = await axios.post('/api/users/profile-picture', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setProfileData(prev => ({
          ...prev,
          profilePicture: response.data.profilePicture
        }));
        setSuccess('Profile picture updated successfully');
      } catch (error) {
        setError('Failed to update profile picture');
      }
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
      setOpenSkillDialog(false);
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleAddExperience = () => {
    setProfileData(prev => ({
      ...prev,
      experience: [...prev.experience, newExperience]
    }));
    setNewExperience({
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      description: ''
    });
    setOpenExperienceDialog(false);
  };

  const handleAddEducation = () => {
    setProfileData(prev => ({
      ...prev,
      education: [...prev.education, newEducation]
    }));
    setNewEducation({
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      description: ''
    });
    setOpenEducationDialog(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      await updateProfile(profileData);
      setSuccess('Profile updated successfully');
    } catch (error) {
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Avatar
                src={profileData.profilePicture}
                sx={{ width: 150, height: 150, mx: 'auto', mb: 2 }}
              />
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="profile-picture-input"
                type="file"
                onChange={handleProfilePictureChange}
              />
              <label htmlFor="profile-picture-input">
                <IconButton
                  color="primary"
                  component="span"
                  sx={{ position: 'relative', bottom: 40, right: 40 }}
                >
                  <PhotoCameraIcon />
                </IconButton>
              </label>
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Typography variant="h5" gutterBottom>
              Personal Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={profileData.location}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Bio"
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">
                Skills
              </Typography>
              <Button
                startIcon={<AddIcon />}
                onClick={() => setOpenSkillDialog(true)}
              >
                Add Skill
              </Button>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {profileData.skills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  onDelete={() => handleRemoveSkill(skill)}
                />
              ))}
            </Box>
          </Paper>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">
                Experience
              </Typography>
              <Button
                startIcon={<AddIcon />}
                onClick={() => setOpenExperienceDialog(true)}
              >
                Add Experience
              </Button>
            </Box>
            <List>
              {profileData.experience.map((exp, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <WorkIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={exp.title}
                    secondary={`${exp.company} • ${exp.location} • ${exp.startDate} - ${exp.endDate}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">
                Education
              </Typography>
              <Button
                startIcon={<AddIcon />}
                onClick={() => setOpenEducationDialog(true)}
              >
                Add Education
              </Button>
            </Box>
            <List>
              {profileData.education.map((edu, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <SchoolIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`${edu.degree} in ${edu.field}`}
                    secondary={`${edu.school} • ${edu.startDate} - ${edu.endDate}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Preferences
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={profileData.preferences.emailNotifications}
                  onChange={handlePreferenceChange}
                  name="emailNotifications"
                />
              }
              label="Email Notifications"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={profileData.preferences.jobAlerts}
                  onChange={handlePreferenceChange}
                  name="jobAlerts"
                />
              }
              label="Job Alerts"
            />
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Security Settings
            </Typography>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<SecurityIcon />}
              sx={{ mb: 2 }}
            >
              Change Password
            </Button>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<LanguageIcon />}
            >
              Language Preferences
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, textAlign: 'right' }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          size="large"
        >
          {loading ? <CircularProgress size={24} /> : 'Save Changes'}
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {success}
        </Alert>
      )}

      {/* Add Skill Dialog */}
      <Dialog open={openSkillDialog} onClose={() => setOpenSkillDialog(false)}>
        <DialogTitle>Add New Skill</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Skill"
            fullWidth
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSkillDialog(false)}>Cancel</Button>
          <Button onClick={handleAddSkill} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Experience Dialog */}
      <Dialog open={openExperienceDialog} onClose={() => setOpenExperienceDialog(false)}>
        <DialogTitle>Add New Experience</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            fullWidth
            value={newExperience.title}
            onChange={(e) => setNewExperience({
              ...newExperience,
              title: e.target.value
            })}
          />
          <TextField
            margin="dense"
            label="Company"
            fullWidth
            value={newExperience.company}
            onChange={(e) => setNewExperience({
              ...newExperience,
              company: e.target.value
            })}
          />
          <TextField
            margin="dense"
            label="Location"
            fullWidth
            value={newExperience.location}
            onChange={(e) => setNewExperience({
              ...newExperience,
              location: e.target.value
            })}
          />
          <TextField
            margin="dense"
            label="Start Date"
            type="date"
            fullWidth
            value={newExperience.startDate}
            onChange={(e) => setNewExperience({
              ...newExperience,
              startDate: e.target.value
            })}
          />
          <TextField
            margin="dense"
            label="End Date"
            type="date"
            fullWidth
            value={newExperience.endDate}
            onChange={(e) => setNewExperience({
              ...newExperience,
              endDate: e.target.value
            })}
          />
          <TextField
            margin="dense"
            label="Description"
            multiline
            rows={4}
            fullWidth
            value={newExperience.description}
            onChange={(e) => setNewExperience({
              ...newExperience,
              description: e.target.value
            })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenExperienceDialog(false)}>Cancel</Button>
          <Button onClick={handleAddExperience} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Education Dialog */}
      <Dialog open={openEducationDialog} onClose={() => setOpenEducationDialog(false)}>
        <DialogTitle>Add New Education</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="School"
            fullWidth
            value={newEducation.school}
            onChange={(e) => setNewEducation({
              ...newEducation,
              school: e.target.value
            })}
          />
          <TextField
            margin="dense"
            label="Degree"
            fullWidth
            value={newEducation.degree}
            onChange={(e) => setNewEducation({
              ...newEducation,
              degree: e.target.value
            })}
          />
          <TextField
            margin="dense"
            label="Field of Study"
            fullWidth
            value={newEducation.field}
            onChange={(e) => setNewEducation({
              ...newEducation,
              field: e.target.value
            })}
          />
          <TextField
            margin="dense"
            label="Start Date"
            type="date"
            fullWidth
            value={newEducation.startDate}
            onChange={(e) => setNewEducation({
              ...newEducation,
              startDate: e.target.value
            })}
          />
          <TextField
            margin="dense"
            label="End Date"
            type="date"
            fullWidth
            value={newEducation.endDate}
            onChange={(e) => setNewEducation({
              ...newEducation,
              endDate: e.target.value
            })}
          />
          <TextField
            margin="dense"
            label="Description"
            multiline
            rows={4}
            fullWidth
            value={newEducation.description}
            onChange={(e) => setNewEducation({
              ...newEducation,
              description: e.target.value
            })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEducationDialog(false)}>Cancel</Button>
          <Button onClick={handleAddEducation} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Profile; 