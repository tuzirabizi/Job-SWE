import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Chip,
  useTheme,
} from '@mui/material';
import {
  Edit as EditIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  Add as AddIcon,
} from '@mui/icons-material';

interface Skill {
  id: string;
  name: string;
  level: string;
}

interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
}

const mockSkills: Skill[] = [
  { id: '1', name: 'React', level: 'Advanced' },
  { id: '2', name: 'TypeScript', level: 'Intermediate' },
  { id: '3', name: 'Node.js', level: 'Intermediate' },
];

const mockExperience: Experience[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'Tech Solutions Inc.',
    period: '2020 - Present',
    description: 'Leading frontend development team and implementing new features.',
  },
  {
    id: '2',
    title: 'Frontend Developer',
    company: 'Web Apps Co.',
    period: '2018 - 2020',
    description: 'Developed and maintained multiple web applications.',
  },
];

const Profile: React.FC = () => {
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    bio: 'Passionate developer with 5+ years of experience in web development.',
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Profile Header */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={3}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Avatar
                  sx={{
                    width: 150,
                    height: 150,
                    bgcolor: theme.palette.primary.main,
                  }}
                >
                  {profile.name.charAt(0)}
                </Avatar>
              </Box>
            </Grid>
            <Grid item xs={12} md={9}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="h4" gutterBottom>
                    {profile.name}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    Senior Frontend Developer
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {profile.bio}
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={isEditing ? handleSave : handleEdit}
                >
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {/* Contact Information */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Contact Information
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText primary="Email" secondary={profile.email} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PhoneIcon />
                  </ListItemIcon>
                  <ListItemText primary="Phone" secondary={profile.phone} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LocationIcon />
                  </ListItemIcon>
                  <ListItemText primary="Location" secondary={profile.location} />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Skills */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Skills
                </Typography>
                <IconButton size="small">
                  <AddIcon />
                </IconButton>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {mockSkills.map((skill) => (
                  <Chip
                    key={skill.id}
                    label={`${skill.name} (${skill.level})`}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Experience */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Experience
                </Typography>
                <IconButton size="small">
                  <AddIcon />
                </IconButton>
              </Box>
              <List>
                {mockExperience.map((exp) => (
                  <React.Fragment key={exp.id}>
                    <ListItem>
                      <ListItemIcon>
                        <WorkIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={exp.title}
                        secondary={
                          <>
                            <Typography component="span" variant="body2">
                              {exp.company}
                            </Typography>
                            {' • '}
                            <Typography component="span" variant="body2" color="text.secondary">
                              {exp.period}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        secondary={exp.description}
                        sx={{ pl: 7 }}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Edit Profile Form */}
      {isEditing && (
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Edit Profile
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Location"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Bio"
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default Profile; 