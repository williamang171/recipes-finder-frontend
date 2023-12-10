import { useEffect } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';

import ImageFinder from "./ImageFinder";
import ImageListContent from "./ImageListContent";
import useUnsplash from "hooks/useHttpAPI/useUnsplash";

interface ImageFinderUnsplashProps {
    setImageUrl(imageUrl: string): any
}

interface ImageListContentWtihEffectProps {
    setImageUrl(imageUrl: string): any;
    handleClose: () => void;
}

const ImageListContentWithEffect = (props: ImageListContentWtihEffectProps) => {
    const { data, nextPage, searchPhotos } = useUnsplash();

    useEffect(() => {
        searchPhotos({
            page: 1
        });
    }, [searchPhotos]);

    const fetchImagesNextPage = () => {
        searchPhotos({
            page: nextPage
        });
    }

    return (
        <InfiniteScroll scrollableTarget="images-finder-scrollable" dataLength={data.length} next={fetchImagesNextPage} hasMore={true} loader={<div>Loading...</div>}>
            <ImageListContent dataSource={data}
                handleClose={props.handleClose}
                imageOnClick={props.setImageUrl} />
        </InfiniteScroll>
    )
}

export default function ImageFinderUnsplash(props: ImageFinderUnsplashProps) {
    return <ImageFinder renderBody={({ handleClose }) => {
        return <ImageListContentWithEffect setImageUrl={props.setImageUrl} handleClose={handleClose} />
    }}
        description="Find an Image with Unsplash"
    />
}