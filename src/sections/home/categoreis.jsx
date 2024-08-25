import React, { useState ,useEffect } from 'react';
import { Box, Card, Grid, Button, CardMedia, Typography, Skeleton } from '@mui/material';
import { getCategories } from 'src/services/apiService';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data.data.slice(0, 6));
      } catch (error) {
        console.error('Failed to fetch items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="bold">
          Categories
        </Typography>
        <Button variant="text" sx={{ color: 'red' }}>
          See All
        </Button>
      </Box>
      <Grid container spacing={2} justifyContent="center">
        {loading
          ? [1, 2, 3, 4, 5, 6].map((_, index) => (
              <Grid item xs={4} sm={2} key={index}>
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center', // Center content vertically
                    alignItems: 'center', // Center content horizontally
                    boxShadow: 1,
                    borderRadius: '50%',
                    height: { xs: 90, sm: 120 },
                    width: { xs: 90, sm: 120 },
                    textAlign: 'center',
                    padding: 2,
                  }}
                >
                  <Skeleton
                    variant="circle"
                    sx={{
                      width: { xs: 35, sm: 50 },
                      height: { xs: 35, sm: 50 },
                      marginBottom: 1,
                    }}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ width: '60%', fontSize: '1rem' }}
                  />
                </Card>
              </Grid>
            ))
          : categories.map((category) => (
              <Grid item xs={4} sm={2} key={category.id}>
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: 1,
                    borderRadius: '50%',
                    height: { xs: 90, sm: 120 },
                    width: { xs: 90, sm: 120 },
                    textAlign: 'center',
                    padding: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={category.image}
                      alt={category.name}
                      sx={{
                        width: { xs: 35, sm: 50 },
                        height: { xs: 35, sm: 50 },
                        objectFit: 'contain',
                        marginBottom: 1,
                      }}
                    />
                    <Typography variant="body1" sx={{
                      fontSize:{ xs : '0.7rem', sm: "0.9rem"}
                    }}>{category.name}</Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
      </Grid>
    </Box>
  );
};

export default Categories;
