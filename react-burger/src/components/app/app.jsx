import { useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngridients from '../burger-ingridients/burger-ingridients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import IngridientDetails from '../burger-ingridients/ingridient-details/ingridient-details';
import { useDispatch, useSelector } from 'react-redux';
import { renderIngridients } from '../../services/actions/burger-ingridients';
import OrderDetails from '../burger-constructor/order-details/order-details';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from "react-dnd-html5-backend";
import { resetModal } from '../../services/slices/modal';
import { Switch, Route } from 'react-router-dom';
import LoginPage from '../../pages/login/login';
import RegisterPage from '../../pages/register/register';
import ForgotPasswordPage from '../../pages/forgot-password/forgot-password';
import ResetPasswordPage from '../../pages/reset-password/reset-password';
import ProfilePage from '../../pages/profile/profile';
import ProtectedRoute from '../protected-route/protected-route';
import { getUserAction, updateTokenAction } from '../../services/actions/auth';
import { getCookie } from '../../utils/cookie';
import NotFound from '../../pages/not-found/not-found';
import Feed from '../../pages/feed/feed';

const App = () => {
    const dispatch = useDispatch();
    const { ingridients, isLoading, hasError } = useSelector(store => store.burgerIngridients);
    const { isModalOpen, data, type } = useSelector(store => store.modal);
    const info = useSelector(store => store.orderDetails.info);

    const token = localStorage.getItem('refreshToken');
    const cookie = getCookie('token');

    useEffect(() => {
        dispatch(renderIngridients());
    }, [dispatch])

    useEffect(() => {
        if (cookie && token) {
            dispatch(getUserAction());
        }
    }, [dispatch, token, cookie]);

    const handleCloseIngridientModal = () => {
        dispatch(resetModal());
    }

    console.log(cookie, token);

    return (
        <div className={`${styles.app} custom-scroll app-container`}>
            <AppHeader />
            <Switch>
                <Route path='/login' exact>
                    <LoginPage />
                </Route>
                <Route path='/register' exact>
                    <RegisterPage />
                </Route>
                <Route path='/forgot-password' exact>
                    <ForgotPasswordPage />
                </Route>
                <Route path='/reset-password' exact>
                    <ResetPasswordPage />
                </Route>
                <ProtectedRoute path='/profile' exact>
                    <ProfilePage />
                </ProtectedRoute>
                <Route path='/feed' exact>
                    <Feed />
                </Route>
                <Route path='/' exact>
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
                </Route>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
            {isModalOpen && <Modal onClose={handleCloseIngridientModal}>
                {type === 'ingridient' ? <IngridientDetails item={data} /> : <OrderDetails orderData={info} />}
            </Modal>}
        </div>
    )
}

export default App;