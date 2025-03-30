import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/Layout';
import CoreLearning from './components/features/CoreLearning';
import Jobs from './components/features/Jobs';
import TalentManagement from './components/features/TalentManagement';
import AnalyticsDashboard from './components/features/AnalyticsDashboard';
import ContentManagement from './components/features/ContentManagement';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<CoreLearning />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/talent" element={<TalentManagement />} />
            <Route path="/analytics" element={<AnalyticsDashboard userId="1" />} />
            <Route path="/admin/content" element={<ContentManagement />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App; 