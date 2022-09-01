import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, Redirect } from 'react-router-dom';
import { signInAction } from "../../services/actions/auth";
import { setFormValue } from "../../services/slices/auth";
import { getCookie } from "../../utils/cookie";
import styles from '../common.module.css';

const LoginPage = () => {
    const dispatch = useDispatch();
    const cookie = getCookie('token');
    const {isLoading} = useSelector(store => store.auth);
    const {email, password} = useSelector(store => store.auth.form);

    const onChange = (e) => {
        dispatch(setFormValue({ field: e.target.name, value: e.target.value }));
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(signInAction(email,password));
    }

   return (cookie) ? (<Redirect to='/'/>) :(
        <section className={styles.container}>
            <h2 className='text text_type_main-medium mb-6'>Вход</h2>
            <form className={styles.form} onSubmit={onSubmit}>
                <div className={`${styles.input} mb-6`}>
                    <EmailInput value={email} name='email' onChange={onChange}/>
                </div>
                <div className={`${styles.input} mb-6`}>
                    <PasswordInput value={password} name='password' onChange={onChange}/>
                </div>
                {!isLoading ? <Button type='primary' size='medium'>
                    {cookie ? (<Redirect to='/'/>) : ''}
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