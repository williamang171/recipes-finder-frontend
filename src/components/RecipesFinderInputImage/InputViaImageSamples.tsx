import React, { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';

import usePredict from 'hooks/useHttpAPI/usePredict';
import useGRecaptcha from 'hooks/useGRecaptcha';
import { Prediction } from 'interfaces/types';

import ImageFinderSample from './ImageFinderSample';
import ImageFinderUnsplash from './ImageFinderUnsplash';

interface Props {
  setPredictions(predictions: Array<Prediction>): any;
  imageUrl: string | null;
  setImageUrl(imageUrl: string): any;
}

const unsplash_enabled = process.env.REACT_APP_UNSPLASH_ENABLE;

export default function InputViaUrl(props: Props) {
  const { pending, predictViaUrl } = usePredict();
  const [inputImageUrl, setInputImageUrl] = useState<string | null>('');
  const { setPredictions, imageUrl, setImageUrl } = props;
  const {
    captchaEnabled,
    gRecaptchaOnChange,
    siteKey,
    gRecaptchaHeaders,
    gRecaptchaRef,
    gRecaptchaValue,
    gRecaptchaReset
  } = useGRecaptcha();

  useEffect(() => {
    setInputImageUrl(imageUrl);
  }, [imageUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await predictViaUrl(imageUrl || '', {
      headers: gRecaptchaHeaders
    });
    if (res && res.data) {
      setPredictions(res.data);
    }
    gRecaptchaReset();
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          flexWrap: 'wrap'
        }}
      >
        <ImageFinderSample setImageUrl={setImageUrl} />
        <Box sx={{ mr: 1 }} />
        {unsplash_enabled === 'True' ? <ImageFinderUnsplash setImageUrl={setImageUrl} /> : null}
      </div>

      <Box onSubmit={handleSubmit} component="form" sx={{ mt: 2 }}>
        <LoadingButton
          loading={pending}
          type="submit"
          disabled={!imageUrl || (captchaEnabled && !gRecaptchaValue)}
          color="primary"
          variant="contained"
          size="large"
        >
          Submit
        </LoadingButton>
      </Box>
    </div>
  );
}
