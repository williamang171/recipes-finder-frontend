import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Box, TextField } from "@mui/material";
import debounce from "lodash/debounce";

import RecipesList from "components/RecipesList";
import useListItemExtraBookmark from "./useListItemExtraBookmark";
import useRecipeIdeas from "hooks/useHttpAPI/useRecipeIdeas";

export default function SearchRecipesViaText() {
    const [search, setSearch] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const { getRecipeIdeas, data: recipeIdeas } = useRecipeIdeas()

    useEffect(() => {
        if (!searchQuery) {
            return;
        }
        getRecipeIdeas(searchQuery)
    }, [searchQuery, getRecipeIdeas])

    const { listItemExtra } = useListItemExtraBookmark({
        fetchSavedRecipes: true
    });

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }, []);

    const handleUpdateSearchQuery = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    }, []);

    const debouncedUpdateSearchQuery = useMemo(() => {
        return debounce(handleUpdateSearchQuery, 300);
    }, [handleUpdateSearchQuery])

    const handleChangeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(e);
        debouncedUpdateSearchQuery(e);
    }, [handleChange, debouncedUpdateSearchQuery]);

    const renderEmpty = () => {
        return null;
    }

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
    }, [])

    return <Box component="form" sx={{ mt: 2 }} onSubmit={handleSubmit}>
        <TextField fullWidth value={search} onChange={handleChangeInput} sx={{
            mb: 1
        }} variant='outlined' label='Search Query' size="small"
            autoFocus
            helperText="E.g. Apple, Blueberry, Carrot"
        />

        <RecipesList empty={renderEmpty} recipes={recipeIdeas} listItemExtra={listItemExtra} />
        <Box sx={{ mb: 2 }} />
    </Box>
}