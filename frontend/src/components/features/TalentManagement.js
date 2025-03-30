import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  LinearProgress,
  Chip,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from '@mui/material';
import {
  Person,
  EmojiEvents,
} from '@mui/icons-material';

const TalentManagement = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const mockEmployees = [
    {
      id: 1,
      name: 'John Doe',
      role: 'Senior Developer',
      department: 'Engineering',
      performance: 85,
      skills: ['React', 'Node.js', 'TypeScript'],
      goals: [
        { title: 'Complete Advanced React Course', progress: 75 },
        { title: 'Lead 2 Team Projects', progress: 50 },
      ],
      achievements: [
        'Employee of the Month - March 2024',
        'Completed AWS Certification',
      ],
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Product Manager',
      department: 'Product',
      performance: 92,
      skills: ['Product Strategy', 'Agile', 'User Research'],
      goals: [
        { title: 'Launch New Feature', progress: 90 },
        { title: 'Improve User Engagement', progress: 65 },
      ],
      achievements: [
        'Best Product Launch 2024',
        'Customer Satisfaction Award',
      ],
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Talent Management
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Employee Directory
              </Typography>
              <List>
                {mockEmployees.map((employee) => (
                  <React.Fragment key={employee.id}>
                    <ListItem
                      button
                      selected={selectedEmployee?.id === employee.id}
                      onClick={() => setSelectedEmployee(employee)}
                    >
                      <ListItemIcon>
                        <Person />
                      </ListItemIcon>
                      <ListItemText
                        primary={employee.name}
                        secondary={employee.role}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          {selectedEmployee && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {selectedEmployee.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {selectedEmployee.role} • {selectedEmployee.department}
                </Typography>
                
                <Box sx={{ my: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Performance Score
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={selectedEmployee.performance}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Skills
                  </Typography>
                  {selectedEmployee.skills.map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      size="small"
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Goals
                  </Typography>
                  {selectedEmployee.goals.map((goal) => (
                    <Box key={goal.title} sx={{ mb: 1 }}>
                      <Typography variant="body2">{goal.title}</Typography>
                      <LinearProgress
                        variant="determinate"
                        value={goal.progress}
                        sx={{ height: 6, borderRadius: 3 }}
                      />
                    </Box>
                  ))}
                </Box>

                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Achievements
                  </Typography>
                  <List>
                    {selectedEmployee.achievements.map((achievement) => (
                      <ListItem key={achievement}>
                        <ListItemIcon>
                          <EmojiEvents />
                        </ListItemIcon>
                        <ListItemText primary={achievement} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default TalentManagement; 