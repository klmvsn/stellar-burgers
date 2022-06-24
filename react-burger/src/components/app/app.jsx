import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngridients from '../burger-ingridients/burger-ingridients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

const App = () => {
    return (
        <div className={`${styles.app} custom-scroll`}>
            <AppHeader />
            <main className={styles.content}>
                <BurgerIngridients />
                <BurgerConstructor />
            </main>
        </div>
    )
}

export default App;