import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const navConfig = [
  {
    title: 'home',
    path: '/',
    icon: <Iconify width={24} icon="mdi:home-outline" />,
  },
  {
    title: 'category',
    path: '/categories',
    icon: <Iconify width={24} icon="mdi:apps-box" />,
  },
  {
    title: 'cart',
    path: '/cart',
    icon: <Iconify width={24} icon="mdi:cart-outline" />,
  },
  {
    title: 'account',
    path: '/account',
    icon: <Iconify width={24} icon="mdi:account-outline" />,
  },
];
export default navConfig;
