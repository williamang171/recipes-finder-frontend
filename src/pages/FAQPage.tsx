
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Layout from "components/Layout";

const faqs = [
    {
        question: 'What are the sources used for querying the recipes?',
        answer: 'The recipes come from https://www.themealdb.com/ and various reddit subreddits including r/recipes, r/easyrecipes, and r/TopSecretRecipes'
    },
]

export default function GitHubPage() {
    return (
        <Layout>
            {faqs.map((f, i) => {
                return (
                    <Accordion defaultExpanded>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${i + 1}-content`}
                            id={`panel${i + 1}-header`}
                        >
                            <Typography variant="h6">{f.question}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                {f.answer}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                )
            })}
        </Layout>
    );
}