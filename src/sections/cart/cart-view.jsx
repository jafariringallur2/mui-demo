import React, { useEffect, useState } from 'react';
import { Alert, Box, Button, Grid, Stepper, Step, StepLabel, CircularProgress } from '@mui/material';
import { getCartItems, createOnlinePayment, createOrder } from 'src/services/apiService';
import { useCart } from 'src/context/CartContext';
import PriceDetails from './price-details';
import CartItemsList from './CartItemsList';
import CartSkelton from './CartSkelton';
import EmptyCart from './EmptyCart';
import DeliveryAddress from './DeliveryAddress';
import Payment from './payment';
import OrderSuccessDialog from './order-success';

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
  const [couponCode, setCouponCodeValue] = useState('');
  const [apiError, setApiError] = useState('');
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');


  const loadRazorpayScript = () =>
    new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error('Razorpay SDK failed to load.'));
      document.body.appendChild(script);
    });

  const handleNext = async () => {
    if (activeStep === 2) {
      setPaymentLoading(true);
      const items = cartItems.map((item) => ({
        product_id: item.product.id,
        variant_id: item.variant_id,
        qty: item.qty,
      }));
      const payloadData = {
        items,
        address_id: selectedAddress,
        payment_method: selectedPaymentMethod,
        coupon_code: couponCode,
      };

      if(selectedPaymentMethod === "online"){
        await createOnlinePaymentAPI(payloadData);
      }else{
        await createOrderAPI(payloadData);
      }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const createOnlinePaymentAPI = async (payload) => {
    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        setApiError('Razorpay SDK failed to load.');
        return;
      }

      const response = await createOnlinePayment(payload);
      if (response.success === false) {
        setApiError(response.errorMsg);
        return;
      }

      const options = {
        key: 'rzp_test_DkzvuWlQIShYqc',
        amount: response.payment.amount,
        currency: 'INR',
        name: response.payment.business_name,
        description: `Order ID: ${response.payment.order_id}`,
        image: response.payment.business_logo,
        order_id: response.payment.order_id,
        prefill: {
          contact: response.payment.customer_phone,
        },
        handler: async (data) => {
          if (data.razorpay_payment_id) {
            const updatedPayload = {
              ...payload,
              razorpay_payment_id: data.razorpay_payment_id,
              razorpay_order_id: data.razorpay_order_id,
            };
            await createOrderAPI(updatedPayload);
          } else {
            console.error('Payment failed');
          }
        },
      };

      const rzp1 = new window.Razorpay(options); // Use `window.Razorpay` here
      rzp1.open();
    } catch (error) {
      console.error('Error during payment:', error);
      setApiError('Something went wrong with the payment.');
    }
  };

  const createOrderAPI = async (payload) => {
    const orderResponse = await createOrder(payload)
    setPaymentLoading(false);
    if (orderResponse.success === false) {
      setApiError(orderResponse.errorMsg);
    }else{
      setOrderSuccess(true);
      setOrderId(orderResponse.order_id);
    }
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

  const totalSellingPrice = cartItems.reduce((sum, item) => {
    const selectedVariant = item.product.variants.find(
      (variant) => variant.id === item.variant_id
    );
  
    const sellingPrice = selectedVariant
      ? parseFloat(selectedVariant.selling_price)
      : parseFloat(item.product.selling_price);
  
    return sum + sellingPrice * parseInt(item.qty, 10);
  }, 0);
  
  const totalPrice = cartItems.reduce((sum, item) => {
    const selectedVariant = item.product.variants.find(
      (variant) => variant.id === item.variant_id
    );
  
    const originalPrice = selectedVariant
      ? parseFloat(selectedVariant.original_price)
      : parseFloat(item.product.original_price);
  
    return sum + originalPrice * parseInt(item.qty, 10);
  }, 0);
  

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
  const handleVariantChange = (itemId, variantId) => {
    try {
     
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId
            ? {
                ...item,
                variant_id: variantId
              }
            : item
        )
      );
      
    } catch (error) {
      console.error('Failed to update variant:', error);
    }
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

    if(paymentLoading){
      buttonDisabled = true;
    }
  }

  if (loading) {
    return <CartSkelton />;
  }
  if(cartItems.length === 0){
    return <EmptyCart />
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
            onVariantChange={handleVariantChange}
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
        <PriceDetails
          totalPrice={totalPrice}
          totalSellingPrice={totalSellingPrice}
          setGrandTotal={setGrandTotal}
          setCouponCodeValue={setCouponCodeValue}
        />
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
            color="primary"
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
            color="secondary"
            onClick={handleNext}
            sx={{ width: '50%' }}
            disabled={buttonDisabled || (activeStep === 1 && !selectedAddress)}
          >
            {buttonText}
            {paymentLoading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : ''}
          </Button>
        </Box>
      </Grid>
      {apiError && (
        <Alert severity="error" sx={{ mb: 2, mt: 2 }}>
          {apiError}
        </Alert>
      )}
       <OrderSuccessDialog
        open={orderSuccess}
        orderId={orderId}
      />
    </Grid>
  );
};

export default ShoppingCart;
