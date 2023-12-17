import { useCallback } from 'react';

export function useAuthHeaderOptions() {
  const getOptions = useCallback(() => {
    const t = localStorage.getItem('token');
    return {
      headers: {
        authorization: `Bearer ${t}`
      }
    };
  }, []);

  return getOptions;
}
