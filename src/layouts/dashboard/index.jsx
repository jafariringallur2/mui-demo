import { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

import Nav from './nav';
import Main from './main';
import Header from './header';
import Footer from './footer';
import ShoppingCartDialog from './ShoppingCartDialog';

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const handleOpenCart = () => {
    setCartOpen(true);
  };

  const handleCloseCart = () => {
    setCartOpen(false);
  };
  return (
    <>
     <Header onOpenCart={handleOpenCart} />
     <ShoppingCartDialog open={cartOpen} onClose={handleCloseCart} />
      <Box
        sx={{
          minHeight: '100vh', // Ensure full viewport height
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        {/* Main Content */}

        <Main>{children}</Main>
      </Box>

      {/* Footer outside the flexbox to make it stick to bottom */}
      <Footer />
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
