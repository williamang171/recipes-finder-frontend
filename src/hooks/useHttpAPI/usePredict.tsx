import { useSnackbar } from "notistack";
import { useCallback, useState } from "react";

import axios from "configs/axios-instance";
import useHandleHttpRequestError from '../useHandleHttpRequestError';

const apiBasePath = "api/v1/predict";

function usePredict() {
    const [predictions, setPredictions] = useState([]);
    const { handleError } = useHandleHttpRequestError();
    const [pending, setPending] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const predictViaUrl = useCallback(async (imageUrl: string, options?) => {
        try {
            setPending(true);
            const res = await axios.post(`${apiBasePath}/`, {
                url: imageUrl
            }, options);
            if (res.data.error && res.data.estimated_time) {
                throw new Error('Model is loading, please try again later.');
            }
            setPredictions(res.data);
            setPending(false);
            enqueueSnackbar("Predictions made");
            return res;
        } catch (err) {
            handleError(err);
            setPending(false);
        }
    }, [setPending, setPredictions, handleError, enqueueSnackbar]);

    const predictViaUpload = useCallback(async (formData, options?) => {
        try {
            setPending(true);
            const res = await axios.post(`${apiBasePath}/upload`, formData, options);
            if (res.data.error && res.data.estimated_time) {
                throw new Error('Model is loading, please try again later.');
            }
            setPredictions(res.data);
            setPending(false);
            enqueueSnackbar("Predictions made");
            return res;
        } catch (err) {
            handleError(err);
            setPending(false);
        }
    }, [setPending, setPredictions, handleError, enqueueSnackbar])

    return {
        predictions,
        predictViaUrl,
        predictViaUpload,
        pending
    }
}

export default usePredict