import IngridientsItem from '../ingridients-item/ingridients-item';
import categoryStyle from './ingridients-category.module.css';
import { FC } from 'react';
import { TCategory, TUseSelector } from '../../../utils/types';

const IngridientsCategory: FC<TCategory> = ({ type, name }) => {
    const ingridientsList = TUseSelector(store => store.burgerIngridients.ingridients);
    const items = ingridientsList.filter(item => item.type === type);
    
    return (
        <li>
            <p className='text text_type_main-medium mt-10 mb-6'>{name}</p>
            <ul className={categoryStyle.list}>
                {items.map(item => (
                    <IngridientsItem item={item} key={item._id} />
                ))}
            </ul>
        </li>
    )
}

export default IngridientsCategory;