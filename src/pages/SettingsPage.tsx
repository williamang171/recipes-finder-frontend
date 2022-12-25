import { useState } from "react";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";

import Layout from "components/Layout"
import { useSnackbar } from "notistack";

export default function SettingsPage() {
    const [primaryFindMethod, setPrimaryFindMethod] = useState((localStorage.getItem("primaryFindMethod") || "image-url"));
    const { enqueueSnackbar } = useSnackbar();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrimaryFindMethod((event.target.value));
        localStorage.setItem("primaryFindMethod", event.target.value)
        enqueueSnackbar("Setting(s) Updated", {
            autoHideDuration: 3000
        })
    };

    return (
        <Layout>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Primary method for finding recipes</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={primaryFindMethod}
                    onChange={handleChange}
                    name="radio-buttons-group"
                >
                    <FormControlLabel value={'image-url'} control={<Radio />} label="Image URL" />
                    <FormControlLabel value={'image-upload'} control={<Radio />} label="Image Upload" />
                    <FormControlLabel value={'image-samples'} control={<Radio />} label="Select from samples" />
                    <FormControlLabel value={'text'} control={<Radio />} label="Text" />
                </RadioGroup>
            </FormControl>
        </Layout>
    )
}