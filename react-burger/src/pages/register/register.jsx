import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import styles from '../common.module.css';

const RegisterPage = () => {
    return (
        <section className={styles.container}>
            <h2 className='text text_type_main-medium mb-6'>Регистрация</h2>
            <form className={styles.form}>
                <div className={`${styles.input} mb-6`}>
                    <Input value={''} onChange={''} placeholder='Имя'/>
                </div>
                <div className={`${styles.input} mb-6`}>
                    <EmailInput value={''} name='email' onChange={''} />
                </div>
                <div className={`${styles.input} mb-6`}>
                    <PasswordInput value={''} name='password' onChange={''} />
                </div>
                <Button type='primary' size='medium'>Зарегестрироваться</Button>
            </form>
            <p className='text text_type_main-default text_color_inactive mb-4 mt-20'>
                Уже зарегестрированы?
                <Link to='/login' className={styles.link}> Войти</Link>
            </p>
        </section>
    )
}

export default RegisterPage;