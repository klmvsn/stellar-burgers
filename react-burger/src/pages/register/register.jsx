import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, Redirect } from 'react-router-dom';
import { useForm } from "../../hooks/useForm";
import { registerUserAction } from "../../services/actions/auth";
import { setFormValue } from "../../services/slices/auth";
import { getCookie } from "../../utils/cookie";
import styles from '../common.module.css';

const RegisterPage = () => {
    const dispatch = useDispatch();
    const {values, handleChange } = useForm({});
    const { email, password, name } = values;
    const {isLoading} = useSelector(store => store.auth);
    const cookie = getCookie('token');

    const onSubmit = e => {
        e.preventDefault();
        dispatch(registerUserAction(email, password, name));
    }

    return (cookie) ? (<Redirect to='/'/>) : (
        <section className={styles.container}>
            <h2 className='text text_type_main-medium mb-6'>Регистрация</h2>
            <form className={styles.form} onSubmit={onSubmit}>
                <div className={`${styles.input} mb-6`}>
                    <Input type='text' value={name || ''} onChange={handleChange} name='name' placeholder='Имя' />
                </div>
                <div className={`${styles.input} mb-6`}>
                    <Input type='email' value={email || ''} name='email' onChange={handleChange} placeholder='E-mail' />
                </div>
                <div className={`${styles.input} mb-6`}>
                    <PasswordInput value={password || ''} name='password' onChange={handleChange} />
                </div>
                {isLoading ? <Button type='primary' size='medium' disabled>Подождите</Button> :
                 <Button type='primary' size='medium'>Зарегестрироваться</Button>}
            </form>
            <p className='text text_type_main-default text_color_inactive mb-4 mt-20'>
                Уже зарегестрированы?
                <Link to='/login' className={styles.link}> Войти</Link>
            </p>
        </section>
    )
}

export default RegisterPage;