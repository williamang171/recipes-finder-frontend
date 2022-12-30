import { useEffect, useCallback, useContext } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import Alert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';

import { Recipe } from "interfaces/types";
import Layout from "components/Layout";
import RecipesList from "components/RecipesList";
import useRecipes from "hooks/useHttpAPI/useRecipes";
import { AuthContext } from "contexts/AuthContext";

export default function SavedRecipesPage() {
    const { isAuthenticated } = useContext(AuthContext);
    const { recipes, getRecipes, removeRecipe } = useRecipes();

    useEffect(() => {
        if (!isAuthenticated) {
            return;
        }
        getRecipes();
    }, [getRecipes, isAuthenticated]);

    const handleDeleteClick = useCallback((id: any) => {
        removeRecipe(id);
    }, [removeRecipe])

    const listItemExtra = useCallback((recipe: Recipe) => {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', pl: 1, pb: 0.2, mr: 1 }}>
                <Tooltip title="Remove recipe">
                    <IconButton onClick={() => {
                        handleDeleteClick(recipe.id)
                    }}
                    >
                        <DeleteIcon fontSize='medium' />
                    </IconButton>
                </Tooltip>
            </Box>
        )
    }, [handleDeleteClick]);

    const renderEmpty = useCallback(() => {
        if (!isAuthenticated) {
            return <Alert severity="info">
                Please sign in to see saved recipes
            </Alert>
        }
        return <Alert severity="info">
            No saved recipes yet
        </Alert>
    }, [isAuthenticated]);

    return <Layout>
        {<RecipesList empty={renderEmpty} recipes={recipes} listItemExtra={listItemExtra} />}
    </Layout>
}