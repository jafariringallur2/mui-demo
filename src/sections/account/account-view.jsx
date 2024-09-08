import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Tab,
  Tabs,
  Paper,
  IconButton,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Chip,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Iconify from 'src/components/iconify';
import { getOrders } from 'src/services/apiService';

const getStatusBadge = (status) => {
  const statusColors = {
    Pending: 'warning',
    Canceled: 'error',
    Shipped: 'info',
    Delivered: 'success',
  };

  return (
    <Chip
      label={status}
      color={statusColors[status] || 'default'}
      sx={{
        textTransform: 'capitalize',
        fontSize: '0.75rem',
        padding: '2px 6px',
        height: 'auto',
      }}
    />
  );
};

const AccountView = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);
  const [orders, setOrders] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const token = localStorage.getItem('token');
  const phoneNumber = localStorage.getItem('phoneNumber');

  useEffect(() => {
    if (!token) {
      navigate('/?login=1');
    }
  }, [token, navigate]);

  useEffect(() => {
    if (selectedTab === 0) {
      getOrders()
        .then((response) => {
          if (response.success) {
            setOrders(response.data);
          }
        })
        .catch((error) => {
          console.error('Failed to fetch orders:', error);
        });
    }
  }, [selectedTab]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('phoneNumber');
    navigate('/');
  };

  const handleOrderClick = (orderId) => {
    window.open(`/order/${orderId}`, '_blank');
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 0:
        return (
          <List>
            {orders.map((order) => (
              <ListItem
                key={order.id}
                disablePadding
                secondaryAction={
                  <IconButton onClick={() => handleOrderClick(order.id)}>
                    <Iconify icon="mdi:arrow-right" width={20} />
                  </IconButton>
                }
              >
                <ListItemButton onClick={() => handleOrderClick(order.id)}>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body1" fontWeight="bold">
                          Order ID: {order.id}
                        </Typography>
                        {getStatusBadge(order.status)}
                      </Box>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary">
                        <Box>
                          <Typography variant="body2" fontWeight="bold">
                            Date: {order.date} | Total: ${order.total}
                          </Typography>
                        </Box>
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        );
      case 1:
        return <Typography>Here are your saved products.</Typography>;
      case 2:
        return <Typography>Here are your saved addresses.</Typography>;
      default:
        return <Typography>Select a tab to view content.</Typography>;
    }
  };

  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{ mt: '30px', display: 'flex', flexDirection: 'column' }}
    >
      {/* Header Section */}
      <Box
        boxShadow={3}
        borderRadius={2}
        padding={2}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
          marginLeft: { xs: 0, sm: '60px' },
        }}
      >
        <Typography variant="h4" component="h1">
          My Account
        </Typography>
        <Box
          borderRadius={2}
          alignItems="center"
          bgcolor="#e9f2ff"
          sx={{ display: 'flex', alignItems: 'center', gap: 2, padding: { xs: '4px', sm: '8px' } }}
        >
          <Typography variant="body1">{phoneNumber}</Typography>
          <IconButton onClick={handleLogout}>
            <Iconify icon="mdi:logout" width={24} />
          </IconButton>
        </Box>
      </Box>

      {/* Main Content - Tabs and Content */}
      <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
        {/* Tabs Section */}
        <Box
          sx={{
            flexGrow: 1,
            maxWidth: isMobile ? '100%' : 300,
            borderRight: isMobile ? 'none' : `1px solid ${theme.palette.divider}`,
            mb: isMobile ? 2 : 0,
          }}
        >
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            orientation={isMobile ? 'horizontal' : 'vertical'}
            variant={isMobile ? 'scrollable' : 'fullWidth'}
            sx={{
              [`& .MuiTabs-indicator`]: {
                backgroundColor: theme.palette.primary.main,
              },
            }}
          >
            <Tab
              icon={<Iconify icon="mdi:shopping" width={20} />} // My Orders icon
              iconPosition={isMobile ? 'top' : 'start'}
              label="Orders"
            />
            <Tab
              icon={<Iconify icon="mdi:heart" width={20} />} // Saved Products icon
              iconPosition={isMobile ? 'top' : 'start'}
              label="Favourites"
            />
            <Tab
              icon={<Iconify icon="mdi:map-marker" width={20} />} // Saved Addresses icon
              iconPosition={isMobile ? 'top' : 'start'}
              label="Addresses"
            />
          </Tabs>
        </Box>

        {/* Tab Content Section */}
        <Paper elevation={3} sx={{ flexGrow: 1, p: 2 }}>
          {renderTabContent()}
        </Paper>
      </Box>
    </Container>
  );
};

export default AccountView;
