import itemStyle from './ingridients-item.module.css';
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { itemTypes } from '../../../utils/types';
import { useDispatch } from 'react-redux';
import { SET_MODAL } from '../../../services/actions/modal';

const IngridientsItem = ({ item }) => {
    const dispatch = useDispatch();

    const handleIngridientDetailsModal = () => {
        dispatch({type: SET_MODAL, payload: item, content: 'ingridient'});
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
        </li>
    )
}

IngridientsItem.propTypes = {
    item: itemTypes
}


export default IngridientsItem;