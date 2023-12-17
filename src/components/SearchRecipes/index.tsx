import React, { useEffect, useState, useCallback } from 'react';
import { Backdrop, CircularProgress, Typography, useMediaQuery } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import CloseIcon from '@mui/icons-material/Close';

import RecipesList from 'components/RecipesList';
import { SEARCH_TYPE } from 'hooks/useHttpAPI/useMealDb';
import useRecipeIdeas from 'hooks/useHttpAPI/useRecipeIdeas';
// import RadioSearchType from "./RadioSearchType";
import useListItemExtraBookmark from './useListItemExtraBookmark';
import NoRecipesFound from './NoRecipesFound';

interface SearchRecipesProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchQuery: string;
}

export default function SearchRecipes(props: SearchRecipesProps) {
  const [searchType, setSearchType] = useState(SEARCH_TYPE.MEAL_NAME);
  const { open, setOpen, searchQuery } = props;
  const { getRecipeIdeas, data: recipeIdeas, resetRecipeIdeas, loading } = useRecipeIdeas();

  const { listItemExtra } = useListItemExtraBookmark({
    fetchSavedRecipes: true
  });

  const handleClose = () => {
    setOpen(false);
    resetRecipeIdeas();
  };

  useEffect(() => {
    if (!open || !searchQuery || !searchType) {
      return;
    }
    getRecipeIdeas(searchQuery);
  }, [open, searchQuery, searchType, getRecipeIdeas]);

  const renderEmpty = () => {
    if (searchQuery) {
      return <NoRecipesFound searchQuery={searchQuery} searchType={searchType} />;
    }
    return null;
  };
  const Over400 = useMediaQuery('(min-width:400px)');

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        maxHeight: '90%'
      }}
      maxWidth={'xl'}
      fullWidth
      fullScreen={Over400 ? false : true}
      PaperProps={{
        sx: {
          minHeight: '94%',
          maxHeight: '94%',
          top: '50%',
          transform: 'translate(0%, -50%)'
        }
      }}
    >
      <DialogTitle>
        <Typography id="modal-modal-title" variant="h6" component="div" mb={1}>
          Query given: {searchQuery}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Backdrop
          sx={{
            position: 'absolute',
            top: 'calc(50% - 20px)',
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
          recipes={recipeIdeas}
          listItemExtra={listItemExtra}
          loading={loading}
        />
      </DialogContent>
    </Dialog>
  );
}
