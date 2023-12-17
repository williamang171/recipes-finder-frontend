import { useCallback, useContext, useState } from 'react';

import axios from 'configs/axios-instance';
import { Recipe } from 'interfaces/types';
import useHandleHttpRequestError from 'hooks/useHandleHttpRequestError';

const apiBasePath = '/api/v1/recipe_ideas';

function useRecipeIdeas() {
  const { handleError } = useHandleHttpRequestError();
  const [data, setData] = useState<Array<Recipe>>([]);
  const [loading, setLoading] = useState(false);
  const getRecipeIdeas = useCallback(
    async (q: string) => {
      setLoading(true);
      // const options = await getOptions();
      axios
        .get(`${apiBasePath}/async?q=${q}`)
        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          handleError(err);
        });
    },
    [setLoading, handleError]
  );

  const resetRecipeIdeas = useCallback(() => {
    setData([]);
    setLoading(false);
  }, [setData, setLoading]);

  return {
    data,
    getRecipeIdeas,
    resetRecipeIdeas,
    loading
  };
}

export default useRecipeIdeas;
