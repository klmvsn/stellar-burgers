import { useState, useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngridients from '../burger-ingridients/burger-ingridients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { getIngridients } from '../../utils/burger-api';
import { IngridientsContext } from '../../services/ingridientsContext';

const App = () => {
    const [ingridientsList, setList] = useState({
        ingridients: [],
        isLoading: false,
        hasError: false
    })

    useEffect(() => {
        const getData = async () => {
            setList((prevState) => ({
                ...prevState,
                isLoading: true
            }));
            try {
                const data = await getIngridients();
                setList((prevState) => ({
                    ...prevState,
                    ingridients: data.data,
                    isLoading: false
                }));
            }
            catch {
                setList((prevState) => ({
                    ...prevState,
                    isLoading: false,
                    hasError: true
                }));
            }
        };
        getData();
    }, [])

    return (
        <div className={`${styles.app} custom-scroll app-container`}>
            <IngridientsContext.Provider value={{ ingridientsList, setList }}>
                <AppHeader />
                <main className={styles.content}>
                    {ingridientsList.isLoading && 'Загрузка...'}
                    {ingridientsList.hasError && 'Произошла ошибка'}
                    {!ingridientsList.isLoading && !ingridientsList.hasError &&
                        ingridientsList.ingridients.length && (
                            <>
                                <BurgerIngridients />
                                <BurgerConstructor />
                            </>
                        )}
                </main>
            </IngridientsContext.Provider>
        </div>
    )
}

export default App;