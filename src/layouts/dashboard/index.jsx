import { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

import Nav from './nav';
import Main from './main';
import Header from './header';
import Footer from './footer';

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} />

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
