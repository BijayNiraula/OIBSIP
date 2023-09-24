import { createSlice } from "@reduxjs/toolkit";


const initialState = {
   modalState:false,
   data:{}
}

const controlEditMenuModalSlice = createSlice({
    name: 'controlEditMenuModal',
    initialState,
    reducers: {
        showModal: (state, action) => {
             state.modalState=true
             state.data=action.payload
        },
        hideModal: (state) => {
            state.modalState=false;
            state.data={}
        }
    }
})

export default controlEditMenuModalSlice.reducer;
export const { showModal, hideModal } = controlEditMenuModalSlice.actions