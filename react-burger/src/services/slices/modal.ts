import { createSlice } from "@reduxjs/toolkit";
import { TModal } from "../../utils/types";

const initialState: TModal = {
    isModalOpen: false,
    data: null,
    type: ''
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setModal: (state, action) => {
            state.isModalOpen = true;
            state.data = action.payload.item;
            state.type = action.payload.content;
        },
        resetModal: state => {
            state.isModalOpen = false;
            state.data = null;
            state.type = ''
        },
    }
})

export const { setModal, resetModal } = modalSlice.actions;
export default modalSlice.reducer