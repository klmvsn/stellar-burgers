import { useSelector } from 'react-redux';
import styles from './order-stats.module.css';

const OrderStats = () => {
    const {orders, total, totalToday} = useSelector(store => store.orders);

    const ordersDone = orders?.filter(order => order.status === 'done').slice(0,20);
    const ordersPending = orders?.filter(order => order.status === 'pending').slice(0,20);

    return (
        <section className={`${styles.board} ml-15`}>
            <div className={styles.orderStats}>
                <div className='mr-9'>
                    <p className='text text_type_main-medium pb-6'>Готовы:</p>
                    <ul className={styles.columns}>
                        {ordersDone?.map((order) =>{
                            return (
                                <li className={`text text_type_digits-default pb-2 ${styles.ordersDone}`} key={order._id}>{order.number}</li>
                            )
                        })}
                    </ul>
                </div>
                <div>
                    <p className='text text_type_main-medium pb-6'>В работе:</p>
                    <ul className={styles.columns}>
                        {ordersPending?.map((order) =>{
                            return (
                                <li className='text text_type_digits-default pb-2' key={order._id}>{order.number}</li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            <div>
                <p className='text text_type_main-medium pt-15'>Выполнено за все время:</p>
                <h2 className={`text text_type_digits-large ${styles.totalDigits}`}>{total}</h2>
            </div>
            <div>
                <p className='text text_type_main-medium pt-15'>Выполнено за сегодня:</p>
                <h2 className={`text text_type_digits-large ${styles.totalDigits}`}>{totalToday}</h2>
            </div>
        </section>
    )
}

export default OrderStats;