import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Alert,
  Skeleton,
  CircularProgress,
} from '@mui/material';
import { saveCustomerAddresses, getCustomerAddresses } from 'src/services/apiService';

export default function DeliveryAddress({selectedAddressValue, onAddressSelect }) {
  const [selectedAddress, setSelectedAddress] = useState(selectedAddressValue);
  const [addresses, setAddresses] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: '',
    address: '',
    phone: '',
    city: '',
    pincode: '',
    place: '',
    latitude: '',
    longitude: '',
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loadingAddress, setLoadingAddress] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await getCustomerAddresses();
        setAddresses(response.data);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      } finally {
        setLoadingAddress(false);
      }
    };
    fetchAddresses();
  }, []);

  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
    onAddressSelect(event.target.value);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setApiError('');
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newAddress.name) newErrors.name = 'Name is required';
    if (!newAddress.address) newErrors.address = 'Address is required';
    if (!newAddress.phone) newErrors.phone = 'Phone number is required';
    if (!newAddress.city) newErrors.city = 'City is required';
    if (!newAddress.pincode) newErrors.pincode = 'Pin code is required';
    if (!newAddress.place) newErrors.place = 'Place is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddAddress = async () => {
    if (!validateForm()) return;

    setSaving(true); 

    try {
      const response = await saveCustomerAddresses(newAddress);
      if (response.success === false) {
        setApiError(response.errorMsg);
        return;
      }

      const updatedAddresses = await getCustomerAddresses();
      setAddresses(updatedAddresses.data);

      setNewAddress({
        name: '',
        address: '',
        phone: '',
        city: '',
        pincode: '',
        place: '',
        latitude: '',
        longitude: '',
      });
      setOpenDialog(false);
    } catch (error) {
      console.error('Error saving address:', error);
    } finally {
      setSaving(false); 
    }
  };

  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        Deliver to:
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup value={selectedAddress} onChange={handleAddressChange}>
          {loadingAddress ? (
            <>
              <Box
                display="flex"
                alignItems="flex-start"
                sx={{
                  flexDirection: 'column',
                  m: 1,
                  backgroundColor: 'white',
                  p: 2,
                  borderRadius: 1,
                  boxShadow: 1,
                  width: '100%',
                }}
              >
                <Skeleton variant="text" width={150} height={30} />
                <Skeleton variant="text" width={150} height={20} />
                <Skeleton variant="text" width={100} height={20} />
              </Box>
              <Box
                display="flex"
                alignItems="flex-start"
                sx={{
                  flexDirection: 'column',
                  m: 1,
                  backgroundColor: 'white',
                  p: 2,
                  borderRadius: 1,
                  boxShadow: 1,
                  width: '100%',
                }}
              >
                <Skeleton variant="text" width={150} height={30} />
                <Skeleton variant="text" width={150} height={20} />
                <Skeleton variant="text" width={100} height={20} />
              </Box>
            </>
          ) : (
            addresses.map((addr) => (
              <Paper key={addr.id} variant="outlined" sx={{ p: 2, mb: 2 }}>
                <FormControlLabel
                  value={addr.id}
                  control={<Radio />}
                  label={
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {addr.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {addr.address}, {addr.city}, {addr.pincode}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {addr.phone}
                      </Typography>
                    </Box>
                  }
                />
              </Paper>
            ))
          )}
        </RadioGroup>
      </FormControl>

      <Button variant="outlined" color="primary" onClick={handleDialogOpen} fullWidth>
        Add New Address
      </Button>

      <Dialog open={openDialog} onClose={handleDialogClose} fullWidth>
        <DialogTitle>Add New Address</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                value={newAddress.name}
                onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                value={newAddress.phone}
                onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                error={!!errors.phone}
                helperText={errors.phone}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Pin Code"
                value={newAddress.pincode}
                onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                error={!!errors.pincode}
                helperText={errors.pincode}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="City"
                value={newAddress.city}
                onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                error={!!errors.city}
                helperText={errors.city}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                value={newAddress.address}
                onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                error={!!errors.address}
                helperText={errors.address}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Place"
                value={newAddress.place}
                onChange={(e) => setNewAddress({ ...newAddress, place: e.target.value })}
                error={!!errors.place}
                helperText={errors.place}
              />
            </Grid>
          </Grid>
          {apiError && (
            <Alert severity="error" sx={{ mb: 2, mt: 2 }}>
              {apiError}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleAddAddress}
            color="primary"
            variant="contained"
            disabled={saving} // Disable the button when saving
          >
            {saving ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

DeliveryAddress.propTypes = {
  selectedAddressValue: PropTypes.string,
  onAddressSelect: PropTypes.func.isRequired,
}
