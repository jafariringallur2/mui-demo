import { useNavigate, useParams } from 'react-router-dom';

const isCustomDomain = import.meta.env.VITE_IS_CUSTOM_DOMAIN === 'true';
const useShopNavigate = () => {
  const navigate = useNavigate();
  const { shopUsername } = useParams();

  const shopNavigate = (path, new_tab = false) => {
    if (!isCustomDomain && shopUsername) {
      const url = `/${shopUsername}${path}`;
      if (new_tab) {
        window.open(url, '_blank');
        return;
      }
      navigate(url);
    } else {
      if (new_tab) {
        window.open(path, '_blank');
        return;
      }
      navigate(path);
    }
  };
  

  return shopNavigate;
};

export default useShopNavigate;
