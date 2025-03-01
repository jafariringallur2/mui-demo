import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { getHeaderAPI } from 'src/services/apiService';

import Nav from './nav';
import Main from './main';
import Header from './header';
import Footer from './footer';


// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);
  const [businessInfo, setBusinessInfo] = useState([]);
  const [headerLoading, setHeaderLoading] = useState(true);

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const data = await getHeaderAPI();
        setBusinessInfo(data.businessInfo);
      } catch (error) {
        console.error('Failed to fetch items:', error);
      }finally {
        setHeaderLoading(false);
      }
    };

    fetchHeaderData();
  }, []);

  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} businessDetails={businessInfo} headerLoading={headerLoading} />

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
      <Footer businessDetails={businessInfo} headerLoading={headerLoading} />
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
