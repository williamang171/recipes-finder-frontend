import { useCallback } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const apiBasePath = '/api/messages';

export default function useHello() {
  const { getAccessTokenSilently } = useAuth0();
  const getPublicMessage = useCallback(async () => {
    const { data } = await axios.get(`${apiBasePath}/public`);
    console.log(data);
    alert(JSON.stringify(data));
  }, []);

  const getProtectedMessage = useCallback(async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      const { data } = await axios.get(`${apiBasePath}/protected`, {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      });
      alert(JSON.stringify(data));
    } catch (err) {
      alert('Failed to retrieve protected message');
      console.log(err);
    }
  }, []);

  return {
    getPublicMessage,
    getProtectedMessage
  };
}
