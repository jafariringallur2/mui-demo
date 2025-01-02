import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Dialog, Box, Typography, Button } from "@mui/material";
import { useCart } from 'src/context/CartContext';

export default function OrderSuccessDialog({ open }) {
  const { fetchCartCount } = useCart();

  const navigate = useNavigate(); // Initialize navigate

  const handleContinueShopping = () => {
    fetchCartCount();
    navigate("/"); // Navigate to the home route
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
          >
            Track Your Order
          </Button>
          <Button
            variant="outlined"
            color="primary"
            sx={{ textTransform: "none", fontWeight: "bold" }}
            onClick={handleContinueShopping} // Add click handler
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
};
