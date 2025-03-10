import React, { useState, useEffect } from 'react';
import { Box, Card, Grid, CardMedia, Typography, Skeleton } from '@mui/material';
import useShopNavigate  from 'src/hooks/use-shop-navigate';
import { getCategories } from 'src/services/apiService';

const CategoriesView = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useShopNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (id) => {
    navigate(`/categories/${id}`);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
        All Categories
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {loading
          ? [1, 2, 3, 4, 5, 6].map((_, index) => (
              <Grid item xs={4} sm={2} key={index}>
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: 2,
                    borderRadius: 2,
                    height: { xs: 100, sm: 140 },
                    width: { xs: 100, sm: 140 },
                    textAlign: 'center',
                    padding: 2,
                  }}
                >
                  <Skeleton variant="rectangular" sx={{ width: '60%', height: 50, mb: 1 }} />
                  <Skeleton variant="text" sx={{ width: '70%', fontSize: '1rem' }} />
                </Card>
              </Grid>
            ))
          : categories.map((category) => (
              <Grid item xs={6} sm={2} key={category.id}>
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: 3,
                    borderRadius: 2,
                    height: { xs: 150, sm: 180 },
                    width: { xs: 150, sm: 180 },
                    textAlign: 'center',
                    padding: 2,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: 5,
                    },
                  }}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <CardMedia
                    component="img"
                    image={category.image}
                    alt={category.name}
                    sx={{
                      width: { xs: 80, sm: 90 },
                      height: { xs: 80, sm: 90 },
                      objectFit: 'contain',
                      mb: 1,
                    }}
                  />
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    sx={{
                      fontSize: { xs: '1rem', sm: '1.2rem' },
                      color: 'text.primary',
                    }}
                  >
                    {category.name}
                  </Typography>
                </Card>
              </Grid>
            ))}
      </Grid>
    </Box>
  );
};

export default CategoriesView;
