import dragIngridient from './draggable-ingridients.module.css';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { itemTypes } from '../../../utils/types';
import PropTypes from 'prop-types';
import { removeFilling, swapFilling } from '../../../services/slices/burger-constructor';

const DraggableIngridients = ({ item, index }) => {
    const dispatch = useDispatch();
    const ref = useRef(null);

    const deleteIngridient = (uniqueId) => {
        dispatch(removeFilling(uniqueId))
    }

    const [, drop] = useDrop({
        accept: 'item',
        drop(dragObject) {
            if (dragObject.index === index) {
                return
            }
            dispatch(swapFilling({ fromIndex: dragObject.index, toIndex: index }))
        }
    })

    const [, drag] = useDrag({
        type: 'item',
        item: { ...item, index },
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    })

    drag(drop(ref));

    return (
        <li className={`${dragIngridient.item} mt-4 pr-5`} key={item.uniqueId} ref={ref} draggable>
            <DragIcon />
            <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose={() => deleteIngridient(item.uniqueId)}
            />
        </li >
    )
}

DraggableIngridients.propTypes = {
    item: itemTypes,
    index: PropTypes.number.isRequired
}

export default DraggableIngridients;