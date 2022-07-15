import Modal from "../../modal/modal";
import orderDetailsStyles from './order-details.module.css';
import orderAcceptedIcon from '../../../images/order-accepted.svg';
import PropTypes from 'prop-types';;

const OrderDetails = ({ isOpen, handleClose, orderData }) => {
    return (
        <Modal isOpen={isOpen} setState={() => handleClose(false)}>
            <div className={`${orderDetailsStyles.container} pt-30 pb-30`}>
                <p className='text text_type_digits-large mb-8'>{orderData.order.number}</p>
                <p className='text text_type_main-medium mb-15'>идентификатор заказа</p>
                <img src={orderAcceptedIcon} alt='Закза принят' className={`${orderDetailsStyles.image} mb-15`}/>
                <p className='text text_type_main-default mb-2'>Ваш заказ начали готовить</p>
                <p className='text text_type_main-default text_color_inactive'>Дождитесь
                    готовности на орбитальной станции</p>
            </div>
        </Modal>
    )
}

OrderDetails.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    orderData: PropTypes.shape({
        name: PropTypes.string.isRequired,
        order: PropTypes.object.isRequired,
        success: PropTypes.bool.isRequired
    }).isRequired
}

export default OrderDetails;