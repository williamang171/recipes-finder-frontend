
import { Grid, Box } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";

import RecipeListItem from "components/RecipesList/RecipeListItem";
import { GlobalLoadingContext } from "contexts/GlobalLoadingContext";
import { Recipe } from "interfaces/types";
import { useContext } from "react";

interface Props {
    recipes: Array<Recipe>,
    listItemExtra?(recipe: Recipe): any,
    empty?(): any
}

export default function RecipesList(props: Props) {
    const { recipes = [], empty, listItemExtra } = props;
    const theme = useTheme();
    const belowSm = useMediaQuery(theme.breakpoints.down('sm'));
    const { loading } = useContext(GlobalLoadingContext)

    if (recipes.length === 0 && empty && loading === false) {
        return empty();
    }

    return (
        <Box sx={{ position: "relative" }}>
            <Grid container spacing={{ xs: 2, sm: 2, md: 2, lg: 2, xl: 2 }}
            >
                {recipes.map((r, i) => {
                    return (
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={4} key={i} sx={belowSm ? {
                            maxWidth: "calc(100vw - 48px)"
                        } : {}}>
                            <RecipeListItem extra={listItemExtra} redditPostId={r.reddit_post_id} title={r.title || ""} url={r.url} imageUrl={r.image_url} mealDbId={r.mealdb_id} id={r.id} sourceType={r.source_type || ""} />
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
    )
}