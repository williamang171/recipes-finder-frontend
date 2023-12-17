import React, { useState, useCallback } from 'react';
import { Backdrop, Box, CircularProgress, TextField } from '@mui/material';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import RecipesList from 'components/RecipesList';
import useListItemExtraBookmark from './useListItemExtraBookmark';
import useRecipeIdeas from 'hooks/useHttpAPI/useRecipeIdeas';
import ExampleText from './ExampleText';

export default function SearchRecipesViaText() {
  const [search, setSearch] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { getRecipeIdeas, data: recipeIdeas, loading } = useRecipeIdeas();
  const theme = useTheme();
  const overSm = useMediaQuery(theme.breakpoints.up('sm'));

  const { listItemExtra } = useListItemExtraBookmark({
    fetchSavedRecipes: true
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  const handleChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleChange(e);
    },
    [handleChange]
  );

  const renderEmpty = () => {
    if (search && submitted && !loading) {
      return 'No recipes found for the given search query, please try another query';
    }
    return null;
  };

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      getRecipeIdeas(search);
      setSubmitted(true);
    },
    [getRecipeIdeas, search]
  );

  const handleExampleTextOnClick = useCallback(
    (s: string) => {
      setSearch(s);
      getRecipeIdeas(s);
    },
    [setSearch]
  );

  return (
    <Box component="form" sx={{ mt: 2, position: 'relative' }} onSubmit={handleSubmit}>
      <TextField
        inputProps={{
          maxLength: 100
        }}
        fullWidth
        value={search}
        onChange={handleChangeInput}
        sx={{
          mb: 1
        }}
        variant="outlined"
        label="Search Query"
        size="small"
        autoFocus
      />
      <ExampleText handleExampleTextOnClick={handleExampleTextOnClick} />
      <Backdrop
        sx={{
          position: 'absolute',
          top: overSm ? '120px' : '300px',
          bottom: 'unset',
          background: 'transparent',
          zIndex: 10000
        }}
        open={loading || false}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <RecipesList
        empty={renderEmpty}
        recipes={loading ? [] : recipeIdeas}
        listItemExtra={listItemExtra}
        loading={loading || false}
      />
      <Box sx={{ mb: 2 }} />
    </Box>
  );
}
