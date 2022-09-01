import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, Redirect } from 'react-router-dom';
import styles from '../common.module.css';
import { setFormValue } from "../../services/slices/auth";
import { resetPasswordAction } from "../../services/actions/auth";
import { getCookie } from "../../utils/cookie";

const ResetPasswordPage = () => {
    const dispatch = useDispatch();
    const { code, resetPassword } = useSelector(store => store.auth.form);
    const {isLoading, resetSuccess, forgetSuccess} = useSelector(store => store.auth);
    const cookie = getCookie('token');

    const onSubmit = e => {
        e.preventDefault();
        dispatch(resetPasswordAction(resetPassword, code));
    }
    const onChange = (e) => {
        dispatch(setFormValue({ field: e.target.name, value: e.target.value }));
    }

    if(!forgetSuccess) {
        return <Redirect to='/forgot-password'/>
    }

    return (cookie) ? (<Redirect to='/'/>) : (
        <section className={styles.container}>
            <h2 className='text text_type_main-medium mb-6'>Восстановление пароля</h2>
            <form className={styles.form} onSubmit={onSubmit}>
                <div className={`${styles.input} mb-6`}>
                    <PasswordInput value={resetPassword} onChange={onChange} name='resetPassword' placeholder={'Введите новый пароль'} />
                </div>
                <div className={`${styles.input} mb-6`}>
                    <Input value={code} onChange={onChange} name='code' placeholder='Введите код из письма' />
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