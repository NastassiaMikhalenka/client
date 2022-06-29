import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from "./login.module.scss";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import Stack from "@mui/material/Stack";
import {loginTC} from "../../store/auth/authReducer";

export const Login = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.login.status);
    const error = useSelector(state => state.login.error);

    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            email: 'test33@mail.ru',
            password: '12345678'
        },
        mode: 'onChange',
    });

    const onSubmit = async (values) => {
        dispatch(loginTC(values))
    };

    if (isAuth) {
        return <Navigate to="/"/>
    }

    return (
        <Stack className={styles.root}>
            <Typography classes={{root: styles.title}} variant="h5">
                Вход в аккаунт
            </Typography>
            {
                error && <Typography style={{paddingBottom: '40px'}}>
                    {error}
                </Typography>
            }
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    className={styles.field}
                    label="E-Mail"
                    type="email"
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    {...register('email', {required: 'Укажите почту'})}
                    fullWidth
                />
                <TextField className={styles.field} label="Пароль"
                           error={Boolean(errors.password?.message)}
                           helperText={errors.password?.message}
                           {...register('password', {required: 'Укажите пароль'})}
                           fullWidth/>
                <Button type="submit" size="large" variant="contained" fullWidth>
                    Войти
                </Button>
            </form>
        </Stack>
    );
};