import ImageFinder from './ImageFinder';
import ImageListContent from './ImageListContent';
import { sampleImages } from 'data/sample-images';

interface ImageFinderSampleProps {
  setImageUrl(imageUrl: string): any;
}

export default function ImageFinderSample(props: ImageFinderSampleProps) {
  return (
    <ImageFinder
      renderBody={({ handleClose }) => {
        return (
          <ImageListContent
            dataSource={sampleImages}
            imageOnClick={props.setImageUrl}
            handleClose={handleClose}
          />
        );
      }}
      description="Select a sample Image"
    />
  );
}
