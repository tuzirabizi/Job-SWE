import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';

const pages = [
  { title: 'Jobs', path: '/jobs' },
  { title: 'Courses', path: '/courses' },
  { title: 'Talents', path: '/talents' },
];

const settings = [
  { title: 'Profile', path: '/profile' },
  { title: 'Dashboard', path: '/dashboard' },
  { title: 'Logout', path: '/logout' },
];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleCloseUserMenu();
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Crimble
      </Typography>
      <List>
        {pages.map((page) => (
          <ListItem key={page.title} onClick={() => handleNavigation(page.path)}>
            <ListItemText primary={page.title} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'white', boxShadow: 1 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {isMobile && (
            <IconButton
              color="primary"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
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
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'primary.main',
              textDecoration: 'none',
            }}
          >
            CRIMBLE
          </Typography>

          {!isMobile && (
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
              {pages.map((page) => (
                <Button
                  key={page.title}
                  onClick={() => handleNavigation(page.path)}
                  sx={{ my: 2, color: 'text.primary', display: 'block' }}
                >
                  {page.title}
                </Button>
              ))}
            </Box>
          )}

          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton color="primary">
              <SearchIcon />
            </IconButton>
            <IconButton color="primary">
              <NotificationsIcon />
            </IconButton>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.title}
                  onClick={() => handleNavigation(setting.path)}
                >
                  <Typography textAlign="center">{setting.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 240,
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}

export default Navbar; 