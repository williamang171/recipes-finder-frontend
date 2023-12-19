import { RecipeSourceType } from 'interfaces/types';
import React from 'react';

export default function useGetRecipeSourceLabel({
  sourceType,
  subredditNamePrefixed
}: {
  sourceType?: RecipeSourceType;
  subredditNamePrefixed?: string;
}) {
  const recipeSource = React.useMemo(() => {
    if (sourceType == 'themealdb') {
      return 'themealdb';
    }
    if (sourceType === 'spoonacular') {
      return 'spoonacular';
    }
    if (sourceType == 'reddit') {
      return subredditNamePrefixed || 'reddit';
    }
    return 'Unknown';
  }, [sourceType, subredditNamePrefixed]);

  return recipeSource;
}
