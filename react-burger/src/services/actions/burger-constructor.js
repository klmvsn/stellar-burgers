export const ADD_BUNS = 'ADD_BUNS';
export const ADD_FILLING = 'ADD_FILLING';
export const REMOVE_FILLING = 'REMOVE_FILLING';
export const SWAP_FILLING = 'SWAP_FILLING';
export const RESET_CONSTRUCTOR = 'RESET_CONSTRUCTOR';

export const addFilling = (item, uniqueId) => ({ type: ADD_FILLING, payload: { ...item, uniqueId } });
export const addBun = (item, uniqueId) => ({ type: ADD_BUNS , payload: { ...item, uniqueId }});
export const removeFilling = (uniqueId) => ({type: REMOVE_FILLING, payload: uniqueId});
export const swapFilling = (dragIndex, hoverIndex, item) => ({type: SWAP_FILLING, payload: {dragIndex, hoverIndex, item}})