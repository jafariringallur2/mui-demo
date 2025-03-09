import React, { useState, useEffect } from 'react';
import {
  Box,
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
  IconButton,
} from '@mui/material';
import Iconify from 'src/components/iconify';
import {
  getCustomerAddresses,
  saveCustomerAddresses,
  updateCustomerAddress,
  deleteCustomerAddress,
} from 'src/services/apiService';

export default function CustomerAddress() {
  const [addresses, setAddresses] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentAddress, setCurrentAddress] = useState({
    id: '',
    name: '',
    address: '',
    phone: '',
    city: '',
    pincode: '',
    place: '',
    latitude: '',
    longitude: '',
  });
  const [addressToDelete, setAddressToDelete] = useState(null);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Fetch addresses on component mount
  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const response = await getCustomerAddresses();
      setAddresses(response.data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  // Open dialog for adding/editing address
  const handleDialogOpen = (address = null) => {
    if (address) {
      setCurrentAddress(address);
      setEditMode(true);
    } else {
      setCurrentAddress({
        id: '',
        name: '',
        address: '',
        phone: '',
        city: '',
        pincode: '',
        place: '',
        latitude: '',
        longitude: '',
      });
      setEditMode(false);
    }
    setOpenDialog(true);
  };

  // Close dialog
  const handleDialogClose = () => {
    setOpenDialog(false);
    setApiError('');
    setErrors({});
  };

  // Open delete confirmation dialog
  const handleDeleteDialogOpen = (id) => {
    setAddressToDelete(id);
    setOpenDeleteDialog(true);
  };

  // Close delete confirmation dialog
  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
    setAddressToDelete(null);
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!currentAddress.name) newErrors.name = 'Name is required';
    if (!currentAddress.address) newErrors.address = 'Address is required';
    if (!currentAddress.phone) newErrors.phone = 'Phone number is required';
    if (!currentAddress.city) newErrors.city = 'City is required';
    if (!currentAddress.pincode) newErrors.pincode = 'Pin code is required';
    if (!currentAddress.place) newErrors.place = 'Place is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle save/update address
  const handleSaveAddress = async () => {
    if (!validateForm()) return;

    setSaving(true);

    try {
      let response;
      if (editMode) {
        response = await updateCustomerAddress(currentAddress.hashid, currentAddress);
      } else {
        response = await saveCustomerAddresses(currentAddress);
      }

      if (response.success === false) {
        setApiError(response.errorMsg);
        return;
      }

      await fetchAddresses(); // Refetch addresses after save/update
      handleDialogClose();
    } catch (error) {
      console.error('Error saving address:', error);
    } finally {
      setSaving(false);
    }
  };

  // Handle delete address
  const handleDeleteAddress = async () => {
    setDeleting(true);

    try {
      const response = await deleteCustomerAddress(addressToDelete);
      if (response.success === false) {
        setApiError(response.errorMsg);
        return;
      }

      await fetchAddresses(); // Refetch addresses after delete
      handleDeleteDialogClose();
    } catch (error) {
      console.error('Error deleting address:', error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        Manage Addresses
      </Typography>

      <Button variant="contained" color="primary" onClick={() => handleDialogOpen()}>
        Add New Address
      </Button>

      {loading ? (
        <>
          <Skeleton variant="rectangular" height={100} sx={{ my: 2 }} />
          <Skeleton variant="rectangular" height={100} sx={{ my: 2 }} />
        </>
      ) : (
        addresses.map((addr) => (
          <Paper key={addr.id} variant="outlined" sx={{ p: 2, my: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
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
              <Box>
                <IconButton onClick={() => handleDialogOpen(addr)}>
                <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
                </IconButton>
                <IconButton onClick={() => handleDeleteDialogOpen(addr.hashid)}>
                <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
                </IconButton>
              </Box>
            </Box>
          </Paper>
        ))
      )}

      {/* Add/Edit Address Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose} fullWidth>
        <DialogTitle>{editMode ? 'Edit Address' : 'Add New Address'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                value={currentAddress.name}
                onChange={(e) => setCurrentAddress({ ...currentAddress, name: e.target.value })}
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                value={currentAddress.phone}
                onChange={(e) => setCurrentAddress({ ...currentAddress, phone: e.target.value })}
                error={!!errors.phone}
                helperText={errors.phone}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Pin Code"
                value={currentAddress.pincode}
                onChange={(e) => setCurrentAddress({ ...currentAddress, pincode: e.target.value })}
                error={!!errors.pincode}
                helperText={errors.pincode}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="City"
                value={currentAddress.city}
                onChange={(e) => setCurrentAddress({ ...currentAddress, city: e.target.value })}
                error={!!errors.city}
                helperText={errors.city}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                value={currentAddress.address}
                onChange={(e) => setCurrentAddress({ ...currentAddress, address: e.target.value })}
                error={!!errors.address}
                helperText={errors.address}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Place"
                value={currentAddress.place}
                onChange={(e) => setCurrentAddress({ ...currentAddress, place: e.target.value })}
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
            onClick={handleSaveAddress}
            color="primary"
            variant="contained"
            disabled={saving}
          >
            {saving ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this address?</Typography>
          {apiError && (
            <Alert severity="error" sx={{ mb: 2, mt: 2 }}>
              {apiError}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteAddress}
            color="primary"
            variant="contained"
            disabled={deleting}
          >
            {deleting ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}