import { Box } from '@mui/material';

import Layout from 'components/Layout';
import RecipesFinderInputImage from 'components/RecipesFinderInputImage';
import RecipesFinderOutput from 'components/RecipesFinderOutput';

export default function FinderPage() {
  return (
    <Layout>
      <RecipesFinderInputImage />
      <Box sx={{ mb: 4 }} />
      <RecipesFinderOutput />
    </Layout>
  );
}
