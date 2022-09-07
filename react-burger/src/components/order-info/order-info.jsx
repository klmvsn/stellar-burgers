import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import { statusFormat } from "../../utils/statusFormat";
import OrderInfoIngridient from "./order-info-ingridient/order-info-ingridient";
import styles from './order-info.module.css';

const OrderInfo = () => {

    const { id } = useParams();
    const orders = useSelector(store => store.orders.orders);
    const order = orders?.find(order => order._id === id);
    const ingridients = useSelector(store => store.burgerIngridients.ingridients);

    const history = useHistory();
    const location = useLocation();


    useEffect(() => {
        if (history.action === "POP")
            history.replace({ pathname: location.pathname });
    }, [location.pathname, history]);

    const orderIngridients = useMemo(() => {
        return order?.ingredients.map(id => {
            return ingridients?.find((item) => {
                return item._id === id
            })
        })
    }, [order?.ingredients, ingridients])

    const orderTotal = useMemo(() => {
        return orderIngridients?.reduce((sum, item) => {
            if (item.type === 'bun') {
                return sum += item.price * 2;
            }
            return sum += item.price;
        }, 0)
    }, [orderIngridients])

    const ingridientsSet = Array.from(new Set(orderIngridients));

    const count = (item) => {
        return orderIngridients?.filter(ingridient => {
            return item === ingridient
        }).length
    }

    if (!order) {
        return null;
    }

    return (
        <section className={`${styles.container} pt-10 pb-10 pr-10 pl-10`}>
            <p className={`text text_type_digits-default pb-10 ${styles.number}`}>#{order.number}</p>
            <h2 className='text text_type_main-medium pb-3'>{order.name}</h2>
            <p className={`text text_type_main-default pb-15
                ${order.status === 'done' ? styles.statusDone : order.status === 'cancel' ? styles.statusCancel : ''}`}>
                {statusFormat(order.status)}
            </p>
            <h3 className='text text_type_main-medium pb-6'>Состав:</h3>
            <ul className={`${styles.list} custom-scroll `}>
                {ingridientsSet?.map(item => {
                    return (
                        <OrderInfoIngridient item={item} count={count(item)} key={item._id} />
                    )
                })}
            </ul>
            <div className={`${styles.sumContainer} pt-10`}>
                <p className='text text_type_main-default text_color_inactive'>{formatDate(order.createdAt)}</p>
                <div className={styles.sumContainer}>
                    <p className='text text_type_digits-default pr-4'>{orderTotal}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </section>
    )
}

export default OrderInfo;