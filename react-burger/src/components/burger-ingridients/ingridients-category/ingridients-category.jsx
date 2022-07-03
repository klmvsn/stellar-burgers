import IngridientsItem from '../ingridients-item/ingridients-item';
import categoryStyle from './ingridients-category.module.css';
import PropTypes from 'prop-types';

const IngridientsCategory = ({ category, ingridients }) => {
    const items = ingridients.filter(item => item.type === category.type);
    return (
        <li>
            <p className='text text_type_main-medium mt-10 mb-6'>{category.name}</p>
            <ul className={categoryStyle.list}>
                {items.map(item => (
                    <IngridientsItem key={item._id} item={item}/>
                ))}
            </ul>
        </li>
    )
}

IngridientsCategory.propTypes = {
    category: PropTypes.object.isRequired,
    ingridients: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default IngridientsCategory;