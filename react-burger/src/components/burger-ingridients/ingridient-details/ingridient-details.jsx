import ingridientDetailsStyles from './ingridient-details.module.css';
import { itemTypes } from "../../../utils/types";
import IngridientInfo from "./ingridient-info/ingridient-info";

const IngridientDetails = ({ item }) => {
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

IngridientDetails.propTypes = {
    item: itemTypes
}

export default IngridientDetails;