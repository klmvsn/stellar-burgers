import itemStyle from './ingridients-item.module.css';
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { itemTypes } from '../../../utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { SET_MODAL } from '../../../services/actions/modal';
import { useDrag } from 'react-dnd';
import { useMemo } from 'react';

const IngridientsItem = ({ item }) => {
    const { bun, ingridients } = useSelector(store => store.burgerConstructor);
    const dispatch = useDispatch();

    const handleIngridientDetailsModal = () => {
        dispatch({ type: SET_MODAL, payload: item, content: 'ingridient' });
    }

    const counter = useMemo(
        () => (count = 0) => {
            count = (bun._id === item._id && bun) ? 2 : 
            ingridients.filter(ingridient => ingridient._id === item._id).length
            return count
        }, [bun, ingridients]
    )

    const [, dragRef] = useDrag({
        type: 'ingridient',
        item: { ...item },
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    })

    return (
        <li className={`${itemStyle.item} mb-8`} onClick={handleIngridientDetailsModal} ref={dragRef} draggable>
            <img src={item.image} alt={item.name} />
            <div className={`${itemStyle.price} mt-2`}>
                <p className='text text_type_digits-default mr-2'>{item.price}</p>
                <CurrencyIcon type='primary' />
            </div>
            <p className={`${itemStyle.caption} text text_type_main-default mt-2`}>{item.name}</p>
            {counter() > 0 && <Counter count={counter()} size="default" />}
        </li>
    )
}

IngridientsItem.propTypes = {
    item: itemTypes
}


export default IngridientsItem;