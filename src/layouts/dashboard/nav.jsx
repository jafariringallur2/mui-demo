import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
import { useResponsive } from 'src/hooks/use-responsive';
import navConfig from './config-navigation';
import LoginDrawer from './LoginDrawer'; // Import the LoginDrawer component

export default function Nav({ openNav, onCloseNav }) {
  const pathname = usePathname();
  const upLg = useResponsive('up', 'lg');
  const [bottomNavValue, setBottomNavValue] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleBottomNavChange = (event, newValue) => {
    setBottomNavValue(newValue);

    if (newValue === 3) {
      const token = localStorage.getItem('token');
      if (token) {
        navigate('/account');
      } else {
        setDialogOpen(true); 
      }
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false); // Close the dialog
  };

  const renderBottomNav = (
    <BottomNavigation
      value={bottomNavValue}
      onChange={handleBottomNavChange}
      showLabels
      sx={{ zIndex: 1200 }}
    >
      {navConfig.map((item) => (
        <BottomNavigationAction
          key={item.title}
          component={item.title === 'account' ? undefined : RouterLink}
          href={item.title === 'account' ? undefined : item.path}
          label={item.title}
          icon={item.icon}
        />
      ))}
    </BottomNavigation>
  );

  return (
    <>
      {upLg ? null : (
        <Box
          sx={{
            display: { xs: 'block', lg: 'none' },
            position: 'fixed',
            bottom: 0,
            width: '100%',
            bgcolor: 'background.paper',
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
            zIndex: 1200,
          }}
        >
          {renderBottomNav}
        </Box>
      )}
      <LoginDrawer open={dialogOpen} onClose={handleCloseDialog} /> {/* Render the LoginDrawer */}
    </>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};
