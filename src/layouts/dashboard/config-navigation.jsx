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
    path: '/category',
    icon: <Iconify width={24} icon="mdi:apps-box" />,
  },
  {
    title: 'favorites',
    path: '/favorites',
    icon: <Iconify width={24} icon="mdi:heart-outline" />,
  },
  {
    title: 'account',
    path: '/account',
    icon: <Iconify width={24} icon="mdi:account-outline" />,
  },
];
export default navConfig;
