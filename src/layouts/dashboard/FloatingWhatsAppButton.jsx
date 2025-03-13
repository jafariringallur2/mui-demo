import React from 'react';
import PropTypes from 'prop-types';

import Iconify from 'src/components/iconify';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';

export default function FloatingWhatsAppButton({businessDetails, headerLoading}) {
  const location = useLocation(); 
  const whatsappNumber = businessDetails?.business_whatsapp;
  if (!whatsappNumber || headerLoading) {
    return null;
  }
  const hideOnRoutes = ['/cart'];

 const shouldHideButton = hideOnRoutes.some((route) =>
    location.pathname.endsWith(route)
  );
  if (shouldHideButton) {
    return null;
  }

  return (
    <Box
      component="a"
      href={`https://api.whatsapp.com/send?phone=${whatsappNumber}&text=Hi`}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        display: 'flex',
        cursor: 'pointer',
        position: 'fixed',
        width: 45,
        height: 45,
        bottom: {xs : 80, sm : 90},
        right: 25,
        backgroundColor: '#25d366',
        color: 'white',
        borderRadius: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 30,
        zIndex: 999,
        '&:hover': {
          backgroundColor: '#128C7E',
        },
      }}
    >
      <Iconify icon="bi:whatsapp" width={24} height={24} />
    </Box>
  );
}

FloatingWhatsAppButton.propTypes = {
  businessDetails: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),  
  headerLoading: PropTypes.bool,
};