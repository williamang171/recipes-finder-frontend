import { SEARCH_TYPE } from 'hooks/useHttpAPI/useMealDb';

interface Props {
  searchType: string;
  searchQuery: string;
}

export default function NoRecipesFound(props: Props) {
  const { searchType, searchQuery } = props;
  if (searchQuery) {
    return <div>{`No recipes found with the given query`}</div>;
  }

  return null;
}
