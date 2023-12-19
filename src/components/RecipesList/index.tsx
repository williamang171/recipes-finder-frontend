import { Grid, Box } from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/material';

import RecipeListItem from 'components/RecipesList/RecipeListItem';
import { Recipe } from 'interfaces/types';

interface Props {
  recipes: Array<Recipe>;
  listItemExtra?(recipe: Recipe): any;
  empty?(): any;
  loading?: boolean;
}

export default function RecipesList(props: Props) {
  const { recipes = [], empty, listItemExtra, loading } = props;
  const theme = useTheme();
  const belowSm = useMediaQuery(theme.breakpoints.down('sm'));

  if (recipes.length === 0 && empty && loading === false) {
    return empty();
  }

  return (
    <Box sx={{ position: 'relative' }}>
      <Grid container spacing={{ xs: 2, sm: 2, md: 2, lg: 2, xl: 2 }}>
        {recipes.map((r, i) => {
          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={2}
              key={r.source_id}
              sx={
                belowSm
                  ? {
                      maxWidth: 'calc(100vw - 16px)'
                    }
                  : {}
              }
            >
              <RecipeListItem
                sourceId={r.source_id}
                extra={listItemExtra}
                title={r.title || ''}
                url={r.url}
                imageUrl={r.image_url}
                id={r.id}
                sourceType={r.source_type}
                subredditNamePrefixed={r.subreddit_name_prefixed}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
