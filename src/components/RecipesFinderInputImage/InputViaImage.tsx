import React from 'react';
import { Prediction } from 'interfaces/types';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import InputViaImageUrl from './InputViaImageUrl';
import InputViaImageUpload from './InputViaImageUpload';
import InputViaImageSamples from './InputViaImageSamples';

interface Props {
  setPredictions(predictions: Array<Prediction>): any;
  imageUrl: string | null;
  setImageUrl(imageUrl: string): any;
}

export default function InputViaImage(props: Props) {
  const { setPredictions, imageUrl, setImageUrl } = props;
  const [imageSrc, setImageSrc] = React.useState('url');
  const preferredMethod = localStorage.getItem('primaryFindMethod');

  React.useEffect(() => {
    if (preferredMethod === 'image-url') {
      setImageSrc('url');
    }
    if (preferredMethod === 'image-upload') {
      setImageSrc('upload');
    }
    if (preferredMethod === 'image-samples') {
      setImageSrc('samples');
    }
  }, [preferredMethod]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageSrc((event.target as HTMLInputElement).value);
  };

  return (
    <div>
      <FormControl sx={{ mb: 1 }}>
        <RadioGroup
          value={imageSrc}
          onChange={handleChange}
          row
          aria-labelledby="radio-button-groups-image-src"
          name="radio-button-groups-image-src"
        >
          <FormControlLabel value="url" control={<Radio />} label="URL" />
          <FormControlLabel value="upload" control={<Radio />} label="Upload" />
          <FormControlLabel value="samples" control={<Radio />} label="Select from samples" />
        </RadioGroup>
      </FormControl>
      {imageSrc === 'url' ? (
        <InputViaImageUrl
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          setPredictions={setPredictions}
        />
      ) : null}
      {imageSrc === 'upload' ? (
        <InputViaImageUpload setImageUrl={setImageUrl} setPredictions={setPredictions} />
      ) : null}
      {imageSrc === 'samples' ? (
        <InputViaImageSamples
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          setPredictions={setPredictions}
        />
      ) : null}
    </div>
  );
}
