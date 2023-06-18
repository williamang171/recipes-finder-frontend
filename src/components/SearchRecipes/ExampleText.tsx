
import { Typography, Box } from '@mui/material'
import { styled } from '@mui/material/styles';

const examples = [
    'apple',
    'banana',
    'chocolate',
    'dumpling',
    'egg',
    'fish',
    'garlic',
    'honey',
    'italian sausage',
    'jelly',
    'kale',
    'mushrooms',
    'noodles',
    'oatmeal',
    'pineapple',
    'quinoa',
    'raspberry',
    'spinach',
    'tofu',
    'udon noodles',
    'vanilla',
    'watermelon',
    'xiaolongbao',
    'yam',
    'zucchini'
]

const StyledTypography = styled(Typography)(({ theme }) => ({
    cursor: "pointer",
    transition: "color 300ms ease",
    '&:hover': {
        color: theme.palette.primary.main,
    }
}))

interface Props {
    handleExampleTextOnClick: (s: string) => void;
}

export default function ExampleText(props: Props) {
    const { handleExampleTextOnClick } = props;
    return (
        <Box sx={{ position: 'relative', top: '-8px' }}>
            <span>
                <Typography variant='caption' >
                    {'e.g. '}
                </Typography>
            </span>
            {examples.map((e, i) => {
                return <span key={e}>
                    {i > 0 ? <Typography variant='caption' >
                        {', '}
                    </Typography> : null}
                    <StyledTypography variant='caption' key={e} onClick={() => {
                        handleExampleTextOnClick(e)
                    }} >
                        {e}
                    </StyledTypography>
                </span>
            })}
        </Box>
    )
}
