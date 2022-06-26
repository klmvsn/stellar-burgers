import React from "react";
import data from "../../../utils/data";
import IngridientsItem from '../ingridients-item/ingridients-item';
import categoryStyle from './ingridients-category.module.css';
import PropTypes from 'prop-types';

const IngridientsCategory = (props) => {
    const items = data.filter(item => item.type === props.category.type);
    return (
        <li>
            <p className='text text_type_main-medium mt-10 mb-6'>{props.category.name}</p>
            <ul className={categoryStyle.list}>
                {items.map(item => (
                    <IngridientsItem key={item._id} item={item}/>
                ))}
            </ul>
        </li>
    )
}

IngridientsCategory.propTypes = {
    category: PropTypes.object.isRequired
}

export default IngridientsCategory;