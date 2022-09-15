import itemStyle from './ingridients-item.module.css';
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import { FC, useMemo } from 'react';
import { setModal } from '../../../services/slices/modal';
import { Link, useLocation } from 'react-router-dom';
import { TIngridient, TUseSelector } from '../../../utils/types';

type TIngridientItem = {
    item: TIngridient
}

const IngridientsItem: FC<TIngridientItem> = ({ item }) => {
    const { bun, ingridients } = TUseSelector(store => store.burgerConstructor);
    const dispatch = useDispatch();
    const location = useLocation();

    const handleIngridientDetailsModal = () => {
        dispatch(setModal({ item, content: 'ingridient' }));
    }

    const counter = useMemo(
        () => (count = 0) => {
            count = (bun._id === item._id && bun) ? 2 :
                ingridients.filter(ingridient => ingridient._id === item._id).length
            return count
        }, [bun, ingridients, item._id]
    )

    const [, dragRef] = useDrag({
        type: 'ingridient',
        item: { ...item },
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    })

    return (
        <Link to={{ pathname: `/ingredients/${item._id}`, state: { background: location } }} className={itemStyle.link}>
            <li className={`${itemStyle.item} mb-8`} onClick={handleIngridientDetailsModal} ref={dragRef} draggable>
                <img src={item.image} alt={item.name} />
                <div className={`${itemStyle.price} mt-2`}>
                    <p className='text text_type_digits-default mr-2'>{item.price}</p>
                    <CurrencyIcon type='primary' />
                </div>
                <p className={`${itemStyle.caption} text text_type_main-default mt-2`}>{item.name}</p>
                {counter() > 0 && <Counter count={counter()} size="default" />}
            </li>
        </Link>
    )
}

export default IngridientsItem;