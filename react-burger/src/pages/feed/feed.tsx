import { FC, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import OrderInfo from '../../components/order-info/order-info';
import OrderStats from '../../components/order-stats/order-stats';
import Orders from '../../components/orders/orders';
import { wsConnectionClose, wsConnectionOpen } from '../../services/actions/wsActions';
import { TLocationState, TUseSelector, useAppDispatch } from '../../utils/types';
import styles from './feed.module.css'

const Feed: FC = () => {
    const dispatch = useAppDispatch();
    const { wsConnected } = TUseSelector(store => store.orders);

    const location = useLocation<TLocationState>();
    const background = location.state?.background;

    useEffect(() => {
        dispatch(wsConnectionOpen());
        return () => {
            dispatch(wsConnectionClose());
        }
    }, [dispatch])

    return (

        <Switch location={background || location}>
            <Route path='/feed/:id' exact>
                <OrderInfo />
            </Route>
            <Route path='/feed' exact>
                {!wsConnected && 'Загрузка...'}
                {wsConnected &&
                    <section className={styles.container}>
                        <h2 className='text text_type_main-large pt-10 pb-5'>Лента заказов</h2>
                        <div className={styles.feedContainer}>
                            <Orders />
                            <OrderStats />
                        </div>
                    </section>}
            </Route>
        </Switch >

    )
}

export default Feed;