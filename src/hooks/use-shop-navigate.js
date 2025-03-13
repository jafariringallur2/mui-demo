import { useNavigate, useParams } from 'react-router-dom';

const isCustomDomain = import.meta.env.VITE_IS_CUSTOM_DOMAIN === 'true';
const useShopNavigate = () => {
  const navigate = useNavigate();
  const { shopUsername } = useParams();

  const shopNavigate = (path, new_tab = false,param=null) => {
    if (!isCustomDomain && shopUsername) {
      const url = `/${shopUsername}${path}`;
      if (new_tab) {
        window.open(url, '_blank');
        return;
      }
      if(param == null){
        navigate(url);
      }else{
        navigate({
          pathname: url,
          search: param,
        });
      }
    } else {
      if (new_tab) {
        window.open(path, '_blank');
        return;
      }
      if(param == null){
        navigate(path);
      }else{
        navigate({
          pathname: path,
          search: param,
        });
      }
    }
  };
  

  return shopNavigate;
};

export default useShopNavigate;
