import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  useTheme,
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CategoryIcon from '@mui/icons-material/Category';

const EventList = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Categories list
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'technology', label: 'Technology' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'sports', label: 'Sports' },
    { value: 'education', label: 'Education' },
    { value: 'food', label: 'Food & Drinks' },
    { value: 'other', label: 'Other' }
  ];

  useEffect(() => {
    // TODO: Fetch events from your MongoDB backend
    // For now, using mock data
    const mockEvents = [
      {
        id: '1',
        title: 'Tech Conference 2024',
        description: 'Annual technology conference featuring the latest innovations in AI, blockchain, and cloud computing. Join industry leaders and innovators.',
        category: 'technology',
        date: '2024-04-15',
        location: 'San Francisco, CA',
        image: 'https://source.unsplash.com/random/800x400/?tech-conference'
      },
      {
        id: '2',
        title: 'Summer Music Festival',
        description: 'Three days of live music performances featuring top artists across multiple genres. Food vendors, art installations, and more!',
        category: 'entertainment',
        date: '2024-05-20',
        location: 'Austin, TX',
        image: 'https://source.unsplash.com/random/800x400/?music-festival'
      },
      {
        id: '3',
        title: 'Startup Workshop',
        description: 'Learn how to launch your startup from successful entrepreneurs. Topics include funding, marketing, and product development.',
        category: 'education',
        date: '2024-04-10',
        location: 'New York, NY',
        image: 'https://source.unsplash.com/random/800x400/?startup'
      },
      {
        id: '4',
        title: 'Food & Wine Festival',
        description: 'Taste exquisite dishes and wines from renowned chefs and wineries. Cooking demonstrations and wine tasting sessions included.',
        category: 'food',
        date: '2024-06-05',
        location: 'Napa Valley, CA',
        image: 'https://source.unsplash.com/random/800x400/?wine-tasting'
      },
      {
        id: '5',
        title: 'NBA Finals Watch Party',
        description: 'Watch the NBA Finals on giant screens with fellow basketball fans. Food, drinks, and exciting atmosphere guaranteed!',
        category: 'sports',
        date: '2024-06-15',
        location: 'Chicago, IL',
        image: 'https://source.unsplash.com/random/800x400/?basketball'
      },
      {
        id: '6',
        title: 'Data Science Bootcamp',
        description: 'Intensive 2-day bootcamp covering machine learning, data visualization, and statistical analysis. Perfect for beginners!',
        category: 'technology',
        date: '2024-04-25',
        location: 'Seattle, WA',
        image: 'https://source.unsplash.com/random/800x400/?data-science'
      },
      {
        id: '7',
        title: 'Art Gallery Opening',
        description: 'Exhibition featuring contemporary artworks from emerging artists. Meet the artists and enjoy complimentary refreshments.',
        category: 'entertainment',
        date: '2024-05-01',
        location: 'Miami, FL',
        image: 'https://source.unsplash.com/random/800x400/?art-gallery'
      },
      {
        id: '8',
        title: 'Marathon 2024',
        description: 'Annual city marathon with scenic routes. Suitable for all skill levels with 5K, 10K, and full marathon options.',
        category: 'sports',
        date: '2024-05-10',
        location: 'Boston, MA',
        image: 'https://source.unsplash.com/random/800x400/?marathon'
      },
      {
        id: '9',
        title: 'Cooking Masterclass',
        description: 'Learn to cook authentic Italian cuisine from a Michelin-starred chef. Ingredients and wine pairing included.',
        category: 'food',
        date: '2024-04-30',
        location: 'Los Angeles, CA',
        image: 'https://source.unsplash.com/random/800x400/?cooking'
      },
      {
        id: '10',
        title: 'Photography Workshop',
        description: 'Master the art of photography with hands-on training. Covers composition, lighting, and post-processing techniques.',
        category: 'education',
        date: '2024-05-15',
        location: 'Portland, OR',
        image: 'https://source.unsplash.com/random/800x400/?photography'
      },
      {
        id: '11',
        title: 'Blockchain Summit',
        description: 'Explore the future of blockchain technology with industry experts. Networking opportunities and panel discussions.',
        category: 'technology',
        date: '2024-06-20',
        location: 'Las Vegas, NV',
        image: 'https://source.unsplash.com/random/800x400/?blockchain'
      },
      {
        id: '12',
        title: 'Jazz Night',
        description: 'Evening of live jazz music featuring local and international artists. Dinner and drinks available.',
        category: 'entertainment',
        date: '2024-04-20',
        location: 'New Orleans, LA',
        image: 'https://source.unsplash.com/random/800x400/?jazz'
      }
    ];
    setEvents(mockEvents);
    setFilteredEvents(mockEvents);
  }, []);

  useEffect(() => {
    let filtered = events;

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower) ||
        event.location.toLowerCase().includes(searchLower)
      );
    }

    setFilteredEvents(filtered);
  }, [searchTerm, selectedCategory, events]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 6, textAlign: 'center' }}>
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
          Discover Events
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Find amazing local events happening around you
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          borderRadius: theme.shape.borderRadius * 2,
          border: '1px solid rgba(255, 255, 255, 0.3)',
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'background.paper',
                }
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="category-label">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CategoryIcon sx={{ mr: 1 }} />
                  Category
                </Box>
              </InputLabel>
              <Select
                labelId="category-label"
                value={selectedCategory}
                onChange={handleCategoryChange}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CategoryIcon sx={{ mr: 1 }} />
                    Category
                  </Box>
                }
                sx={{
                  backgroundColor: 'background.paper',
                }}
              >
                {categories.map((category) => (
                  <MenuItem key={category.value} value={category.value}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid container spacing={4}>
          {filteredEvents.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <motion.div variants={itemVariants}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: theme.shape.borderRadius * 2,
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 40px rgba(0, 0, 0, 0.1)',
                    }
                  }}
                  onClick={() => navigate(`/events/${event.id}`)}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={event.image}
                    alt={event.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      sx={{
                        mb: 1,
                        fontWeight: 700,
                        background: 'linear-gradient(45deg, #FF6B6B, #FFB347)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}
                    >
                      {event.title}
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mb: 1
                        }}
                      >
                        <CalendarTodayIcon sx={{ mr: 1, fontSize: 20 }} />
                        {event.date}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <LocationOnIcon sx={{ mr: 1, fontSize: 20 }} />
                        {event.location}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {event.description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          background: 'linear-gradient(45deg, #FF6B6B, #FFB347)',
                          '&:hover': {
                            background: 'linear-gradient(45deg, #FFB347, #FF6B6B)',
                          }
                        }}
                      >
                        View Details
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Container>
  );
};

export default EventList;
