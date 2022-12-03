import { getIngridientsData } from "../../utils/api";
import { AppDispatch } from "../../utils/types";
import { getRequest, requestFailed, requestSuccessed } from "../slices/burger-ingridients";

export const renderIngridients = () => (dispatch: AppDispatch) => {
    dispatch(getRequest());
    getIngridientsData()
        .then(res => dispatch(requestSuccessed(res.data)))
        .catch(() => dispatch(requestFailed()));
}
