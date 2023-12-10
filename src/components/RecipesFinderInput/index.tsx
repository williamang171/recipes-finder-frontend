import Box from '@mui/material/Box';
import SearchRecipesViaText from 'components/SearchRecipes/SearchRecipesViaText';

export default function RecipesFinderInput() {
  return (
    <Box sx={{ width: '100%' }}>
      <SearchRecipesViaText />
    </Box>
  );
}
