import { useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import Layout from "components/Layout";

import { useMemo } from 'react';

const links = [
    {
        title: 'Back End Repository',
        href: 'https://github.com/williamang171/recipes-finder-backend'
    },
    {
        title: 'Front End Repository',
        href: 'https://github.com/williamang171/recipes-finder-frontend'
    },
    {
        title: 'API Documentation',
        href: 'https://rf-backend-v2-h62gfkc3pq-as.a.run.app/docs'
    },
    {
        title: "Food Recognition Model",
        href: 'https://huggingface.co/william7642/my_awesome_food_model',
    },
    {
        title: "Food Recognition Model Standalone Demo",
        href: "https://huggingface.co/spaces/william7642/food-model"
    }
]

export default function GitHubPage() {
    const theme = useTheme();
    const aStyle = useMemo(() => {
        return {
            textDecoration: 'none',
            color: theme.palette.primary.main
        }
    }, [theme.palette.primary.main])

    return (
        <Layout>
            {links.map((l) => {
                return <Typography variant="body1" gutterBottom>
                    <p>{l.title}: <a href={l.href} target="_blank" rel="noopener noreferrer" style={aStyle}>
                        {l.href}
                    </a></p>
                </Typography>
            })}

        </Layout>
    );
}