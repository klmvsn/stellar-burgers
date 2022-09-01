import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isModalOpen: false,
        data: null,
        type: ''
    },
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

export const {setModal, resetModal} = modalSlice.actions;
export default modalSlice.reducer