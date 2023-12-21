import { useSnackbar } from 'notistack';
import { useCallback, useState, useMemo, useEffect } from 'react';

import axios from 'configs/axios-instance';
import useHandleHttpRequestError from '../useHandleHttpRequestError';
import { AxiosError } from 'axios';
import { useAuthHeaderOptionsAuth0 } from 'hooks/useAuthHeaderOptionsAuth0';

const apiBasePath = 'api/v1/predict';

function usePredict() {
  const [progress, setProgress] = useState(-1);
  const [predictions, setPredictions] = useState([]);
  const { handleError } = useHandleHttpRequestError();
  const [pending, setPending] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const getAuthHeaderOptions = useAuthHeaderOptionsAuth0();

  useEffect(() => {
    if (progress === 100) {
      const timer1 = setTimeout(() => setProgress(-1), 1500);
      return () => {
        clearTimeout(timer1);
      };
    }
  }, [progress, setProgress]);

  const axiosRetryConfig = useMemo(() => {
    return {
      retries: 10,
      onRetry: (retryCount: number, error: AxiosError) => {
        if (error.response !== undefined && error.response.status === 503) {
          const response = error.response || {};
          const data = response.data || {};
          if (data && data.detail) {
            if (data.detail.error && data.detail.estimated_time) {
              // const msg = `Model is loading, retrying...`;
              // enqueueSnackbar(msg, {
              //   autoHideDuration: 8000
              // });
              setProgress((v) => {
                if (v >= 95 && v < 99) {
                  return v + 1;
                }
                if (v >= 75 && v < 99) {
                  return v + 5;
                }
                if (v < 100) {
                  return v + 25;
                }
                return 99;
              });
              return;
            }
          }
        }
      },
      retryDelay: (retryCount: number) => {
        console.log(`retry attempt: ${retryCount}`);
        return 3000; // time interval between retries
      }
    };
  }, [enqueueSnackbar, setProgress]);

  const predictViaUrl = useCallback(
    async (imageUrl: string, options?) => {
      try {
        setPending(true);
        setProgress(0);
        const authHeaderOptions = await getAuthHeaderOptions();
        const res = await axios.post(
          `${apiBasePath}/`,
          {
            url: imageUrl
          },
          {
            ...options,
            ...authHeaderOptions,
            'axios-retry': axiosRetryConfig
          }
        );
        setProgress(100);
        setPredictions(res.data);
        setPending(false);
        enqueueSnackbar('Predictions made');
        return res;
      } catch (err) {
        handleError(err);
        setProgress(-1);
        setPending(false);
      }
    },
    [
      setPending,
      setPredictions,
      handleError,
      enqueueSnackbar,
      axiosRetryConfig,
      getAuthHeaderOptions
    ]
  );

  const predictViaUpload = useCallback(
    async (formData, options?) => {
      try {
        setPending(true);
        setProgress(0);
        const authHeaderOptions = await getAuthHeaderOptions();
        const res = await axios.post(`${apiBasePath}/upload`, formData, {
          ...options,
          ...authHeaderOptions,
          'axios-retry': axiosRetryConfig
        });
        setProgress(100);
        setPredictions(res.data);
        setPending(false);
        enqueueSnackbar('Predictions made');
        return res;
      } catch (err) {
        handleError(err);
        setProgress(-1);
        setPending(false);
      }
    },
    [
      setPending,
      setPredictions,
      handleError,
      enqueueSnackbar,
      axiosRetryConfig,
      getAuthHeaderOptions
    ]
  );

  return {
    predictions,
    predictViaUrl,
    predictViaUpload,
    pending: pending,
    progress
  };
}

export default usePredict;
