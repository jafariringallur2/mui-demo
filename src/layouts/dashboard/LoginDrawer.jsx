import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Iconify from 'src/components/iconify';
import { sendOtp, verifyOtp } from 'src/services/apiService';

const LoginDrawer = ({ open, onClose }) => {
  const [otpSent, setOtpSent] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, severity: 'info', message: '' });
  const otpRefs = useRef([]);

  const handleSendOtp = async () => {
    if (phoneNumber.length === 10) {
      setLoading(true);
      try {
        const response = await sendOtp(phoneNumber);
        if (response.success) {
          setOtpSent(true);
        } else {
          setAlert({ open: true, severity: 'error', message: response.errorMsg });
        }
      } catch (error) {
        console.error('Failed to send OTP:', error);
        setAlert({ open: true, severity: 'error', message: 'Failed to send OTP.' });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length === 6) {
      setLoading(true);
      try {
        const response = await verifyOtp(phoneNumber, otp);
        if (response.success) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('phoneNumber', phoneNumber);
          setAlert({ open: true, severity: 'success', message: 'Login successful!' });
          setTimeout(() => {
            onClose();
          }, 1000);
        } else {
          setAlert({ open: true, severity: 'error', message: response.errorMsg });
        }
      } catch (error) {
        console.error('Failed to verify OTP:', error);
        setAlert({ open: true, severity: 'error', message: 'Failed to verify OTP.' });
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (otpSent) {
      otpRefs.current[0].focus();
    }
  }, [otpSent]);

  const handleOtpChange = (index, value) => {
    if (value.length === 1 && index < 5) {
      otpRefs.current[index + 1].focus();
    }
    setOtp((prev) => {
      const otpArray = prev.split('');
      otpArray[index] = value;
      return otpArray.join('');
    });
  };

  const handlePasteOtp = (event) => {
    event.preventDefault();
    const pastedValue = (event.clipboardData || window.clipboardData).getData('text');
    const otpArray = pastedValue.split('').slice(0, 6);

    otpArray.forEach((digit, index) => {
      otpRefs.current[index].value = digit;
      otpRefs.current[index].removeAttribute('disabled');
      if (index < 5) {
        otpRefs.current[index + 1].focus();
      }
    });

    setOtp(otpArray.join(''));
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          height: 'auto',
          maxHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          padding: 2,
        },
      }}
    >
      <Stack spacing={2} sx={{ flexGrow: 1 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6" align="center">
            Login
          </Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Iconify icon="mdi:close" />
          </IconButton>
        </Box>
        {!otpSent ? (
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Your Mobile Number"
              variant="outlined"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              InputProps={{
                startAdornment: <Typography sx={{ mr: 1 }}>+91</Typography>,
              }}
            />
            <Button
              variant="contained"
              color="error"
              fullWidth
              onClick={handleSendOtp}
              disabled={phoneNumber.length !== 10 || loading}
              sx={{
                height: '2.8rem',
                borderRadius: '1rem',
              }}
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </Button>
          </Stack>
        ) : (
          <Stack spacing={2}>
            <Typography align="center">Enter the code sent to your phone number</Typography>
            <Stack direction="row" justifyContent="center" spacing={1} className="otp-field">
              {[...Array(6)].map((_, index) => (
                <TextField
                  key={index}
                  variant="outlined"
                  inputProps={{
                    maxLength: 1,
                    style: { textAlign: 'center' },
                  }}
                  inputRef={(el) => {
                    otpRefs.current[index] = el;
                  }}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onPaste={handlePasteOtp}
                />
              ))}
            </Stack>
            <Typography align="center" color="text.secondary">
              Didn’t receive code?{' '}
              <span
                role="button"
                tabIndex="0"
                style={{ color: 'black', cursor: 'pointer' }}
                onClick={handleSendOtp}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleSendOtp();
                  }
                }}
              >
                Resend code
              </span>
            </Typography>

            <Button
              variant="contained"
              color="error"
              fullWidth
              onClick={handleVerifyOtp}
              disabled={otp.length !== 6 || loading}
              sx={{
                height: '2.8rem',
                borderRadius: '1rem',
              }}
            >
              {loading ? 'Verifying...' : 'Verify'}
            </Button>
          </Stack>
        )}
      </Stack>
      <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Drawer>
  );
};

LoginDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default LoginDrawer;
