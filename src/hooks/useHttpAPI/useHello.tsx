import { useCallback } from 'react';
import axios from 'axios';

const apiBasePath = '/api/v1/hello';

export default function useHello() {
  const wakeUpDb = useCallback(async () => {
    await axios.get(`${apiBasePath}/wake-up`);
  }, []);

  return {
    wakeUpDb
  };
}
