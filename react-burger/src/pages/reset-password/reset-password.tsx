import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from 'react-router-dom';
import styles from '../common.module.css';
import { resetPasswordAction } from "../../services/actions/auth";
import { getCookie } from "../../utils/cookie";
import { useForm } from "../../hooks/useForm";
import { TUseSelector, useAppDispatch } from "../../utils/types";
import { FormEvent } from "react";

const ResetPasswordPage = () => {
    const dispatch = useAppDispatch();
    const { values, handleChange } = useForm({});
    const { code, resetPassword } = values;
    const { isLoading, resetSuccess, forgetSuccess } = TUseSelector(store => store.auth);
    const cookie = getCookie('token');

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(resetPasswordAction(resetPassword, code));
    }

    if (!forgetSuccess) {
        return <Redirect to='/forgot-password' />
    }

    return (cookie) ? (<Redirect to='/' />) : (
        <section className={styles.container}>
            <h2 className='text text_type_main-medium mb-6'>Восстановление пароля</h2>
            <form className={styles.form} onSubmit={onSubmit}>
                <div className={`${styles.input} mb-6`}>
                    <PasswordInput value={resetPassword || ''} onChange={handleChange} name='resetPassword' />
                </div>
                <div className={`${styles.input} mb-6`}>
                    <Input value={code || ''} onChange={handleChange} name='code' placeholder='Введите код из письма' />
                </div>
                {!isLoading ? <Button type='primary' size='medium'>
                    {!!resetSuccess ? (<Redirect to='/profile' />) : ''}
                    Сохранить
                </Button> : <Button type='primary' size='medium' disabled>Сохранение</Button>}
            </form>
            <p className='text text_type_main-default text_color_inactive mb-4 mt-20'>
                Вспомнили пароль?
                <Link to='/' className={styles.link}> Войти</Link>
            </p>
        </section>
    )
}

export default ResetPasswordPage;