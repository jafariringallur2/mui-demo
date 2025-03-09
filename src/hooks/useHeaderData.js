import { useState, useEffect } from 'react';

import { getHeaderAPI } from 'src/services/apiService';


const useHeaderData = () => {
  const [headerData, setHeaderData] = useState(null);
  const [headerLoading, setHeaderLoading] = useState(true);

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const data = await getHeaderAPI();
        setHeaderData(data);
      } catch (error) {
        console.error('Failed to fetch header data:', error);
      } finally {
        setHeaderLoading(false);
      }
    };

    fetchHeaderData();
  }, []);

  return { headerData, headerLoading };
};

export default useHeaderData;