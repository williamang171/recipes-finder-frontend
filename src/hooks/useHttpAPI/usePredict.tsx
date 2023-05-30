import { useSnackbar } from "notistack";
import { useCallback, useState, useMemo, useContext, useEffect } from "react";

import axios from "configs/axios-instance";
import useHandleHttpRequestError from '../useHandleHttpRequestError';
import { AxiosError } from "axios";
import { GlobalLoadingContext } from "contexts/GlobalLoadingContext";
import { useAuthHeaderOptions } from "hooks/useAuthHeaderOptions";

const apiBasePath = "api/v1/predict";

function usePredict() {
    const [predictions, setPredictions] = useState([]);
    const { handleError } = useHandleHttpRequestError();
    const [pending, setPending] = useState(false);
    const { setLoading } = useContext(GlobalLoadingContext);
    const { enqueueSnackbar } = useSnackbar();

    const getAuthHeaderOptions = useAuthHeaderOptions();

    useEffect(() => {
        setLoading(pending);
    }, [pending, setLoading])

    const axiosRetryConfig = useMemo(() => {
        return {
            retries: 10,
            onRetry: (retryCount: number, error: AxiosError) => {
                if (error.response !== undefined && error.response.status === 503) {
                    const response = error.response || {};
                    const data = response.data || {};
                    if (data && data.detail) {
                        if (data.detail.error && data.detail.estimated_time) {
                            const msg = `Model is loading, retrying...`
                            enqueueSnackbar(msg, {
                                autoHideDuration: 8000,
                            });
                            return;
                        }
                    }
                }
            },
            retryDelay: (retryCount: number) => {
                console.log(`retry attempt: ${retryCount}`);
                return 8000; // time interval between retries
            },
        }
    }, [enqueueSnackbar])

    const predictViaUrl = useCallback(async (imageUrl: string, options?) => {
        try {
            setPending(true);
            const res = await axios.post(`${apiBasePath}/`, {
                url: imageUrl
            }, {
                ...options,
                ...getAuthHeaderOptions(),
                'axios-retry': axiosRetryConfig
            });
            setPredictions(res.data);
            setPending(false);
            enqueueSnackbar("Predictions made");
            return res;
        } catch (err) {
            handleError(err);
            setPending(false);
        }
    }, [setPending, setPredictions, handleError, enqueueSnackbar, axiosRetryConfig, getAuthHeaderOptions]);

    const predictViaUpload = useCallback(async (formData, options?) => {
        try {
            setPending(true);
            const res = await axios.post(`${apiBasePath}/upload`, formData, {
                ...options,
                ...getAuthHeaderOptions(),
                'axios-retry': axiosRetryConfig
            });

            setPredictions(res.data);
            setPending(false);
            enqueueSnackbar("Predictions made");
            return res;
        } catch (err) {
            handleError(err);
            setPending(false);
        }
    }, [setPending, setPredictions, handleError, enqueueSnackbar, axiosRetryConfig, getAuthHeaderOptions])

    return {
        predictions,
        predictViaUrl,
        predictViaUpload,
        pending: pending
    }
}

export default usePredict