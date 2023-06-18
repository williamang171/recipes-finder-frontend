import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Backdrop, Box, CircularProgress, TextField } from "@mui/material";
import debounce from "lodash/debounce";

import RecipesList from "components/RecipesList";
import useListItemExtraBookmark from "./useListItemExtraBookmark";
import useRecipeIdeas from "hooks/useHttpAPI/useRecipeIdeas";
import ExampleText from "./ExampleText";

export default function SearchRecipesViaText() {
    const [search, setSearch] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const { getRecipeIdeas, data: recipeIdeas, loading } = useRecipeIdeas()

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
        if (searchQuery) {
            return "No recipes found for the given search query, please try another query";
        }
        return null;
    }

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
    }, [])

    const handleExampleTextOnClick = useCallback((s: string) => {
        setSearch(s)
        setSearchQuery(s)
    }, [setSearch, setSearchQuery])

    return <Box component="form" sx={{ mt: 2, position: 'relative' }} onSubmit={handleSubmit}>
        <TextField inputProps={{
            maxLength: 100
        }} fullWidth value={search} onChange={handleChangeInput} sx={{
            mb: 1
        }} variant='outlined' label='Search Query' size="small"
            autoFocus
        />
        <ExampleText handleExampleTextOnClick={handleExampleTextOnClick} />
        <Backdrop sx={{ position: 'absolute', top: '120px', bottom: 'unset', background: 'transparent', zIndex: 10000 }} open={loading || false} >
            <CircularProgress color="inherit" />
        </Backdrop>
        <RecipesList empty={renderEmpty} recipes={loading ? [] : recipeIdeas} listItemExtra={listItemExtra} loading={loading || false} />
        <Box sx={{ mb: 2 }} />
    </Box>
}