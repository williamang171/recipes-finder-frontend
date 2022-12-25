import React, { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import Box from '@mui/material/Box';

import usePredict from "hooks/useHttpAPI/usePredict";
import useGRecaptcha from "hooks/useGRecaptcha";
import { Prediction } from "interfaces/types";

import ImageFinderSample from "./ImageFinderSample";

interface Props {
    setPredictions(predictions: Array<Prediction>): any,
    imageUrl: string | null,
    setImageUrl(imageUrl: string): any
}

const defaultImageUrl = 'https://images.unsplash.com/photo-1637361973734-5faf9b1e923e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'

export default function InputViaUrl(props: Props) {
    const { pending, predictViaUrl } = usePredict()
    const [inputImageUrl, setInputImageUrl] = useState<string | null>("");
    const { setPredictions, imageUrl, setImageUrl } = props;
    const { captchaEnabled, gRecaptchaOnChange, siteKey, gRecaptchaHeaders, gRecaptchaRef, gRecaptchaValue, gRecaptchaReset } = useGRecaptcha();

    useEffect(() => {
        setInputImageUrl(imageUrl);
    }, [imageUrl])

    useEffect(() => {
        setImageUrl(defaultImageUrl);
    }, [setImageUrl]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await predictViaUrl(imageUrl || "", {
            headers: gRecaptchaHeaders
        })
        if (res && res.data) {
            setPredictions(res.data);
        }
        gRecaptchaReset();
    }

    return (
        <div>
            <div style={{
                display: "flex",
                alignItems: "flex-end",
                flexWrap: "wrap"
            }}>
                <ImageFinderSample setImageUrl={setImageUrl} />
                <Box sx={{ mr: 1 }} />
                {/* <ImageFinderUnsplash setImageUrl={setImageUrl} /> */}
            </div>

            <Box onSubmit={handleSubmit} component="form" sx={{ mt: 2 }}>


                <LoadingButton loading={pending} type="submit" disabled={!imageUrl || (captchaEnabled && !gRecaptchaValue)} color='primary' variant='contained' size="large">Submit</LoadingButton>
            </Box>
        </div>
    );
}