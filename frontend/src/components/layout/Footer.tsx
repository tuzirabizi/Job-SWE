import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
  TextField,
  Button,
  IconButton,
  Stack,
  useTheme,
  Paper,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  YouTube,
  Send,
  LocationOn,
  Phone,
  Email,
  Copyright,
} from '@mui/icons-material';

const Footer: React.FC = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Platform",
      links: [
        { name: "Home", path: "/" },
        { name: "Learn", path: "/learning" },
        { name: "Talent Showcase", path: "/showcase" },
        { name: "Jobs", path: "/jobs" },
        { name: "Hire", path: "/hire" },
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", path: "/blog" },
        { name: "Career Advice", path: "/career-advice" },
        { name: "Success Stories", path: "/success-stories" },
        { name: "Webinars", path: "/webinars" },
        { name: "Help Center", path: "/help" },
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", path: "/about" },
        { name: "Our Team", path: "/team" },
        { name: "Careers", path: "/careers" },
        { name: "Press", path: "/press" },
        { name: "Contact Us", path: "/contact" },
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Terms of Service", path: "/terms" },
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Cookie Policy", path: "/cookies" },
        { name: "Accessibility", path: "/accessibility" },
        { name: "GDPR Compliance", path: "/gdpr" },
      ]
    }
  ];

  const socialMedia = [
    { icon: <Facebook />, name: "Facebook", url: "https://facebook.com" },
    { icon: <Twitter />, name: "Twitter", url: "https://twitter.com" },
    { icon: <LinkedIn />, name: "LinkedIn", url: "https://linkedin.com" },
    { icon: <Instagram />, name: "Instagram", url: "https://instagram.com" },
    { icon: <YouTube />, name: "YouTube", url: "https://youtube.com" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        mt: 'auto',
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      {/* Main Footer Content */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {/* Company Description and Contact Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              CareerHub
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 3 }}>
              Empowering career growth through integrated learning, job opportunities,
              and professional development with AI-driven personalization.
            </Typography>
            
            <Typography variant="subtitle2" gutterBottom fontWeight="bold">
              Contact Us
            </Typography>
            <Stack spacing={1}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  123 Career Street, Professional City
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  (555) 123-4567
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  support@careerhub.com
                </Typography>
              </Box>
            </Stack>
          </Grid>

          {/* Links Sections */}
          {footerLinks.map((section) => (
            <Grid item xs={6} sm={3} md={2} key={section.title}>
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                {section.title}
              </Typography>
              <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                {section.links.map((link) => (
                  <Box component="li" key={link.name} sx={{ py: 0.5 }}>
                    <Link
                      component={RouterLink}
                      to={link.path}
                      color="text.secondary"
                      sx={{ 
                        textDecoration: 'none',
                        '&:hover': { color: 'primary.main', textDecoration: 'underline' }
                      }}
                    >
                      {link.name}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Newsletter Signup */}
        <Paper 
          elevation={0}
          sx={{ 
            mt: 6, 
            p: 4, 
            bgcolor: theme.palette.background.default,
            borderRadius: 2
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Subscribe to Our Newsletter
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Stay updated with the latest career opportunities, courses, and industry insights.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter your email"
                  InputProps={{
                    sx: { borderRadius: 5 }
                  }}
                />
                <Button 
                  variant="contained" 
                  color="primary"
                  endIcon={<Send />}
                  sx={{ 
                    borderRadius: 5,
                    px: 3
                  }}
                >
                  Subscribe
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Social Media Links */}
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="subtitle2" gutterBottom>
            Connect With Us
          </Typography>
          <Stack 
            direction="row" 
            spacing={2} 
            justifyContent="center"
            sx={{ mt: 2 }}
          >
            {socialMedia.map((social) => (
              <IconButton
                key={social.name}
                component="a"
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                sx={{ 
                  color: 'text.secondary',
                  '&:hover': { 
                    color: 'primary.main',
                    transform: 'translateY(-3px)',
                    transition: 'all 0.2s ease-in-out'
                  }
                }}
              >
                {social.icon}
              </IconButton>
            ))}
          </Stack>
        </Box>
      </Container>

      {/* Bottom Bar */}
      <Box 
        sx={{ 
          bgcolor: theme.palette.background.default,
          py: 3,
        }}
      >
        <Container maxWidth="lg">
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Copyright fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  {currentYear} CareerHub. All rights reserved.
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Typography variant="body2" color="text.secondary">
                Made with ❤️ for career growth and success.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer; 