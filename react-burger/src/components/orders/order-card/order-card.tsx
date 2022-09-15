import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useEffect, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ITEM_DISPLAY, MAX_ITEMS } from '../../../utils/constants';
import { formatDate } from '../../../utils/formatDate';
import { statusFormat } from '../../../utils/statusFormat';
import { TOrder, TUseSelector } from '../../../utils/types';
import IngridientImage from './ingridient-image/ingridient-image';
import styles from './order-card.module.css'

type TOrderCard = {
    order: TOrder
}

const OrderCard: FC<TOrderCard> = ({ order }) => {
    const { number, createdAt, name, status } = order;
    const ingridients = TUseSelector(store => store.burgerIngridients.ingridients);

    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        if (history.action === "POP")
            history.replace({ pathname: location.pathname });
    }, [location.pathname, history]);

    const orderIngridients = useMemo(() => {
        return order.ingredients.map(id => {
            return ingridients.find((item) => {
                return item._id === id
            })
        })
    }, [order.ingredients, ingridients])

    const orderLength = orderIngridients.length;

    const orderTotal = useMemo(() => {
        return orderIngridients.reduce((sum, item) => {
            if (item?.type === 'bun') {
                return sum += item.price * 2;
            }
            return sum += item ? item.price : 0;
        }, 0)
    }, [orderIngridients])

    const displayedItems = orderLength > 6 ? orderIngridients.slice(0,6) : orderIngridients;

    return (
        <div className={`${styles.container} pt-6 pb-6 pl-6 pr-6 mr-2`}>
            <div className={`${styles.orderId} pb-6`}>
                <p className='text text_type_digits-default'>#{number}</p>
                <p className='text text_type_main-default text_color_inactive'>{formatDate(createdAt)}</p>
            </div>
            <div className='pb-6'>
                <h2 className='text text_type_main-medium pb-2`'>{name}</h2>
                <p className={`text  text_type_main-default 
                ${status === 'done' ? styles.statusDone : status === 'cancel' ? styles.statusCancel : ''}`}>
                    {statusFormat(status)}
                </p>
            </div>
            <div className={styles.price}>
                <ul className={styles.list}>
                    {orderIngridients && displayedItems.map((item, index) => {
                        return (
                            <li className={styles.item} key={index} style={{ left: index * ITEM_DISPLAY, zIndex: MAX_ITEMS - index }}>
                                <IngridientImage image={item?.image} alt={item?.name} key={index} />
                            </li>
                        )
                    })}
                    
                </ul>
                {orderIngridients && orderLength > MAX_ITEMS && 
                   (<p className={`text text_type_main-default ${styles.cover}`} style={{left: (MAX_ITEMS - 1) * ITEM_DISPLAY}}>{`+${orderLength - MAX_ITEMS}`}</p>)
                }
                <div className={styles.priceContainer}>
                    <p className={`${styles.sum} text text_type_digits-default pr-2`}>{orderTotal}</p>
                    <CurrencyIcon type='primary' />
                </div>
            </div>
        </div>
    )
}

export default OrderCard;