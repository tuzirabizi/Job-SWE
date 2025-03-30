import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Analytics: React.FC = () => {
  const theme = useTheme();

  // Learning Progress Data
  const learningData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Hours Spent Learning',
        data: [12, 19, 15, 25, 22, 30],
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.light,
        tension: 0.4,
      },
    ],
  };

  // Skills Distribution Data
  const skillsData = {
    labels: ['Frontend', 'Backend', 'Design', 'Database', 'DevOps'],
    datasets: [
      {
        data: [30, 25, 20, 15, 10],
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.secondary.main,
          theme.palette.success.main,
          theme.palette.warning.main,
          theme.palette.error.main,
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Analytics Dashboard
      </Typography>

      {/* Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Learning Hours
              </Typography>
              <Typography variant="h4">123</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Courses Completed
              </Typography>
              <Typography variant="h4">5</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Skills Acquired
              </Typography>
              <Typography variant="h4">12</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Job Applications
              </Typography>
              <Typography variant="h4">8</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Learning Progress Over Time
              </Typography>
              <Box sx={{ height: 300 }}>
                <Line data={learningData} options={chartOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Skills Distribution
              </Typography>
              <Box sx={{ height: 300 }}>
                <Doughnut data={skillsData} options={chartOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Detailed Statistics */}
      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Course Completion Rate
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    width: '100%',
                    height: 20,
                    bgcolor: 'grey.200',
                    borderRadius: 1,
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    sx={{
                      width: '75%',
                      height: '100%',
                      bgcolor: 'primary.main',
                    }}
                  />
                </Box>
                <Typography sx={{ ml: 2 }}>75%</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                3 out of 4 courses completed
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Learning Streak
              </Typography>
              <Typography variant="h4" color="primary" gutterBottom>
                7 Days
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Current streak of daily learning
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Analytics; 