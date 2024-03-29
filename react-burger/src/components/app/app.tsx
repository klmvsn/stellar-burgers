import { FC, useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngridients from '../burger-ingridients/burger-ingridients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import IngridientDetails from '../burger-ingridients/ingridient-details/ingridient-details';
import { renderIngridients } from '../../services/actions/burger-ingridients';
import OrderDetails from '../burger-constructor/order-details/order-details';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from "react-dnd-html5-backend";
import { resetModal } from '../../services/slices/modal';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import LoginPage from '../../pages/login/login';
import RegisterPage from '../../pages/register/register';
import ForgotPasswordPage from '../../pages/forgot-password/forgot-password';
import ResetPasswordPage from '../../pages/reset-password/reset-password';
import ProfilePage from '../../pages/profile/profile';
import ProtectedRoute from '../protected-route/protected-route';
import { getUserAction, updateTokenAction } from '../../services/actions/auth';
import NotFound from '../../pages/not-found/not-found';
import Feed from '../../pages/feed/feed';
import OrderInfo from '../order-info/order-info';
import { getCookie } from '../../utils/cookie';
import { TLocationState, TUseSelector, useAppDispatch } from '../../utils/types';

declare module 'react' {
    interface FunctionComponent<P = {}> {
        (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
    }
}

const App: FC = () => {
    const dispatch = useAppDispatch();
    const { ingridients, isLoading, hasError } = TUseSelector(store => store.burgerIngridients);
    const { isModalOpen, type } = TUseSelector(store => store.modal);
    const info = TUseSelector(store => store.orderDetails.info);

    const token = localStorage.getItem('refreshToken');
    const cookie = getCookie('token');

    const location = useLocation<TLocationState>();
    const background = location.state?.background;
    const history = useHistory();

    useEffect(() => {
        dispatch(renderIngridients());
    }, [dispatch])

    useEffect(() => {
        if (!cookie && token)
            dispatch(updateTokenAction())
        if (cookie && token)
            dispatch(getUserAction());
    }, [dispatch, token, cookie]);

    const handleCloseModal = () => {
        dispatch(resetModal());
        history.goBack();
    }

    return (
        <div className={`${styles.app} custom-scroll app-container`}>
            <AppHeader />
            <Switch location={background || location}>
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
                <ProtectedRoute path='/profile'>
                    <ProfilePage />
                </ProtectedRoute>
                <Route path='/ingredients/:id' exact>
                    <IngridientDetails />
                </Route>
                <Route path='/feed'>
                    <Feed />
                </Route>
                <Route path='/feed/:id' exact>
                    <OrderInfo />
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
            {background &&
                <Route path="/ingredients/:id">
                    <Modal onClose={handleCloseModal}>
                        <IngridientDetails />
                    </Modal>
                </Route>
            }
            {background &&
                <Route path='/feed/:id' exact>
                    <Modal onClose={handleCloseModal}>
                        <OrderInfo />
                    </Modal>
                </Route>
            }
            {background &&
                <ProtectedRoute path='/profile/orders/:id' exact>
                    <Modal onClose={handleCloseModal}>
                        <OrderInfo />
                    </Modal>
                </ProtectedRoute>
            }
            {isModalOpen && (type !== 'ingridient') &&
                <Modal onClose={handleCloseModal}>
                    <OrderDetails info={info} />
                </Modal>
            }
        </div>
    )
}

export default App;