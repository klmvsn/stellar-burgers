import ingridientInfoStyles from  './ingridient-info.module.css';
import PropTypes from 'prop-types';

const IngridientInfo = ({info, children }) => {
    return (
    <li className={ingridientInfoStyles.info}>
        <p className='text mb-2'>{children}</p>
        <p className='text text_type_digits-default'>{info}</p>
    </li>)
}

IngridientInfo.propTypes = {
    info: PropTypes.number.isRequired,
    children: PropTypes.string.isRequired
}

export default IngridientInfo;