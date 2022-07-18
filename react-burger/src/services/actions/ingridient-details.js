export const SET_INGRIDIENT_MODAL = 'SET_INGRIDIENT_MODAL';
export const RESET_INGRIDIENT_MODAL = 'RESET_INGRIDIENT_MODAL';

export const setIngridientModal = (item) => ({type: SET_INGRIDIENT_MODAL, payload: item});
export const resetIngridientModal = () => ({type: RESET_INGRIDIENT_MODAL});