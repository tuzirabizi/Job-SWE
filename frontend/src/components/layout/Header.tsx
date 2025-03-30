import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Badge,
  InputBase,
  Box,
  Divider,
  Typography,
  Container,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home,
  School,
  Work,
  People,
  EmojiPeople,
  Notifications,
  Person,
  Settings,
  Logout,
  Search as SearchIcon,
  Dashboard,
  Info,
  ContactSupport,
  AttachMoney,
  Forum,
  Language,
  MoreVert,
} from '@mui/icons-material';

const Header: React.FC = () => {
  const [userMenu, setUserMenu] = useState<null | HTMLElement>(null);
  const [moreMenu, setMoreMenu] = useState<null | HTMLElement>(null);
  const [notificationsMenu, setNotificationsMenu] = useState<null | HTMLElement>(null);
  const [languageMenu, setLanguageMenu] = useState<null | HTMLElement>(null);
  const [mobileDrawer, setMobileDrawer] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenu(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenu(null);
  };

  const handleMoreMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMoreMenu(event.currentTarget);
  };

  const handleMoreMenuClose = () => {
    setMoreMenu(null);
  };

  const handleNotificationsOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationsMenu(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsMenu(null);
  };

  const handleLanguageOpen = (event: React.MouseEvent<HTMLElement>) => {
    setLanguageMenu(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setLanguageMenu(null);
  };

  const handleMobileDrawerToggle = () => {
    setMobileDrawer(!mobileDrawer);
  };

  const menuItems = [
    { text: 'Home', icon: <Home />, path: '/' },
    { text: 'Learn', icon: <School />, path: '/learning' },
    { text: 'Talent Showcase', icon: <EmojiPeople />, path: '/showcase' },
    { text: 'Jobs', icon: <Work />, path: '/jobs' },
    { text: 'Hire', icon: <People />, path: '/hire' },
    { text: 'Community', icon: <Forum />, path: '/community' },
    { text: 'Pricing', icon: <AttachMoney />, path: '/pricing' },
    { text: 'About', icon: <Info />, path: '/about' },
    { text: 'Contact', icon: <ContactSupport />, path: '/contact' },
  ];

  const userMenuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { text: 'Profile', icon: <Person />, path: '/profile' },
    { text: 'Settings', icon: <Settings />, path: '/settings' },
    { text: 'Logout', icon: <Logout /> },
  ];

  const languages = [
    { code: 'en', text: 'English' },
    { code: 'es', text: 'Español' },
    { code: 'fr', text: 'Français' },
    { code: 'de', text: 'Deutsch' },
    { code: 'zh', text: '中文' },
  ];

  const mockNotifications = [
    { id: 1, text: 'New course recommendation for you', isRead: false },
    { id: 2, text: 'Your job application has been viewed', isRead: false },
    { id: 3, text: 'New event in your area next week', isRead: true },
  ];

  const unreadCount = mockNotifications.filter(n => !n.isRead).length;

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleMobileDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', sm: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            CareerHub
          </Typography>

          {/* Search Bar */}
          <Box sx={{ 
            position: 'relative',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.25)' },
            borderRadius: theme.shape.borderRadius,
            width: { xs: '100%', sm: 'auto' },
            mr: { xs: 0, md: 2 },
            ml: { xs: 0, md: 2 },
            flex: { xs: 1, md: 'auto' }
          }}>
            <Box sx={{ 
              padding: theme.spacing(0, 2),
              height: '100%',
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <SearchIcon />
            </Box>
            <InputBase
              placeholder="Search…"
              sx={{
                padding: theme.spacing(1, 1, 1, 0),
                paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                width: '100%',
              }}
            />
          </Box>

          {!isMobile && (
            <Box sx={{ flexGrow: 1, display: 'flex', gap: '0.5rem' }}>
              {menuItems.slice(0, 5).map((item) => (
                <Button
                  key={item.text}
                  color="inherit"
                  component={RouterLink}
                  to={item.path}
                  startIcon={item.icon}
                  sx={{ textTransform: 'none' }}
                >
                  {item.text}
                </Button>
              ))}
              {/* More Menu for Desktop */}
              <Button
                color="inherit"
                onClick={handleMoreMenuOpen}
                sx={{ textTransform: 'none' }}
              >
                More
              </Button>
              <Menu
                anchorEl={moreMenu}
                open={Boolean(moreMenu)}
                onClose={handleMoreMenuClose}
              >
                {menuItems.slice(5).map((item) => (
                  <MenuItem
                    key={item.text}
                    component={RouterLink}
                    to={item.path}
                    onClick={handleMoreMenuClose}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}

          {/* Right Section: Notifications, Language, User */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Language Selector */}
            <IconButton
              color="inherit"
              onClick={handleLanguageOpen}
            >
              <Language />
            </IconButton>
            <Menu
              anchorEl={languageMenu}
              open={Boolean(languageMenu)}
              onClose={handleLanguageClose}
            >
              {languages.map((lang) => (
                <MenuItem key={lang.code} onClick={handleLanguageClose}>
                  {lang.text}
                </MenuItem>
              ))}
            </Menu>

            {/* Notifications */}
            <IconButton
              color="inherit"
              onClick={handleNotificationsOpen}
            >
              <Badge badgeContent={unreadCount} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            <Menu
              anchorEl={notificationsMenu}
              open={Boolean(notificationsMenu)}
              onClose={handleNotificationsClose}
              PaperProps={{
                sx: { width: 320, maxHeight: 400 }
              }}
            >
              <Box sx={{ p: 2 }}>
                <Typography variant="h6">Notifications</Typography>
              </Box>
              <Divider />
              {mockNotifications.length > 0 ? (
                mockNotifications.map((notification) => (
                  <MenuItem 
                    key={notification.id} 
                    onClick={handleNotificationsClose}
                    sx={{ 
                      backgroundColor: notification.isRead ? 'inherit' : 'rgba(25, 118, 210, 0.08)',
                      whiteSpace: 'normal',
                    }}
                  >
                    <Typography variant="body2">{notification.text}</Typography>
                  </MenuItem>
                ))
              ) : (
                <Box sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">No notifications</Typography>
                </Box>
              )}
              <Divider />
              <Box sx={{ textAlign: 'center', p: 1 }}>
                <Button size="small">View All</Button>
              </Box>
            </Menu>

            {/* Call to Action */}
            <Button
              variant="contained"
              color="secondary"
              sx={{ 
                ml: 2, 
                display: { xs: 'none', sm: 'block' },
                textTransform: 'none',
                borderRadius: '20px',
              }}
              component={RouterLink}
              to="/signup"
            >
              Get Started
            </Button>

            {/* User Menu */}
            <IconButton
              color="inherit"
              onClick={handleUserMenuOpen}
              size="large"
              sx={{ ml: 1 }}
            >
              <Person />
            </IconButton>
            <Menu
              anchorEl={userMenu}
              open={Boolean(userMenu)}
              onClose={handleUserMenuClose}
            >
              {userMenuItems.map((item) => (
                <MenuItem
                  key={item.text}
                  onClick={handleUserMenuClose}
                  component={item.path ? RouterLink : 'div'}
                  to={item.path}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileDrawer}
        onClose={handleMobileDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': { width: 280 },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" component="div">
            CareerHub
          </Typography>
        </Box>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component={RouterLink}
              to={item.path}
              onClick={handleMobileDrawerToggle}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Button 
            fullWidth 
            variant="contained"
            component={RouterLink}
            to="/signup"
            sx={{ mb: 1, textTransform: 'none' }}
          >
            Sign Up
          </Button>
          <Button 
            fullWidth 
            variant="outlined"
            component={RouterLink}
            to="/login"
            sx={{ textTransform: 'none' }}
          >
            Log In
          </Button>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header; 