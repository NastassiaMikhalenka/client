import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Stack from "@mui/material/Stack";

import styles from './registration.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {Navigate} from "react-router-dom";
import {registerTC} from "../../store/auth/authReducer";

export const Registration = () => {
    const dispatch = useDispatch();
    const isRegister = useSelector(state => state.login.statusRegister);
    const error = useSelector(state => state.login.error);

    const {register, handleSubmit, formState: {errors, isValid}} = useForm({
        defaultValues: {
            fullName: 'Lera',
            email: 'lera@mail.ru',
            password: '12345678'
        },
        mode: 'onChange',
    });

    const onSubmit = async (values) => {
        dispatch(registerTC(values))
    };

    if (isRegister) {
        return <Navigate to="/login"/>
    }

    return (
        <Stack className={styles.root}>
            <Typography classes={{root: styles.title}} variant="h5">
                Создание аккаунта
            </Typography>
            {
                error && <Typography style={{paddingBottom: '40px'}}>
                    {error}
                </Typography>
            }
            <div className={styles.avatar}>
                <Avatar sx={{width: 100, height: 100}}/>
            </div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                type="text"
                error={Boolean(errors.fullName?.message)}
                helperText={errors.fullName?.message}
                {...register('fullName', {required: 'Укажите имя'})}
                className={styles.field} label="Полное имя" fullWidth/>
            <TextField
                type="email"
                error={Boolean(errors.email?.message)}
                helperText={errors.email?.message}
                {...register('email', {required: 'Укажите почту'})}
                className={styles.field} label="E-Mail" fullWidth/>
            <TextField
                type="password"
                error={Boolean(errors.password?.message)}
                helperText={errors.password?.message}
                {...register('password', {required: 'Укажите пароль'})}
                className={styles.field} label="Пароль" fullWidth/>
            <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
                Зарегистрироваться
            </Button>
        </form>
        </Stack>
    );
};