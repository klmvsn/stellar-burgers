import { nanoid } from 'nanoid';
import { useSelector } from 'react-redux';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import OrderCard from './order-card/order-card';
import styles from './orders.module.css';

const Orders = () => {
    const location = useLocation();
    const orders = useSelector(store => store.orders?.orders);
    const match = useRouteMatch();

    return (
        <ul className={`${styles.list} custom-scroll`}>
            {orders && orders.map((order) => {
                return (
                    <li key={nanoid()} className={`${styles.item} mb-4`}>
                        <Link to={{ pathname: `${match.path}/${order._id}`, state: { background: location } }} key={nanoid()} className={styles.link}>
                            <OrderCard order={order} key={order._id} />
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}

export default Orders;