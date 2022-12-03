import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import { forgotPasswordAction } from "../../services/actions/auth";
import { getCookie } from "../../utils/cookie";
import { TUseSelector, useAppDispatch } from "../../utils/types";
import styles from '../common.module.css';

const ForgotPasswordPage: FC = () => {
    const { forgetSuccess, isLoading } = TUseSelector(store => store.auth);
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState('');
    const cookie = getCookie('token');

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(forgotPasswordAction(email));
    }
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    return (cookie) ? (<Redirect to='/' />) : (
        <section className={styles.container}>
            <h2 className='text text_type_main-medium mb-6'>Восстановление пароля</h2>
            <form className={styles.form} onSubmit={onSubmit}>
                <div className={`${styles.input} mb-6`}>
                    <Input value={email} onChange={onChange} placeholder='Укажите e-mail' />
                </div>
                {!isLoading ?
                    <Button type='primary' size='medium'>
                        {forgetSuccess ? (<Redirect to='/reset-password' />) : ''}
                        Восстановить
                    </Button> :
                    <Button type='primary' size='medium' disabled>Подождите</Button>
                }
            </form>
            <p className='text text_type_main-default text_color_inactive mb-4 mt-20'>
                Вспомнили пароль?
                <Link to='/login' className={styles.link}> Войти</Link>
            </p>
        </section>
    )
}

export default ForgotPasswordPage;