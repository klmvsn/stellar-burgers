import { FC } from 'react';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { TUseSelector } from '../../utils/types';
import OrderCard from './order-card/order-card';
import styles from './orders.module.css';

const Orders: FC = () => {
    const location = useLocation();
    const orders = TUseSelector(store => store.orders.orders);
    const match = useRouteMatch();

    return (
        <ul className={`${styles.list} custom-scroll`}>
            {orders && orders?.map((order) => {
                return (
                    <li key={order._id} className={`${styles.item} mb-4`}>
                        <Link to={{ pathname: `${match.path}/${order._id}`, state: { background: location } }} key={order._id} className={styles.link}>
                            <OrderCard order={order} key={order._id} />
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}

export default Orders;