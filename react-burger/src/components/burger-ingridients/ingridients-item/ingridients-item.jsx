import itemStyle from './ingridients-item.module.css';
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import IngridientDetails from '../ingridient-details/ingridient-details';
import { itemTypes } from '../../../utils/types';
import Modal from '../../modal/modal';
import { useDispatch, useSelector } from 'react-redux';
import { setIngridientModal } from '../../../services/actions/ingridient-details';

const IngridientsItem = ({ item }) => {
    const isIngridientDetailsModalOpen = useSelector(store => store.ingridientDetails.isModalOpen);
    const dispatch = useDispatch();

    const handleIngridientDetailsModal = () => {
        dispatch(setIngridientModal(item));
    }

    return (
        <li className={`${itemStyle.item} mb-8`} onClick={handleIngridientDetailsModal}>
            <img src={item.image} alt={item.name} />
            <div className={`${itemStyle.price} mt-2`}>
                <p className='text text_type_digits-default mr-2'>{item.price}</p>
                <CurrencyIcon type='primary' />
            </div>
            <p className={`${itemStyle.caption} text text_type_main-default mt-2`}>{item.name}</p>
            <Counter count={1} size="default" />
            {isIngridientDetailsModalOpen && <Modal>
                <IngridientDetails item={item} />
            </Modal>}
        </li>
    )
}

IngridientsItem.propTypes = {
    item: itemTypes
}


export default IngridientsItem;