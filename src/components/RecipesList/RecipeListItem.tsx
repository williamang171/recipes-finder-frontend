
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from "@mui/material/Link";

import { Recipe } from "interfaces/types";
import { useImage } from 'react-image';
const StyledTypography = styled(Typography)(({ theme }) => ({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    whiteSpace: 'break-spaces',
    minHeight: 44,

    'a': {
        textDecoration: "none",
        color: theme.palette.primary.main
    },
    'a:hover': {
        textDecoration: "underline"
    }
}))


interface Props {
    url: string,
    imageUrl: string,
    sourceType: string,
    title: string,
    mealDbId?: string,
    id?: number,
    redditPostId?: string,
    extra?(recipe: Recipe): any
}

export default function RecipeListItem(props: Props) {
    const { url, imageUrl, title, extra, mealDbId, id, redditPostId, sourceType } = props;
    const { src } = useImage({
        srcList: [imageUrl, '/recipe-placeholder.png'],
        useSuspense: false
    })

    return (
        <Card sx={{
            display: 'flex', ':hover': {
                boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
            },
            minWidth: 320
        }} variant="outlined">
            <a target="_blank" rel="noreferrer" href={url}>
                <CardMedia
                    component="img"
                    sx={{ height: 100, width: "auto", maxHeight: 100, maxWidth: 100 }}
                    image={src}
                    alt={title}
                />
            </a>

            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, maxWidth: '100%', width: "100%", overflow: 'hidden' }}>
                <CardContent sx={{ flex: '1 0 auto', overflow: 'hidden', p: 1.5, pb: 0 }} >
                    <StyledTypography noWrap variant="subtitle2" sx={{
                        color: (theme) => theme.palette.primary.main
                    }}
                    >
                        <Link target="_blank" rel="noreferrer" href={url}>
                            {title}
                        </Link>
                    </StyledTypography>
                    {/* {mealDbId ? <Typography variant="subtitle1" color="text.secondary" >
                        Meal ID: {mealDbId}
                    </Typography> : null} */}
                </CardContent>
                {typeof extra === 'function' ? extra({
                    url,
                    image_url: imageUrl,
                    title,
                    mealdb_id: mealDbId,
                    reddit_post_id: redditPostId,
                    id,
                    source_type: sourceType
                }) : null}
            </Box>

        </Card>
    );
}
