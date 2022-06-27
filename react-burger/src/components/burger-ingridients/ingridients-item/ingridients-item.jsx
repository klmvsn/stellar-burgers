import React from "react";
import itemStyle from './ingridients-item.module.css';
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

const IngridientsItem = (props) => {
    return (
        <li className={`${itemStyle.item} mb-8`}>
            <img src={props.item.image} alt={props.item.name} />
            <div className={`${itemStyle.price} mt-2`}>
                <p className='text text_type_digits-default mr-2'>{props.item.price}</p>
                <CurrencyIcon type='primary' />
            </div>
            <p className={`${itemStyle.caption} text text_type_main-default mt-2`}>{props.item.name}</p>
            <Counter count={1} size="default" />
        </li>
    )
}

IngridientsItem.propTypes = {
    item: PropTypes.object.isRequired
}

export default IngridientsItem;