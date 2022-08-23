import { Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import styles from '../common.module.css';

const ResetPasswordPage = () => {
    return (
        <section className={styles.container}>
            <h2 className='text text_type_main-medium mb-6'>Восстановление пароля</h2>
            <form className={styles.form}>
                <div className={`${styles.input} mb-6`}>
                    <PasswordInput value={''} onChange={''} name='new-password' placeholder={'Введите новый пароль'}/>
                </div>
                <div className={`${styles.input} mb-6`}>
                    <Input value={''} onChange={''} placeholder='Введите код из письма' />
                </div>
                <Button type='primary' size='medium'>Сохранить</Button>
            </form>
            <p className='text text_type_main-default text_color_inactive mb-4 mt-20'>
                Вспомнили пароль?
                <Link to='/' className={styles.link}> Войти</Link>
            </p>
        </section>
    )
}

export default ResetPasswordPage;