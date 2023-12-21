import { useAuth0 } from '@auth0/auth0-react';
import { useCallback } from 'react';

export function useAuthHeaderOptionsAuth0() {
  const { getAccessTokenSilently } = useAuth0();
  const getOptions = useCallback(async () => {
    const t = await getAccessTokenSilently();
    return {
      headers: {
        authorization: `Bearer ${t}`
      }
    };
  }, [getAccessTokenSilently]);

  return getOptions;
}
