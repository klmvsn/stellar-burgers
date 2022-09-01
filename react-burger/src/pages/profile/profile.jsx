import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { NavLink, Route, Switch } from "react-router-dom";
import { getUserAction, signOutAction, updateUserAction } from "../../services/actions/auth";
import OrderHistory from "./order-history/order-history";
import styles from './profile.module.css';

const ProfilePage = () => {
    const dispatch = useDispatch();

    const { email, name } = useSelector(store => store.auth.user);
    const { isLoading } = useSelector(store => store.auth);

    useEffect(() => {
        dispatch(getUserAction());
    }, [dispatch])

    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    })

    useEffect(() => {
        setData({
            name: name,
            email: email,
            password: ''
        })
    }, [email, name])

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleLogOut = () => {
        dispatch(signOutAction());
    }

    const handleReset = (e) => {
        e.preventDefault();
        setData({
            name: name,
            email: email,
            password: ''
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUserAction(data.name, data.email, data.password))
    }

    return (
        <section className={styles.container}>
            <nav className={`${styles.nav} pr-15`}>
                <ul className={styles.list}>
                    <li className='pt-6 pb-6'>
                        <NavLink to='/profile' exact className={`${styles.link} text text_type_main-medium text_color_inactive`}
                            activeClassName={`${styles.activeLink} text text_type_main-medium`}>Профиль</NavLink>
                    </li>
                    <li className='pt-6 pb-6'>
                        <NavLink to='/profile/orders' exact className={`${styles.link} text text_type_main-medium text_color_inactive`}
                            activeClassName={`${styles.activeLink} text text_type_main-medium`}>История заказов</NavLink>
                    </li>
                    <li className='pt-6 pb-6'>
                        <NavLink to='/login' exact className={`${styles.link} text text_type_main-medium text_color_inactive`}
                            activeClassName={`${styles.activeLink} text text_type_main-medium`} onClick={handleLogOut}>Выход</NavLink>
                    </li>
                </ul>
                <p className='text text_type_main-default text_color_inactive pt-20'>
                    В&nbsp;этом разделе вы&nbsp;можете изменить свои персональные данные
                </p>
            </nav>
            <Switch>
                <Route path='/profile/orders' exact>
                    <OrderHistory />
                </Route>
                <Route path='/profile' exact>
                    {isLoading && 'Загрузка...'}
                    {!isLoading && <form className={styles.form} onSubmit={onSubmit}>
                        <div className={`${styles.input} mb-6`}>
                            <Input type='text' placeholder='Имя' icon='EditIcon' value={data.name} name='name' onChange={onChange} />
                        </div>
                        <div className={`${styles.input} mb-6`}>
                            <Input placeholder='Логин' icon='EditIcon' value={data.email} name='email' onChange={onChange} />
                        </div>
                        <div className={`${styles.input} mb-6`}>
                            <Input placeholder='Пароль' icon='EditIcon' value={data.password} name='password' onChange={onChange} />
                        </div>
                        <div>
                            <Button type='secondary' size='medium' onClick={handleReset}>Отмена</Button>
                            {!isLoading ? <Button type='primary' size='medium'>Сохранить</Button> :
                                <Button type='primary' size='medium' disabled>Сохранение</Button>}
                        </div>
                    </form>}
                </Route>
            </Switch>
        </section>
    )
}

export default ProfilePage;