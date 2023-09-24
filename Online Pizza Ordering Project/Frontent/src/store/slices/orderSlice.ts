import { createSlice,Dispatch } from "@reduxjs/toolkit";
import { statuses } from "../../utilities/enums/statusEnum";
import { OrderItemsStateInterface } from "../../utilities/interfaces/interface";
import { errorToast } from "../../utilities/modules/toastMessage";

const url = `${import.meta.env.VITE_BACKEND_BASE_URL}/admin/orders`;

export const getOrderItemsFunction = () => {
    return (async function editMenuItemAsyncThunk(dispatch: Dispatch) {
        try {
            const response = await fetch(url, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'content-type': 'application/json'
                }
            })
            const result = await response.json();
            if (result.status === "success") {
                dispatch(setStatus(statuses.IDLE))
                dispatch(add(result.data))
                return true;
            } else {
                errorToast(result.message)
                dispatch(setStatus(statuses.ERROR))
                return false
            }
        } catch (err) {
            errorToast("could not connect to the server")
            dispatch(setStatus(statuses.ERROR))
            return false;
        }
    })
};

interface UpdateOrderStatusFunctionParameter{
    userId:string,
    _id:string,
    orderStatus:string
}
export const updateOrderStatusFunction = (bodyData:UpdateOrderStatusFunctionParameter) => {
    return (async function updateOrderStatusAsyncThunk(dispatch: Dispatch) {
        try {
            const response = await fetch(url, {
                method: 'PUT',
                body:JSON.stringify(bodyData),
                credentials: 'include',
                headers: {
                    'content-type': 'application/json'
                }
            })
            const result = await response.json();
            if (result.status === "success") {
                dispatch(setStatus(statuses.IDLE))
                if(bodyData.orderStatus==="completed"){
                    dispatch(remove(bodyData._id))
                }else{
                    dispatch(update(bodyData));

                }
                return true;
            } else {
                errorToast(result.message)
                dispatch(setStatus(statuses.ERROR))
                return false
            }
        } catch (err) {
            errorToast("could not connect to the server")
            dispatch(setStatus(statuses.ERROR))
            return false;
        }
    })
};




const initialState:OrderItemsStateInterface  = {
    status: statuses.LOADING,
    orderItems:[]
}

const orderSlice = createSlice({
    name: 'orderItems',
    initialState,
    reducers: {
        add:(state,action)=>{
            state.orderItems=action.payload;

        },
        update:(state,action)=>{
           state.orderItems.forEach((currentElem,index)=>{
            if(currentElem._id===action.payload._id){
              state.orderItems[index].orderStatus=action.payload.orderStatus;
              return;
            }
           })
        },
        remove:(state,action)=>{
            const filteredData=state.orderItems.filter((orderItem)=>orderItem._id!=action.payload)
            state.orderItems=filteredData;
        },
        removeAll:(state)=>{
            state.orderItems=[];
            state.status=statuses.LOADING

        },
        setStatus: (state, action) => {
            state.status = action.payload
        }
    }
})

export default orderSlice.reducer;
export const { add,update,remove,removeAll, setStatus,  } = orderSlice.actions