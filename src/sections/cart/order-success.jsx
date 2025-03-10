import {React} from "react";
import PropTypes from "prop-types";
import useShopNavigate  from 'src/hooks/use-shop-navigate';
import { Dialog, Box, Typography, Button } from "@mui/material";
import { useCart } from 'src/context/CartContext';

export default function OrderSuccessDialog({ open,orderId }) {
  const { fetchCartCount } = useCart();
  const navigate = useShopNavigate();

  const handleContinueShopping = () => {
    fetchCartCount();
    navigate("/"); 
  };

  const handleTrackOrder = () => {
    fetchCartCount();
    navigate(`/order/${orderId}`,true);
    navigate("/"); 
  };
  return (
    <Dialog open={open}>
      <Box
        sx={{
          textAlign: "center",
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Success Image */}
        <img
          src="https://botire.botire.in/assets/img/success-tick.gif"
          alt="Order Success"
          style={{ width: 100, marginBottom: 16 }}
        />

        {/* Success Message */}
        <Typography
          variant="h4"
          sx={{ color: "purple", fontWeight: "bold", mb: 1 }}
        >
          Your order is successful!
        </Typography>

        {/* Description */}
        <Typography
          variant="body1"
          sx={{ color: "gray", mb: 3 }}
        >
          We will immediately process your order, and it will be delivered in 2 - 5
          business days.
        </Typography>

        {/* Buttons */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            color="success"
            sx={{ textTransform: "none", fontWeight: "bold" }}
            onClick={handleTrackOrder}
          >
            Track Your Order
          </Button>
          <Button
            variant="outlined"
            color="primary"
            sx={{ textTransform: "none", fontWeight: "bold" }}
            onClick={handleContinueShopping}
          >
            Continue Shopping
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}

OrderSuccessDialog.propTypes = {
  open: PropTypes.bool,
  orderId: PropTypes.string,
};
