import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography, IconButton, TextField, Skeleton } from '@mui/material';
import Iconify from 'src/components/iconify';
import { getCartItems } from 'src/services/apiService'; // Ensure this path is correct

const ShoppingCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCartItems()
            .then(response => {
                if (response.success) {
                    setCartItems(response.data);
                }
            })
            .catch(error => {
                console.error('Failed to fetch cart items', error);
            })
            .finally(() => setLoading(false));
    }, []);

    const itemsTotal = cartItems.reduce((sum, item) => sum + (parseFloat(item.product.selling_price) * parseInt(item.qty, 10)), 0);
    const discount = 15000; // Example static discount
    const grandTotal = itemsTotal - discount;

    if (loading) {
        return (
            <Grid container spacing={4} padding={2}>
                <Grid item xs={12} md={8}>
                    <Typography variant="h4" gutterBottom>Shopping Cart</Typography>
                    {Array.from(new Array(3)).map((_, index) => (
                        <Box key={index} display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                            <Box display="flex" alignItems="center">
                                <Skeleton variant="rectangular" width={80} height={80} style={{ marginRight: 16 }} />
                                <Box>
                                    <Skeleton variant="text" width={150} height={24} />
                                    <Skeleton variant="text" width={100} height={20} />
                                    <Box display="flex" alignItems="center" mt={1}>
                                        <IconButton disabled>
                                            <Iconify icon="eva:minus-fill" width={20} height={20} />
                                        </IconButton>
                                        <Skeleton variant="rectangular" width={40} height={40} />
                                        <IconButton disabled>
                                            <Iconify icon="eva:plus-fill" width={20} height={20} />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </Box>
                            <Box textAlign="right">
                                <Skeleton variant="text" width={80} height={24} />
                                <Skeleton variant="text" width={80} height={20} />
                            </Box>
                            <IconButton disabled>
                                <Iconify icon="eva:close-outline" width={20} height={20} />
                            </IconButton>
                        </Box>
                    ))}
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box padding={3} boxShadow={3} borderRadius={2}>
                        <Skeleton variant="text" width={120} height={30} />
                        <Skeleton variant="rectangular" width="100%" height={56} style={{ marginTop: 16 }} />
                        <Box mt={3}>
                            <Skeleton variant="text" width={180} height={24} />
                            <Skeleton variant="text" width={180} height={24} />
                            <Skeleton variant="text" width={180} height={24} />
                            <Skeleton variant="text" width={180} height={30} style={{ marginTop: 16 }} />
                        </Box>
                        <Skeleton variant="rectangular" width="100%" height={56} style={{ marginTop: 24 }} />
                    </Box>
                </Grid>
            </Grid>
        );
    }

    return (
        <Grid container spacing={4} padding={2}>
            <Grid item xs={12} md={8}>
                <Typography variant="h4" gutterBottom>Shopping Cart</Typography>
                {cartItems.map(item => (
                    <Box key={item.id} display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                        <Box display="flex" alignItems="center">
                            <img src={item.product.single_image} alt={item.product.name} style={{ width: 80, marginRight: 16 }} />
                            <Box>
                                <Typography variant="h6">{item.product.name}</Typography>
                                <Typography variant="body2">{item.product.base_qty} {item.product.unit}</Typography>
                                <Box display="flex" alignItems="center" mt={1}>
                                    <IconButton>
                                        <Iconify icon="eva:minus-fill" width={20} height={20} />
                                    </IconButton>
                                    <TextField
                                        value={item.qty}
                                        inputProps={{ style: { textAlign: 'center', width: 40 } }}
                                    />
                                    <IconButton>
                                        <Iconify icon="eva:plus-fill" width={20} height={20} />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Box>
                        <Box textAlign="right">
                            <Typography variant="h6" color="secondary">₹{parseFloat(item.product.selling_price).toFixed(2)}</Typography>
                            <Typography variant="body2" color="textSecondary">
                                <del>₹{parseFloat(item.product.original_price).toFixed(2)}</del> 66% offer
                            </Typography>
                        </Box>
                        <IconButton>
                            <Iconify icon="eva:close-outline" width={20} height={20} />
                        </IconButton>
                    </Box>
                ))}
            </Grid>
            <Grid item xs={12} md={4}>
                <Box padding={3} boxShadow={3} borderRadius={2}>
                    <Typography variant="h6" gutterBottom>Payment</Typography>
                    <TextField
                        label="Coupon code"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        InputProps={{ endAdornment: <Button variant="contained" color="error">Apply</Button> }}
                    />
                    <Box mt={3}>
                        <Typography>Items total: ₹{itemsTotal.toFixed(2)}</Typography>
                        <Typography>Discount: -₹{discount.toFixed(2)}</Typography>
                        <Typography>Sub Total: ₹{grandTotal.toFixed(2)}</Typography>
                        <Typography variant="h6" mt={2}>Grand Total: ₹{grandTotal.toFixed(2)}</Typography>
                    </Box>
                    <Button
                        variant="contained"
                        color="error"
                        fullWidth
                        sx={{ mt: 3 }}
                    >
                        Check Out
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
};

export default ShoppingCart;
