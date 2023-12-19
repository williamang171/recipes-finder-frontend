import React from 'react';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Link from '@mui/material/Link';

import { Recipe, RecipeSourceType } from 'interfaces/types';
import useGetRecipeSourceLabel from 'hooks/useGetRecipeSourceLabel';

const StyledTypography = styled(Typography)(({ theme }) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  whiteSpace: 'break-spaces',
  minHeight: 44,

  a: {
    textDecoration: 'none',
    color: theme.palette.primary.main
  },
  'a:hover': {
    textDecoration: 'underline'
  }
}));

const LoadingBox = styled(Box)(({ theme }) => ({
  width: 100,
  height: 100,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}));

interface Props {
  url: string;
  imageUrl: string;
  sourceType?: RecipeSourceType;
  title: string;
  id?: number;
  sourceId?: string;
  extra?(recipe: Recipe): any;
  subredditNamePrefixed?: string;
}

const placeholderImgPath = '/recipe-placeholder-v5.jpg';

export default function RecipeListItem(props: Props) {
  const { url, imageUrl, title, extra, sourceId, id, sourceType, subredditNamePrefixed } = props;
  const [imageSrc, setImageSrc] = React.useState(imageUrl || placeholderImgPath);
  const [loaded, setLoaded] = React.useState(false);

  const recipeSource = useGetRecipeSourceLabel({
    sourceType,
    subredditNamePrefixed
  });

  const theme = useTheme();
  const currentModeIsDark = theme.palette.mode === 'dark';

  return (
    <Card
      sx={{
        position: 'relative',
        ':hover': {
          boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
        },
        minHeight: 250,
        height: 250,
        maxHeight: 250
      }}
      variant="outlined"
    >
      <a target="_blank" rel="noreferrer" href={url} style={{ position: 'relative' }}>
        <Skeleton
          variant="rectangular"
          width={'100%'}
          height={150}
          sx={{ position: 'absolute', display: loaded ? 'none' : 'block' }}
        />
        <CardMedia
          component="img"
          loading="lazy"
          sx={{
            height: 150,
            objectFit: 'cover'
          }}
          onError={() => {
            setImageSrc(placeholderImgPath);
          }}
          onLoad={() => setLoaded(true)}
          image={imageSrc}
          alt={title}
        />
      </a>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          maxWidth: '100%',
          width: '100%',
          overflow: 'hidden'
        }}
      >
        <CardContent sx={{ flex: '1 0 auto', overflow: 'hidden', p: 1.5, pb: 0 }}>
          <StyledTypography noWrap variant="subtitle2">
            <Link
              target="_blank"
              rel="noreferrer"
              href={url}
              style={{
                color: currentModeIsDark ? '#fff' : theme.palette.primary.main
              }}
            >
              {title}
            </Link>
          </StyledTypography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              position: 'absolute',
              bottom: 4
            }}
          >
            Source: {recipeSource}
          </Typography>
        </CardContent>
        {typeof extra === 'function'
          ? extra({
              url,
              image_url: imageUrl,
              title,
              source_id: sourceId,
              id,
              source_type: sourceType,
              subreddit_name_prefixed: subredditNamePrefixed
            })
          : null}
      </Box>
    </Card>
  );
}
