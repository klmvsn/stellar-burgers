import ingridientInfoStyles from  './ingridient-info.module.css';

const IngridientInfo = ({info, children }) => {
    return (
    <li className={ingridientInfoStyles.info}>
        <p className='text mb-2'>{children}</p>
        <p className='text text_type_digits-default'>{info}</p>
    </li>)
}

export default IngridientInfo;