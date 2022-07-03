import Modal from "../../modal/modal";
import ingridientDetailsStyles from './ingridient-details.module.css';
import PropTypes from 'prop-types';

const IngridientDetails = ({ isOpen, handleClose, item }) => {
    return (
        <Modal isOpen={isOpen} setState={() => handleClose(false)}>
            <h1 className={`text text_type_main-large pt-10 pr-10 pl-10 ${ingridientDetailsStyles.heading}`}>Детали ингридиента</h1>
            <div className={`${ingridientDetailsStyles.container} pt-10 pr-10 pb-15 pl-10`}>
                <img src={item.image_large} alt={item.name} className="mb-4" />
                <h2 className={`mt-4 mb-8 text text_type_main-medium ${ingridientDetailsStyles.ingridient}`}>{item.name}</h2>
                <ul className={`${ingridientDetailsStyles.info} text_type_main-default text_color_inactive` }>
                    <li className={ingridientDetailsStyles.infoItems}>
                        <p className='text mb-2'>Калории, ккал</p>
                        <p className='text text_type_digits-default'>{item.calories}</p>
                    </li>
                    <li className={ingridientDetailsStyles.infoItems}>
                        <p className='text mb-2'>Белки, г</p>
                        <p className='text text_type_digits-default'>{item.proteins}</p>
                    </li>
                    <li className={ingridientDetailsStyles.infoItems}>
                        <p className='text mb-2'>Жиры, г</p>
                        <p className='text text_type_digits-default'>{item.fat}</p>
                    </li>
                    <li className={ingridientDetailsStyles.infoItems}>
                        <p className='text mb-2'>Углеводы</p>
                        <p className='text text_type_digits-default'>{item.carbohydrates}</p>
                    </li>
                </ul>
            </div>
        </Modal>
    );
}

IngridientDetails.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    item: PropTypes.shape({
        calories: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        proteins: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
        __v: PropTypes.number.isRequired,
        _id: PropTypes.string.isRequired
    }).isRequired
}

export default IngridientDetails;