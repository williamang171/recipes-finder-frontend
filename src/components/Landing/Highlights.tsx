import { Grid, Container } from '@mui/material';
import Highlight from './Highlight';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import SearchIcon from '@mui/icons-material/Search';
import BookmarksIcon from '@mui/icons-material/Bookmarks';

const items = [
  {
    icon: <ImageSearchIcon />,
    title: 'Find via Images',
    description: 'Find recipes by providing image URL or uploading image'
  },
  {
    icon: <SearchIcon />,
    title: 'Find via Queries',
    description: 'Find recipes via text based queries and filtering'
  }
];

export default function Highlights() {
  return (
    <Container sx={{ textAlign: 'center', pt: 16, pb: 12 }}>
      <Grid container columnSpacing={12} rowSpacing={4}>
        {items.map((i) => {
          return (
            <Grid item xs={12} sm={12} md={12} lg={6} key={i.title}>
              <Highlight title={i.title} description={i.description} icon={i.icon} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
