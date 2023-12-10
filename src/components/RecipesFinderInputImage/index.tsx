import { useCallback, useEffect } from 'react';
import Box from '@mui/material/Box';

import { useAppSelector, useAppDispatch } from 'hooks/useReduxHooks';
import {
  setPredictions,
  setImageUrl,
  setTab,
} from 'features/recipesFinder/recipesFinderSlice';
import { Prediction } from 'interfaces/types';

import InputViaImage from './InputViaImage';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from 'components/ErrorFallback';

export default function RecipesFinderInput() {
  const dispatch = useAppDispatch();
  const { imageUrl } = useAppSelector((state) => {
    return {
      imageUrl: state.recipesFinder.imageUrl,
      tab: state.recipesFinder.tab,
    };
  });

  const dispatchSetImageUrl = useCallback(
    (imageUrl: string) => {
      dispatch(setImageUrl(imageUrl));
    },
    [dispatch]
  );

  const dispatchSetPredictions = useCallback(
    (predictions: Array<Prediction>) => {
      dispatch(setPredictions(predictions));
    },
    [dispatch]
  );

  useEffect(() => {
    return function reset() {
      dispatch(setTab(0));
    };
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <InputViaImage
          setImageUrl={dispatchSetImageUrl}
          imageUrl={imageUrl}
          setPredictions={dispatchSetPredictions}
        />
      </ErrorBoundary>
    </Box>
  );
}
