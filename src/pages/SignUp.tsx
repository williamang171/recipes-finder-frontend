import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import useAuth from 'hooks/useHttpAPI/useAuth';
import { Link as RouterLink, useNavigate } from "react-router-dom"
import Link from "@mui/material/Link";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import yupSchema from 'yup-schema-common';
import LoadingButton from '@mui/lab/LoadingButton';

type FormData = {
    email: string;
    password: string;
    name: string;
}

const schema = yup.object({
    name: yup.string().required().min(2).max(100).label("Name"),
    email: yupSchema.email,
    password: yupSchema.password
}).required();

export default function SignUp() {
    const { register, loading } = useAuth();
    const navigate = useNavigate();
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data: FormData) => {
        register({
            name: data.name,
            email: data.email,
            password: data.password
        }, () => {
            navigate("/auth/sign-in")
        })
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Controller
                                name="name"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField fullWidth label="Name" {...field} error={errors.name ? true : false} helperText={errors.name ? errors.name.message : null} />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField fullWidth label="Email Address" {...field} error={errors.email ? true : false} helperText={errors.email ? errors.email.message : null} />
                                )}
                            />

                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="password"
                                control={control}
                                defaultValue=""
                                render={({ field, fieldState }) => (<TextField type="password" fullWidth label="Password" {...field}
                                    error={errors.password ? true : false} helperText={errors.password ? errors.password.message : null}
                                />)}
                            />
                        </Grid>

                    </Grid>
                    <LoadingButton
                        type="submit"
                        loading={loading}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </LoadingButton>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            {loading ? null : <Link to="/auth/sign-in" component={RouterLink}>
                                Already have an account? Sign in
                            </Link>}
                        </Grid>
                    </Grid>
                </Box>
            </Box>

        </Container>
    );
}