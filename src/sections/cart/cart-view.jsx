import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Stepper, Step, StepLabel } from '@mui/material';
import { getCartItems } from 'src/services/apiService';
import { useCart } from 'src/context/CartContext';
import PriceDetails from './price-details';
import CartItemsList from './CartItemsList';
import CartSkelton from './CartSkelton';
import DeliveryAddress from './DeliveryAddress';
import Payment from './payment';

const steps = ['Items', 'Address', 'Payment'];

const ShoppingCart = () => {
  const { removeCartItem, cartCount } = useCart();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removeLoadingId, setRemoveLoadingId] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [grandTotalAmount, setGrandTotal] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [activeStep]);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    setLoading(true);
    getCartItems()
      .then((response) => {
        if (response.success) {
          setCartItems(response.data);
        }
      })
      .catch((error) => {
        console.error('Failed to fetch cart items', error);
      })
      .finally(() => setLoading(false));
  }, [cartCount]);

  const totalSellingPrice = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.product.selling_price) * parseInt(item.qty, 10),
    0
  );
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.product.original_price) * parseInt(item.qty, 10),
    0
  );

  const handlerRmoveCartItem = async (id) => {
    try {
      setRemoveLoadingId(id);
      await removeCartItem(id);
    } finally {
      setRemoveLoadingId(null);
    }
  };

  const handleQuantityChange = (itemId, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId) {
          const newQty = item.qty ? parseInt(item.qty, 10) + change : 1;
          return {
            ...item,
            qty: Math.max(1, newQty),
          };
        }
        return item;
      })
    );
  };

  let buttonText = 'Continue';
  let buttonDisabled = false;

  if (activeStep === 0) {
    buttonText = 'Place Order';
  } else if (activeStep === 1) {
    buttonText = 'Continue';
  } else if (activeStep === 2) {
    if (!selectedPaymentMethod) {
      buttonDisabled = true;
    } else if (selectedPaymentMethod === 'online') {
      buttonText = `Pay ₹${grandTotalAmount}`;
    } else if (selectedPaymentMethod === 'cod') {
      buttonText = 'Confirm';
    }
  }

  if (loading) {
    return <CartSkelton />;
  }

  return (
    <Grid container spacing={4} padding={2}>
      <Grid item xs={12} md={8}>
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {activeStep === 0 && (
          <CartItemsList
            cartItems={cartItems}
            onQuantityChange={handleQuantityChange}
            onRemoveItem={handlerRmoveCartItem}
            removeLoadingId={removeLoadingId}
          />
        )}
        {activeStep === 1 && (
          <DeliveryAddress
            selectedAddressValue={selectedAddress}
            onAddressSelect={setSelectedAddress}
          />
        )}
        {activeStep === 2 && (
          <Payment
            SelectedPaymentMethod={selectedPaymentMethod}
            OnPaymentSelect={setSelectedPaymentMethod}
          />
        )}
      </Grid>
      <Grid item xs={12} md={4}>
        <PriceDetails totalPrice={totalPrice} totalSellingPrice={totalSellingPrice} setGrandTotal={setGrandTotal} />
      </Grid>
      <Grid item xs={12} md={8}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: 'inherit',
            position: { xs: 'fixed', sm: 'relative' },
            bottom: { xs: 57, sm: 'auto' },
            zIndex: 10,
            left: 0,
            right: 0,
            backgroundColor: 'white',
            padding: { xs: '8px', sm: '0' },
          }}
        >
          <Button
            color="inherit"
            variant="contained"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1, width: '50%' }}
          >
            Cancel
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />

          <Button
            variant="contained"
            color="error"
            onClick={handleNext}
            sx={{ width: '50%' }}
            disabled={buttonDisabled || (activeStep === 1 && !selectedAddress)}
          >
            {buttonText}
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ShoppingCart;
