import ImageFinder from "./ImageFinder";
import ImageListContent from "./ImageListContent";

const dataSource = [
    {
        img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzODg2NDR8MHwxfHNlYXJjaHw2fHxmb29kfGVufDB8fHx8MTY3MTg3MDI0Ng&ixlib=rb-4.0.3&q=80&w=1080',
        imgForSubmit: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzODg2NDR8MHwxfHNlYXJjaHw2fHxmb29kfGVufDB8fHx8MTY3MTg3MDI0Ng&ixlib=rb-4.0.3&q=80&w=1080',
        author: '@briewilly',
        authorLink: 'https://unsplash.com/@briewilly'
    },
    {
        img: 'https://images.unsplash.com/photo-1513862153653-f8b7324e1779?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=673&q=80',
        imgForSubmit: 'https://images.unsplash.com/photo-1513862153653-f8b7324e1779?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=673&q=80',
        author: '@moniqa',
        authorLink: 'https://unsplash.com/@moniqa'
    },
    {
        img: 'https://images.unsplash.com/photo-1607269832078-1a3bd22a306d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        imgForSubmit: 'https://images.unsplash.com/photo-1607269832078-1a3bd22a306d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        author: '@rabbit_in_blue',
        authorLink: 'https://unsplash.com/@rabbit_in_blue'
    },
    {
        img: 'https://images.unsplash.com/photo-1637361973734-5faf9b1e923e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        imgForSubmit: 'https://images.unsplash.com/photo-1637361973734-5faf9b1e923e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        author: '@lucaslobak',
        authorLink: 'https://unsplash.com/@lucaslobak'
    }
];

interface ImageFinderSampleProps {
    setImageUrl(imageUrl: string): any
}

export default function ImageFinderSample(props: ImageFinderSampleProps) {
    return <ImageFinder renderBody={({ handleClose }) => {
        return <ImageListContent dataSource={dataSource} imageOnClick={props.setImageUrl} handleClose={handleClose} />
    }} description="Select a sample Image" />
}