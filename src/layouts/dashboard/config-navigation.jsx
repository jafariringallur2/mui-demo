import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name, sx) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ ...sx, width: 24, height: 24 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics', { width: 24, height: 24 }), // Adjust size here
  },
  {
    title: 'user',
    path: '/user',
    icon: icon('ic_user', { width: 24, height: 24 }), // Adjust size here
  },
  {
    title: 'product',
    path: '/products',
    icon: icon('ic_cart', { width: 24, height: 24 }), // Adjust size here
  },
  {
    title: 'blog',
    path: '/blog',
    icon: icon('ic_blog', { width: 24, height: 24 }), // Adjust size here
  },
];

export default navConfig;
