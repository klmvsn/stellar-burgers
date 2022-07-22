import IngridientsItem from '../ingridients-item/ingridients-item';
import categoryStyle from './ingridients-category.module.css';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const IngridientsCategory = ({ category }) => {
    const ingridientsList = useSelector(store => store.burgerIngridients.ingridients);
    const items = ingridientsList.filter(item => item.type === category.type);
    
    return (
        <li>
            <p className='text text_type_main-medium mt-10 mb-6'>{category.name}</p>
            <ul className={categoryStyle.list}>
                {items.map(item => (
                    <IngridientsItem key={item._id} item={item} />
                ))}
            </ul>
        </li>
    )
}

IngridientsCategory.propTypes = {
    category: PropTypes.object.isRequired,
}

export default IngridientsCategory;