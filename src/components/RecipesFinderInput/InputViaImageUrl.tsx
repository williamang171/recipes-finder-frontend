import React, { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { LoadingButton } from "@mui/lab";
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import usePredict from "hooks/useHttpAPI/usePredict";
import useGRecaptcha from "hooks/useGRecaptcha";
import { Prediction } from "interfaces/types";
import { defaultImage } from "data/sample-images";

interface Props {
    setPredictions(predictions: Array<Prediction>): any,
    imageUrl: string | null,
    setImageUrl(imageUrl: string): any
}


export default function InputViaUrl(props: Props) {
    const { pending, predictViaUrl } = usePredict()
    const theme = useTheme();
    const [inputImageUrl, setInputImageUrl] = useState<string | null>("");
    const { setPredictions, imageUrl, setImageUrl } = props;
    const { captchaEnabled, gRecaptchaOnChange, siteKey, gRecaptchaHeaders, gRecaptchaRef, gRecaptchaValue, gRecaptchaReset } = useGRecaptcha();

    useEffect(() => {
        setInputImageUrl(imageUrl);
    }, [imageUrl])

    useEffect(() => {
        setImageUrl(defaultImage.imgForSubmit);
    }, [setImageUrl]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputImageUrl(e.target.value);
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setImageUrl(e.target.value);
    }

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
            <Box onSubmit={handleSubmit} component="form" >
                <TextField fullWidth value={inputImageUrl} onChange={handleChange} sx={{
                    mb: 3
                }} variant='outlined' label='Image URL' size="small"
                    onBlur={handleBlur}
                />
                {captchaEnabled ? <>
                    <ReCAPTCHA
                        ref={gRecaptchaRef}
                        sitekey={siteKey}
                        onChange={gRecaptchaOnChange}
                    />
                    <Box sx={{ mb: 2 }} />
                </>
                    : null}

                <LoadingButton loading={pending} type="submit" disabled={!imageUrl || (captchaEnabled && !gRecaptchaValue)} color='primary' variant='contained' size="large">Submit</LoadingButton>
            </Box>
        </div>
    );
}
