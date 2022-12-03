import orderDetailsStyles from './order-details.module.css';
import orderAcceptedIcon from '../../../images/order-accepted.svg';
import { FC } from 'react';
import { TOrderDetails } from '../../../utils/types';

const OrderDetails: FC<TOrderDetails> = ({ info }) => {
    return (
        <div className={`${orderDetailsStyles.container} pt-30 pb-30`}>
            <p className='text text_type_digits-large mb-8'>{info.order.number}</p>
            <p className='text text_type_main-medium mb-15'>идентификатор заказа</p>
            <img src={orderAcceptedIcon} alt='Закза принят' className={`${orderDetailsStyles.image} mb-15`} />
            <p className='text text_type_main-default mb-2'>Ваш заказ начали готовить</p>
            <p className='text text_type_main-default text_color_inactive'>Дождитесь
                готовности на орбитальной станции</p>
        </div>
    )
}

export default OrderDetails;