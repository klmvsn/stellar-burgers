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
            state.data = action.payload;
            state.type = action.content
        },
        resetModal: () => initialState,
    }
})

export const {setModal, resetModal} = modalSlice.actions;
export default modalSlice.reducer