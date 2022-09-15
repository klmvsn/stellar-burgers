import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import header from './app-header.module.css';
import { Link, NavLink, useLocation } from "react-router-dom";
import { TLocationState } from '../../utils/types';
import { FC } from 'react';

const AppHeader: FC = () => {
    const location = useLocation<TLocationState>();

    return (
        <header className={`${header.header} m-10`}>
            <nav className={`${header.nav} pt-4 pb-4`}>
                <ul className={header.list}>
                    <li className={header.item}>
                        <NavLink to='/' exact className={`${header.link} text text_type_main-default text_color_inactive`}
                            activeClassName={`${header.activeLink} text text_type_main-default`}>
                            <BurgerIcon type={location.pathname === '/' ? 'primary' : 'secondary'} />
                            <p className='text text_type_main-default pl-2'>Конструктор</p>
                        </NavLink>
                    </li>
                    <li className={header.item}>
                        <NavLink to='/feed' exact className={`${header.link} text text_type_main-default text_color_inactive`} activeClassName={`${header.activeLink} text text_type_main-default`}>
                            <ListIcon type={location.pathname === '/feed' ? 'primary' : 'secondary'} />
                            <p className='text text_type_main-default pl-2'>Лента заказов</p>
                        </NavLink>
                    </li>
                    <li className={header.item}>
                        <Link to='/'>
                            <Logo />
                        </Link>
                    </li>
                    <li className={`${header.item} ${header.item_right} pr-5`}>
                        <NavLink to='/profile' className={`${header.link} text text_type_main-default text_color_inactive`} activeClassName={`${header.activeLink} text text_type_main-default`} >
                            <ProfileIcon type={location.pathname === '/profile' || location.pathname === '/profile/orders' ? 'primary' : 'secondary'} />
                            <p className='text text_type_main-default pl-2'>Личный кабинет</p>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;