import { combineReducers } from "redux";
import { burgerIngridientsReducer } from "./reducers/burger-ingridients";
import { ingridientDetailsReducer } from "./reducers/ingridient-details";

export const rootReducer = combineReducers({
    burgerIngridients: burgerIngridientsReducer,
    ingridientDetails: ingridientDetailsReducer,
    
  });