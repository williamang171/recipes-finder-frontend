import { useCallback, useState } from 'react';

import axios from 'configs/axios-instance';
import { Recipe } from 'interfaces/types';
import useHandleHttpRequestError from 'hooks/useHandleHttpRequestError';
import { useAuthHeaderOptionsAuth0 } from 'hooks/useAuthHeaderOptionsAuth0';

const apiBasePath = '/api/v1/recipe_ideas';

function useRecipeIdeas() {
  const { handleError } = useHandleHttpRequestError();
  const [data, setData] = useState<Array<Recipe>>([]);
  const [loading, setLoading] = useState(false);
  const getAuthHeaderOptions = useAuthHeaderOptionsAuth0();

  const getRecipeIdeas = useCallback(
    async (q: string) => {
      setLoading(true);
      const headerOptions = await getAuthHeaderOptions();
      axios
        .get(`${apiBasePath}/mealdb?q=${q}`, headerOptions)
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
