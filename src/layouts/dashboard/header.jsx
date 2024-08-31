import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart  } from 'src/context/CartContext';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { useResponsive } from 'src/hooks/use-responsive';
import { bgBlur } from 'src/theme/css';
import Iconify from 'src/components/iconify';
import { HEADER } from './config-layout';
import Searchbar from './common/searchbar';
import LoginDialog from './LoginDialog'; // Import the dialog component

export default function Header({ onOpenNav }) {
  const { cartCount } = useCart();
  const theme = useTheme();
  const lgUp = useResponsive('up', 'lg');
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const navigate = useNavigate();

  const handleOpenLoginDialog = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/account');
    } else {
      setOpenLoginDialog(true);
    }
  };

  const handleCloseLoginDialog = () => {
    setOpenLoginDialog(false);
  };
  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <>
      <AppBar
        sx={{
          boxShadow: '0px 4px 6px -1px rgba(0,0,0,0.1)',
          height: HEADER.H_MOBILE,
          zIndex: theme.zIndex.appBar + 1,
          ...bgBlur({
            color: theme.palette.background.default,
          }),
          transition: theme.transitions.create(['height'], {
            duration: theme.transitions.duration.shorter,
          }),
          ...(lgUp && {
            height: HEADER.H_DESKTOP,
          }),
        }}
      >
        <Toolbar
          sx={{
            height: 1,
            px: { lg: 5 },
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box
            component="img"
            src="https://www.boat-lifestyle.com/cdn/shop/files/boAt_logo_small_3067da8c-a83b-46dd-b28b-6ef1e16ccd17_small.svg"
            alt="Logo"
            sx={{ height: { xs: '50px', sm: '60px' },cursor:"pointer" }}
            onClick={() => navigate('/')}
          />

          <Stack direction="row" alignItems="center" spacing={1}>
            <Searchbar />
            {lgUp && (
              <IconButton onClick={handleOpenLoginDialog}>
                <Iconify width={24} icon="mdi:account-outline" />
              </IconButton>
            )}
            <IconButton color="default" onClick={handleCartClick}>
             {cartCount > 0 && (
                <Badge badgeContent={cartCount} color="error">
                  <Iconify width={24} icon="mdi:cart-outline" />
                </Badge>
              )}
              {cartCount === 0 && (
                <Iconify width={24} icon="mdi:cart-outline" />
              )}
              </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      <LoginDialog open={openLoginDialog} onClose={handleCloseLoginDialog} />
    </>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};
