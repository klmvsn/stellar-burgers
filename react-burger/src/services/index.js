import { combineReducers } from "redux";
import { burgerIngridientsReducer } from "./reducers/burger-ingridients";
import { modalReducer } from "./reducers/modal";
import { orderReducer } from "./reducers/order-details";

export const rootReducer = combineReducers({
    burgerIngridients: burgerIngridientsReducer,
    modal: modalReducer,
    order: orderReducer
  });