import React, { useCallback, useMemo, useEffect, useContext } from 'react';
import { Box, Tooltip } from '@mui/material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { styled } from '@mui/system';

import { Recipe } from 'interfaces/types';
import useRecipes from 'hooks/useHttpAPI/useRecipes';
import { AuthContext } from 'contexts/AuthContext';

interface StyledIconButtonProps extends IconButtonProps {
  isAuthenticated?: boolean;
}

const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'isAuthenticated'
})<StyledIconButtonProps>(({ isAuthenticated, theme }) => ({
  ...(isAuthenticated === false && {
    ':hover': {
      cursor: 'not-allowed'
    }
  })
}));

interface ListItemExtraBookmarkIconProps {
  found: boolean | Object;
  isAuthenticated: boolean;
}

// eslint-disable-next-line react/display-name
const ListItemExtraBookmarkIcon = React.memo((props: ListItemExtraBookmarkIconProps) => {
  const { found, isAuthenticated } = props;
  if (isAuthenticated) {
    return found ? (
      <Tooltip title="Remove recipe">
        <BookmarkIcon fontSize="medium" />
      </Tooltip>
    ) : (
      <Tooltip title="Save recipe">
        <BookmarkBorderIcon fontSize="medium" />
      </Tooltip>
    );
  }
  return (
    <Tooltip title="Please sign in to save the recipe">
      <BookmarkBorderIcon fontSize="medium" />
    </Tooltip>
  );
});

interface Props {
  fetchSavedRecipes: boolean;
}

function generateSavedRecipesMap(savedRecipes: Array<Recipe>, key: 'source_id') {
  const obj: Record<string, Recipe> = {};
  savedRecipes.forEach((r: Recipe) => {
    if (r[key]) {
      obj[r[key] || ''] = r;
    }
  });
  return obj;
}

export default function useListItemExtraBookmark(props: Props) {
  const { fetchSavedRecipes } = props;
  const { isAuthenticated } = useContext(AuthContext);
  const {
    createRecipe,
    getRecipes: getSavedRecipes,
    recipes: savedRecipes = [],
    removeRecipe
  } = useRecipes();

  useEffect(() => {
    if (isAuthenticated && fetchSavedRecipes) {
      getSavedRecipes();
    }
  }, [getSavedRecipes, isAuthenticated, fetchSavedRecipes]);

  const savedRecipesMapByMealId = useMemo(() => {
    return generateSavedRecipesMap(
      savedRecipes.filter((r) => r.source_type === 'themealdb'),
      'source_id'
    );
  }, [savedRecipes]);

  const savedRecipesByRedditPostId = useMemo(() => {
    return generateSavedRecipesMap(
      savedRecipes.filter((r) => r.source_type === 'reddit'),
      'source_id'
    );
  }, [savedRecipes]);

  const savedRecipesBySpoonacularId = useMemo(() => {
    return generateSavedRecipesMap(
      savedRecipes.filter((r) => r.source_type === 'spoonacular'),
      'source_id'
    );
  }, [savedRecipes]);

  const findRecipe = useCallback(
    (recipe: Recipe) => {
      const foundViaMealDbId =
        recipe.source_id && recipe.source_type === 'themealdb'
          ? savedRecipesMapByMealId[recipe.source_id]
          : false;
      const foundViaSpoonacularId =
        recipe.source_id && recipe.source_type === 'spoonacular'
          ? savedRecipesBySpoonacularId[recipe.source_id]
          : false;
      return foundViaMealDbId || foundViaSpoonacularId || false;
    },
    [savedRecipesMapByMealId, savedRecipesByRedditPostId]
  );

  const listItemExtra = useCallback(
    (recipe: Recipe) => {
      return null;
      // const found = findRecipe(recipe);

      // return (
      //   <Box
      //     sx={{
      //       display: 'flex',
      //       justifyContent: 'flex-end',
      //       alignItems: 'center',
      //       pl: 1,
      //       pb: 0.5,
      //       mr: 0.5
      //     }}
      //   >
      //     <StyledIconButton
      //       isAuthenticated={isAuthenticated || false}
      //       onClick={() => {
      //         if (!isAuthenticated) {
      //           return;
      //         }
      //         if (found) {
      //           removeRecipe(found.id);
      //           return;
      //         }
      //         createRecipe(recipe);
      //       }}
      //     >
      //       <ListItemExtraBookmarkIcon found={found} isAuthenticated={isAuthenticated || false} />
      //     </StyledIconButton>
      //   </Box>
      // );
    },
    [isAuthenticated, savedRecipesMapByMealId, createRecipe, removeRecipe, findRecipe]
  );

  return {
    listItemExtra
  };
}
