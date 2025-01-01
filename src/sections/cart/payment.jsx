import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Typography,
  Paper,
} from '@mui/material';

export default function Payment({ SelectedPaymentMethod, OnPaymentSelect }) {
  const [SelectedPayment, setSelectedPayment] = useState(SelectedPaymentMethod);

  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
    OnPaymentSelect(event.target.value);
  };

  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        Payment method:
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup value={SelectedPayment} onChange={handlePaymentChange}>
          <Paper key="online" variant="outlined" sx={{ p: 2, mb: 2 }}>
            <FormControlLabel
              value="online"
              control={<Radio />}
              label={
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Online Payment
                  </Typography>
                </Box>
              }
            />
          </Paper>
          <Paper key="cod" variant="outlined" sx={{ p: 2, mb: 2 }}>
            <FormControlLabel
              value="cod"
              control={<Radio />}
              label={
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Cash On Delivery
                  </Typography>
                </Box>
              }
            />
          </Paper>
        </RadioGroup>
      </FormControl>
    </Box>
  );
}

Payment.propTypes = {
  SelectedPaymentMethod: PropTypes.string,
  OnPaymentSelect: PropTypes.func.isRequired,
};
