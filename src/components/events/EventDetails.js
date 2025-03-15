import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Button,
  useTheme,
  Divider
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CategoryIcon from '@mui/icons-material/Category';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const EventDetails = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();

  // TODO: Fetch event details from your MongoDB backend
  // For now, using mock data
  const event = {
    id: id,
    title: 'Tech Conference 2024',
    description: 'Annual technology conference featuring the latest innovations in AI, blockchain, and cloud computing. Join industry leaders and innovators for an immersive experience in the world of technology. Network with professionals, attend workshops, and discover cutting-edge solutions.',
    category: 'technology',
    date: '2024-04-15',
    location: 'San Francisco Convention Center, CA',
    image: 'https://source.unsplash.com/random/1200x600/?tech-conference',
    details: [
      'Keynote speeches from industry leaders',
      'Interactive workshops and demonstrations',
      'Networking opportunities',
      'Product showcases',
      'Panel discussions on emerging technologies'
    ]
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <Container maxWidth="lg">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Box sx={{ my: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/events')}
            sx={{ mb: 4 }}
          >
            Back to Events
          </Button>

          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Paper
                elevation={0}
                sx={{
                  overflow: 'hidden',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: theme.shape.borderRadius * 2,
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: 400,
                    overflow: 'hidden',
                    position: 'relative'
                  }}
                >
                  <Box
                    component="img"
                    src={event.image}
                    alt={event.title}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </Box>

                <Box sx={{ p: 4 }}>
                  <Typography
                    variant="h2"
                    component="h1"
                    sx={{
                      mb: 2,
                      fontWeight: 700,
                      background: 'linear-gradient(45deg, #FF6B6B, #FFB347)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    {event.title}
                  </Typography>

                  <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={4}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CalendarTodayIcon color="primary" sx={{ mr: 1 }} />
                        <Typography variant="h6">
                          {new Date(event.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocationOnIcon color="primary" sx={{ mr: 1 }} />
                        <Typography variant="h6">
                          {event.location}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CategoryIcon color="primary" sx={{ mr: 1 }} />
                        <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
                          {event.category}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.8 }}>
                    {event.description}
                  </Typography>

                  <Divider sx={{ mb: 4 }} />

                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                    Event Highlights
                  </Typography>
                  <Box component="ul" sx={{ pl: 2 }}>
                    {event.details.map((detail, index) => (
                      <Typography
                        key={index}
                        component="li"
                        variant="body1"
                        sx={{
                          mb: 1,
                          fontSize: '1.1rem',
                          '&::marker': {
                            color: theme.palette.primary.main
                          }
                        }}
                      >
                        {detail}
                      </Typography>
                    ))}
                  </Box>

                  <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        py: 2,
                        px: 6,
                        background: 'linear-gradient(45deg, #FF6B6B, #FFB347)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #FFB347, #FF6B6B)',
                        }
                      }}
                    >
                      Register for Event
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </motion.div>
    </Container>
  );
};

export default EventDetails;
