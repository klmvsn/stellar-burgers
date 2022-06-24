import React from "react";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import header from './app-header.module.css';

const AppHeader = () => {
    return (
        <header className={`${header.header} m-10`}>
            <nav className={`${header.nav} pt-4 pb-4`}>
                <ul className={header.list}>
                    <li className={header.item}>
                        <a className={header.link} href='#constructor'>
                            <BurgerIcon type='primary' />
                            <p className='text text_type_main-default pl-2'>Конструктор</p>
                        </a>
                    </li>
                    <li className={header.item}>
                        <a className={header.link} href='#order_feed'>
                            <ListIcon type='secondary' />
                            <p className='text text_type_main-default text_color_inactive pl-2'>Лента заказов</p>
                        </a>
                    </li>
                    <li className={header.item}>
                        <Logo className={header.logo}/>
                    </li>
                    <li className={`${header.item} ${header.item_right} pr-5`}>
                        <a className={header.link} href='#account'>
                            <ProfileIcon type='secondary' />
                            <p className='text text_type_main-default text_color_inactive pl-2'>Личный кабинет</p>
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;