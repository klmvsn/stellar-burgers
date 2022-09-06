import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import OrderStats from '../../components/order-stats/order-stats';
import Orders from '../../components/orders/orders';
import { wsConnectionClose, wsConnectionOpen } from '../../services/actions/wsActions';
import styles from './feed.module.css'

const Feed = () => {
    const dispatch = useDispatch();
    const { wsConnected } = useSelector(store => store.orders);

    useEffect(() => {
        dispatch(wsConnectionOpen());
        return () => {
            dispatch(wsConnectionClose());
        }
    },[dispatch])

    return (
        <section className={styles.container}>
            <h2 className='text text_type_main-large pt-10 pb-5'>Лента заказов</h2>
            {!wsConnected && 'Загрузка...'}
            <div className={styles.feedContainer}>
                <Orders />
                <OrderStats />
            </div>
        </section>
    )
}

export default Feed;