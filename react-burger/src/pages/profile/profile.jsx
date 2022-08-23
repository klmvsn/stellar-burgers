import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import styles from './profile.module.css';

const ProfilePage = () => {
    return (
        <section className={styles.container}>
            <nav className={`${styles.nav} pr-15`}>
                <ul className={styles.list}>
                    <li className='pt-6 pb-6'>
                        <NavLink to='/profile' className={`${styles.link} text text_type_main-medium text_color_inactive`}
                            activeClassName={`${styles.activeLink} text text_type_main-medium`}>Профиль</NavLink>
                    </li>
                    <li className='pt-6 pb-6'>
                        <NavLink to='/profile/orders' className={`${styles.link} text text_type_main-medium text_color_inactive`}
                            activeClassName={`${styles.activeLink} text text_type_main-medium`}>История заказов</NavLink>
                    </li>
                    <li className='pt-6 pb-6'>
                        <NavLink to='/login' className={`${styles.link} text text_type_main-medium text_color_inactive`}
                            activeClassName={`${styles.activeLink} text text_type_main-medium`}>Выход</NavLink>
                    </li>
                </ul>
                <p className='text text_type_main-default text_color_inactive pt-20'>
                    В&nbsp;этом разделе вы&nbsp;можете изменить свои персональные данные
                </p>
            </nav>
            <form className={styles.form}> 
                <div className={`${styles.input} mb-6`}>
                    <Input placeholder='Имя' icon='EditIcon'/>
                </div>
                <div className={`${styles.input} mb-6`}>
                    <Input placeholder='Логин' icon='EditIcon'/>
                </div>
                <div className={`${styles.input} mb-6`}>
                    <Input placeholder='Пароль' icon='EditIcon'/>
                </div>
            </form>
        </section>
    )
}

export default ProfilePage;