import React from "react";
import { Alert, AlertTitle, Collapse, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export default React.memo(function NewUserAlert() {
    const [open, setOpen] = React.useState(true);

    return <Collapse in={open}>
        <Alert
            severity="info"
            sx={{ mb: 1 }}
            action={
                <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        setOpen(false);
                    }}
                >
                    <CloseIcon fontSize="inherit" />
                </IconButton>
            }
        >
            <AlertTitle>Welcome to Recipes Finder</AlertTitle>
            <ul style={{ margin: '0.5em' }}>
                <li>
                    You can find recipes by providing image urls, uploading images, or providing text base queries.
                </li>
                <li>
                    You can also bookmark recipes after you have signed in to the application.
                </li>
            </ul>
        </Alert>
    </Collapse>

});