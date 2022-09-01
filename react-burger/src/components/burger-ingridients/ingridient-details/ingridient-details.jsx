import ingridientDetailsStyles from './ingridient-details.module.css';
import IngridientInfo from "./ingridient-info/ingridient-info";
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const IngridientDetails = () => {
    const { id } = useParams();
    const ingridients = useSelector(store => store.burgerIngridients.ingridients);
    const item = ingridients?.find(item => item._id === id);

    const history = useHistory();
    const location = useLocation();


    useEffect(() => {
        if (history.action === "POP")
            history.replace({ pathname: location.pathname });
    }, [location.pathname, history]);

    if (!item) {
        return null;
    }

    return (
        <>
            <h1 className={`text text_type_main-large pt-10 pr-10 pl-10 ${ingridientDetailsStyles.heading}`}>Детали ингридиента</h1>
            <div className={`${ingridientDetailsStyles.container} pt-10 pr-10 pb-15 pl-10`}>
                <img src={item.image_large} alt={item.name} className="mb-4" />
                <h2 className={`mt-4 mb-8 text text_type_main-medium ${ingridientDetailsStyles.ingridient}`}>{item.name}</h2>
                <ul className={`${ingridientDetailsStyles.info} text_type_main-default text_color_inactive`}>
                    <IngridientInfo info={item.calories}>Калории, ккал</IngridientInfo>
                    <IngridientInfo info={item.proteins}>Белки, г</IngridientInfo>
                    <IngridientInfo info={item.fat}>Жиры, г</IngridientInfo>
                    <IngridientInfo info={item.carbohydrates}>Углеводы, г</IngridientInfo>
                </ul>
            </div>
        </>

    );
}

export default IngridientDetails;