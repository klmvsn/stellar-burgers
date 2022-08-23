import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import styles from '../common.module.css';

const LoginPage = () => {
    return (
        <section className={styles.container}>
            <h2 className='text text_type_main-medium mb-6'>Вход</h2>
            <form className={styles.form}>
                <div className={`${styles.input} mb-6`}>
                    <EmailInput value={''} name='email' onChange={''}/>
                </div>
                <div className={`${styles.input} mb-6`}>
                    <PasswordInput value={''} name='password' onChange={''}/>
                </div>
                <Button type='primary' size='medium'>Войти</Button>
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