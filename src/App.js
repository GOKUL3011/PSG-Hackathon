import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { 
  AppBar, Toolbar, Typography, Button, Box, Container, 
  IconButton, useTheme, useMediaQuery, Menu, MenuItem 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import EventList from './components/events/EventList';
import EventDetails from './components/events/EventDetails';
import CreateEvent from './components/admin/CreateEvent';

const theme = {
  palette: {
    primary: {
      main: '#FF6B6B',
      light: '#FF8E8E',
      dark: '#E85555',
    },
    secondary: {
      main: '#FFB347',
      light: '#FFCC80',
      dark: '#FF9800',
    },
    background: {
      default: '#FFF8F0',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2D3436',
      secondary: '#636E72',
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        },
      },
    },
  },
};

const Navigation = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
    handleMenuClose();
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleMenuClose();
  };

  const renderMobileMenu = () => (
    <>
      <IconButton
        color="inherit"
        aria-label="menu"
        onClick={handleMenuClick}
        edge="start"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleNavigation('/events')}>Events</MenuItem>
        {isLoggedIn ? (
          <>
            <MenuItem onClick={() => handleNavigation('/create-event')}>Create Event</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={() => handleNavigation('/login')}>Login</MenuItem>
            <MenuItem onClick={() => handleNavigation('/register')}>Register</MenuItem>
          </>
        )}
      </Menu>
    </>
  );

  const renderDesktopMenu = () => (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Button 
        color="inherit" 
        onClick={() => navigate('/events')}
        sx={{
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          }
        }}
      >
        Events
      </Button>
      {isLoggedIn ? (
        <>
          <Button 
            color="inherit" 
            onClick={() => navigate('/create-event')}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            Create Event
          </Button>
          <Button 
            color="inherit" 
            onClick={handleLogout}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            Logout
          </Button>
        </>
      ) : (
        <>
          <Button 
            color="inherit" 
            onClick={() => navigate('/login')}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            Login
          </Button>
          <Button 
            color="inherit" 
            onClick={() => navigate('/register')}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            Register
          </Button>
        </>
      )}
    </Box>
  );

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
      }}
    >
      <Container>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component="div"
            sx={{ 
              flexGrow: 1, 
              cursor: 'pointer',
              fontWeight: 700
            }}
            onClick={() => navigate('/')}
          >
            Local Finder
          </Typography>
          {renderDesktopMenu()}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const App = () => {
  return (
    <Router>
      <Navigation />
      <Container sx={{ py: 4, backgroundColor: theme.palette.background.default }}>
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-event" element={<CreateEvent />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
