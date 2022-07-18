import { useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngridients from '../burger-ingridients/burger-ingridients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useDispatch, useSelector } from 'react-redux';
import { getIngridients } from '../../services/actions/burger-ingridients';

const App = () => {
    const dispatch = useDispatch();
    const {ingridients, isLoading, hasError} = useSelector(store => store.burgerIngridients)

    useEffect(() => {
        dispatch(getIngridients());
    }, [dispatch])

    return (
        <div className={`${styles.app} custom-scroll app-container`}>
                <AppHeader />
                <main className={styles.content}>
                    {isLoading && 'Загрузка...'}
                    {hasError && 'Произошла ошибка'}
                    {!isLoading && !hasError &&
                        ingridients.length && (
                            <>
                                <BurgerIngridients />
                                <BurgerConstructor />
                            </>
                        )}
                </main>
        </div>
    )
}

export default App;