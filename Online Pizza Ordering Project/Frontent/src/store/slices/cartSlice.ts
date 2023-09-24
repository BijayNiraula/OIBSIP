import { createSlice } from "@reduxjs/toolkit";
import { CartStateInterface } from "../../utilities/interfaces/interface";
import { writeLocalStorage, readLocalStorage } from "../../utilities/modules/localStorage";
import { infoToast, successToast } from "../../utilities/modules/toastMessage";


const initialState: CartStateInterface = {
    cartItems: readLocalStorage("cartsItems")
}


const cartSlice = createSlice({
    name: "carts",
    initialState,
    reducers: {
        
        add: (state, action) => {
            successToast("Items added to carts")
            var done = false;
            if (state.cartItems.length === 0) {
                writeLocalStorage("cartsItems", [action.payload])
                state.cartItems=[...state.cartItems,action.payload]
                return;
            }
            state.cartItems.forEach((currentElem, index) => {
                if (!done) {
                    console.log(action.payload)
                    if (currentElem._id === action.payload._id) {
                        state.cartItems[index].pizzaQuantity = currentElem.pizzaQuantity + 1;
                        writeLocalStorage("cartsItems", state.cartItems);
                        done = true;
                    } else {
                        if (index == state.cartItems.length - 1) {
                            state.cartItems=[...state.cartItems,action.payload]
                            writeLocalStorage("cartsItems", state.cartItems);
                        }
                    }
                }
            })

        },

        remove: (state, action) => {
            const filteredData = state.cartItems.filter((d) => d._id != action.payload)
            state.cartItems = filteredData;
            writeLocalStorage("cartsItems", filteredData)
            infoToast("Item deleted from carts")
        },

        edit: (state, action) => {
            state.cartItems.forEach((currElem, index) => {
                if (action.payload._id === currElem._id) {
                    state.cartItems[index].pizzaQuantity = action.payload.quantity;
                }
            })
            writeLocalStorage("cartsItems",state.cartItems)
        
        },
        
        removeAll:(state)=>{
               state.cartItems=[];
               writeLocalStorage("catsItems",[])
        }
    }})
        


export default cartSlice.reducer;
export const { add, remove, edit , removeAll } = cartSlice.actions