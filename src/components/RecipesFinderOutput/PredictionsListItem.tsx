import { TableRow, TableCell, Button, IconButton } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

interface Props {
    name: string,
    value: number,
    setIngredient(name: string): any,
    setOpen(open: boolean): any
}

export default function PredictionsListItem(props: Props) {
    const { name, value = 0, setIngredient, setOpen } = props;
    const fixed = (value * 100).toFixed(2);
    const theme = useTheme();
    const overSm = useMediaQuery(theme.breakpoints.up('sm'));

    return <TableRow
        key={name}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
        <TableCell component="th" scope="row">
            {name}
        </TableCell>
        <TableCell align="right">{`${fixed}%`}</TableCell>
        <TableCell align="right" sx={{
            minWidth: overSm ? "200px" : "unset"
        }}>
            {overSm ? <Button variant="contained" onClick={() => {
                setIngredient(name);
                setOpen(true)
            }} >Find Recipes</Button> : <IconButton color="primary" onClick={() => {
                setIngredient(name);
                setOpen(true)
            }}   >
                <SearchIcon />
            </IconButton>}
        </TableCell>
    </TableRow>
}