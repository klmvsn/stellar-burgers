import { Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import styles from '../common.module.css';

const ForgotPasswordPage = () => {
    return (
        <section className={styles.container}>
            <h2 className='text text_type_main-medium mb-6'>Восстановление пароля</h2>
            <form className={styles.form}>
                <div className={`${styles.input} mb-6`}>
                    <Input value={''} onChange={''} placeholder='Укажите e-mail'/>
                </div>
                <Button type='primary' size='medium'>Восстановить</Button>
            </form>
            <p className='text text_type_main-default text_color_inactive mb-4 mt-20'>
                Вспомнили пароль?
                <Link to='/' className={styles.link}> Войти</Link>
            </p>
        </section>
    )
}

export default ForgotPasswordPage;