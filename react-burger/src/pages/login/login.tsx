import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, FormEvent } from "react";
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useForm } from "../../hooks/useForm";
import { signInAction } from "../../services/actions/auth";
import { getCookie } from "../../utils/cookie";
import { TLocationState, TUseSelector, useAppDispatch } from "../../utils/types";
import styles from '../common.module.css';

const LoginPage: FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation<TLocationState>();
    const { values, handleChange, setValues } = useForm({});
    const cookie = getCookie('token');
    const { isLoading } = TUseSelector(store => store.auth);
    const { email, password } = values;

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setValues({});
        dispatch(signInAction(email, password));
    }

    return (cookie) ? (<Redirect to={location?.state?.from || '/'} />) : (
        <section className={styles.container}>
            <h2 className='text text_type_main-medium mb-6'>Вход</h2>
            <form className={styles.form} onSubmit={onSubmit}>
                <div className={`${styles.input} mb-6`}>
                    <EmailInput value={email || ''} name='email' onChange={handleChange} />
                </div>
                <div className={`${styles.input} mb-6`}>
                    <PasswordInput value={password || ''} name='password' onChange={handleChange} />
                </div>
                {!isLoading ? <Button type='primary' size='medium'>
                    {cookie ? (<Redirect to='/' />) : ''}
                    Войти
                </Button> : <Button type='primary' size='medium' disabled>Подождите</Button>}
            </form>
            <p className='text text_type_main-default text_color_inactive mb-4 mt-20'>
                Вы — новый пользователь?
                <Link to='/register' className={styles.link}> Зарегестрироваться</Link>
            </p>
            <p className='text text_type_main-default text_color_inactive'>
                Забыли пароль?
                <Link to='/forgot-password' className={styles.link}> Восстановить пароль</Link>
            </p>
        </section>
    )
}

export default LoginPage;