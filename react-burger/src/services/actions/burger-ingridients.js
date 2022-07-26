import { getIngridientsData } from "../../utils/api";
import { getRequest, requestFailed, requestSuccessed } from "../slices/burger-ingridients";

export const renderIngridients = () => (dispatch) => {
    dispatch(getRequest());
    getIngridientsData()
        .then(res => dispatch(requestSuccessed(res.data)))
        .catch(() => dispatch(requestFailed()));
}
