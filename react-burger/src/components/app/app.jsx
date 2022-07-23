import { useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngridients from '../burger-ingridients/burger-ingridients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import IngridientDetails from '../burger-ingridients/ingridient-details/ingridient-details';
import { useDispatch, useSelector } from 'react-redux';
import { getIngridients } from '../../services/actions/burger-ingridients';
import OrderDetails from '../burger-constructor/order-details/order-details';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from "react-dnd-html5-backend";
import { resetModal } from '../../services/actions/modal';

const App = () => {
    const dispatch = useDispatch();
    const { ingridients, isLoading, hasError } = useSelector(store => store.burgerIngridients);
    const { isModalOpen, data, type } = useSelector(store => store.modal);
    const info = useSelector(store => store.order.info);

    useEffect(() => {
        dispatch(getIngridients());
    }, [dispatch])

    const handleCloseIngridientModal = () => {
        dispatch(resetModal());
    }

    return (
        <div className={`${styles.app} custom-scroll app-container`}>
            <AppHeader />
            <main className={styles.content}>
                {isLoading && 'Загрузка...'}
                {hasError && 'Произошла ошибка'}
                {!isLoading && !hasError &&
                    ingridients.length && (
                        <DndProvider backend={HTML5Backend}>
                            <BurgerIngridients />
                            <BurgerConstructor />
                        </ DndProvider >
                    )}
            </main>
            {isModalOpen && <Modal onClose={handleCloseIngridientModal}>
                {type === 'ingridient' ? <IngridientDetails item={data} /> : <OrderDetails orderData={info} />}
            </Modal>}
        </div>
    )
}

export default App;