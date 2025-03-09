import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, CircularProgress } from '@mui/material';

import useHeaderData from 'src/hooks/useHeaderData';

import Nav from './nav';
import Main from './main';
import Header from './header';
import Footer from './footer';

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);
  const { headerData, headerLoading } = useHeaderData();
  const { businessInfo } = headerData || {};

  if (headerLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress /> 
      </Box>
    );
  }

  return (
    <>
      <Header
        onOpenNav={() => setOpenNav(true)}
        businessDetails={businessInfo}
        headerLoading={headerLoading}
      />

      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main>{children}</Main>
      </Box>

      <Footer businessDetails={businessInfo} headerLoading={headerLoading} />
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};