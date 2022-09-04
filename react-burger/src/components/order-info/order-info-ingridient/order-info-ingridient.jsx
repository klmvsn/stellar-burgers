import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import IngridientImage from "../../orders/order-card/ingridient-image/ingridient-image";
import styles from './order-info-ingridient.module.css';

const OrderInfoIngridient = ({ item, count }) => {
    return (
        <li className={`${styles.item} mr-6 mb-4`}>
            <div className={styles.container}>
                <IngridientImage image={item.image} alt={item.name} />
                <p className='text text_type_main-default pl-4'>{item.name}</p>
            </div>
            <div className={styles.container}>
                <p className='text text_type_digits-default pr-4'>{count} x {count * item.price}</p>
                <CurrencyIcon type="primary" />
            </div>
        </li>
    )
}

export default OrderInfoIngridient;