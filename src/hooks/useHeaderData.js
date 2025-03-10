import { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';


import { getHeaderAPI } from 'src/services/apiService';

const useHeaderData = () => {
  const [headerData, setHeaderData] = useState(null);
  const [headerLoading, setHeaderLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const data = await getHeaderAPI();
        setHeaderData(data);
      } catch (error) {
        navigate('/404');
        console.error('Failed to fetch header data:', error);
      } finally {
        setHeaderLoading(false);
      }
    };

    fetchHeaderData();
  }, [navigate]);

  return { headerData, headerLoading };
};

export default useHeaderData;