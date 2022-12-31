import { useCallback, useContext, useState } from "react";

import axios from "configs/axios-instance";
import { Recipe } from "interfaces/types";
import { useSnackbar } from 'notistack';
import useHandleHttpRequestError from 'hooks/useHandleHttpRequestError';
import { GlobalLoadingContext } from "contexts/GlobalLoadingContext";
import { useAuthHeaderOptions } from "hooks/useAuthHeaderOptions";

const apiBasePath = "/api/v1/recipes";

function useRecipes() {
    const { handleError } = useHandleHttpRequestError();
    const { enqueueSnackbar } = useSnackbar();
    const [recipes, setRecipes] = useState<Array<Recipe>>([]);
    // const [pending, setPending] = useState(false);
    const { setLoading } = useContext(GlobalLoadingContext);

    const getAuthHeaderOptions = useAuthHeaderOptions();

    const createRecipe = useCallback(async (values: Recipe) => {
        setLoading(true);
        axios.post(`${apiBasePath}/`, values, getAuthHeaderOptions())
            .then((res) => {
                const newRecipes = [
                    ...recipes,
                    res.data
                ]
                setRecipes(newRecipes);
                enqueueSnackbar("Recipe saved");
                setLoading(false);
            }).catch(err => {
                setLoading(false);
                handleError(err);
            })
    }, [getAuthHeaderOptions, recipes, enqueueSnackbar, setLoading, handleError])

    const removeRecipe = useCallback(async (id) => {
        setLoading(true);
        axios.delete(`${apiBasePath}/${id}`, getAuthHeaderOptions())
            .then(() => {
                const newRecipes = recipes.filter((r) => {
                    return r.id !== id;
                })
                setRecipes(newRecipes);
                enqueueSnackbar("Recipe removed");
                setLoading(false);
            }).catch((err) => {
                setLoading(false);
                handleError(err);
            })
    }, [getAuthHeaderOptions, recipes, enqueueSnackbar, setLoading, handleError])

    const getRecipes = useCallback(async () => {
        setLoading(true);
        // const options = await getOptions();
        axios.get(`${apiBasePath}/`, getAuthHeaderOptions())
            .then((res) => {
                setLoading(false);
                setRecipes(res.data.results)
            }).catch((err) => {
                setLoading(false);
                handleError(err);
            })
    }, [getAuthHeaderOptions, setLoading, handleError])

    return {
        recipes,
        createRecipe,
        getRecipes,
        removeRecipe
    }
}

export default useRecipes