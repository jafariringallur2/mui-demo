import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Button, CircularProgress, TextField, Grid } from '@mui/material';
import { applyCoupon } from 'src/services/apiService';

export default function PriceDetails({ totalPrice, totalSellingPrice,setGrandTotal,setCouponCodeValue }) {
  const [couponCode, setCouponCode] = useState('');
  const [applyLoading, setApplyLoading] = useState(false);
  const [applyErrorMsg, setApplyErrorMsg] = useState('');
  const [couponAppliedAmount, setCouponAppliedAmount] = useState(0);

  const discount = totalPrice - totalSellingPrice;
  const subTotal = totalSellingPrice;
  const grandTotal = subTotal - couponAppliedAmount;

  useEffect(() => {
    setGrandTotal(grandTotal);
  }, [grandTotal, setGrandTotal]);


  const handleApplyCoupon = async () => {
    setApplyErrorMsg('');
    setCouponAppliedAmount(0);
    if (!couponCode.trim()) {
      setApplyErrorMsg('Please enter a coupon code.');
      return;
    }

    setApplyLoading(true);

    try {
      const response = await applyCoupon(couponCode);
      if (!response.success) {
        setApplyErrorMsg(response.errorMsg);
        return;
      }
      if (response.data.min_cart_value > subTotal) {
        setApplyErrorMsg(
          `This coupon requires a minimum cart value of ₹${response.data.min_cart_value}.`
        );
        return;
      }
      if (response.data.discount_type === 1) {
        setCouponAppliedAmount(response.data.discount);
      } else {
        setCouponAppliedAmount((response.data.discount / 100) * subTotal);
      }
    } catch (error) {
      setApplyErrorMsg('An unexpected error occurred. Please try again.');
    } finally {
      setApplyLoading(false);
    }
  };

  const handleCouponCodeChange = (e) => {
    setCouponCode(e.target.value);
    setCouponCodeValue(e.target.value);  // Update the parent state
  };

 
  return (
    <Box padding={3} boxShadow={3} borderRadius={2} mt={{sm:6,xs:1}}>
      <Typography variant="h6" gutterBottom>
        Price Details
      </Typography>
      <TextField
        label="Coupon code"
        variant="outlined"
        fullWidth
        margin="normal"
        value={couponCode}
        onChange={handleCouponCodeChange}
        error={!!applyErrorMsg}
        helperText={applyErrorMsg}
        InputProps={{
          endAdornment: (
            <Button
              variant="contained"
              color="error"
              onClick={handleApplyCoupon}
              disabled={applyLoading}
            >
              {applyLoading ? <CircularProgress size={24} color="inherit" /> : 'Apply'}
            </Button>
          ),
        }}
      />

      <Box mt={3}>
        <Grid container spacing={2} mb={1}>
          <Grid item xs={6}>
            <Typography>Items total:</Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Typography>₹{totalPrice.toFixed(2)}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} mb={1}>
          <Grid item xs={6}>
            <Typography>Discount:</Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Typography color="green">-₹{discount.toFixed(2)}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} mb={1}>
          <Grid item xs={6}>
            <Typography>Sub Total:</Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Typography>₹{subTotal.toFixed(2)}</Typography>
          </Grid>
        </Grid>
        {couponAppliedAmount > 0 && (
          <Grid container spacing={2} mb={1}>
            <Grid item xs={6}>
              <Typography>Coupon Applied:</Typography>
            </Grid>
            <Grid item xs={6} textAlign="right">
              <Typography color="green">-₹{couponAppliedAmount.toFixed(2)}</Typography>
            </Grid>
          </Grid>
        )}
        <Grid container spacing={2} mt={2}>
          <Grid item xs={6}>
            <Typography variant="h6">Grand Total:</Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Typography variant="h6">₹{grandTotal.toFixed(2)}</Typography>
          </Grid>
        </Grid>
      </Box>

    </Box>
  );
};

PriceDetails.propTypes = {
    totalPrice: PropTypes.number,
    totalSellingPrice: PropTypes.number,
    setGrandTotal: PropTypes.func,
    setCouponCodeValue: PropTypes.func
  };
  
  PriceDetails.defaultProps = {
    totalPrice: 0,
    totalSellingPrice: 0,
  };
