import { createSlice,Dispatch } from "@reduxjs/toolkit";
import { statuses } from "../../utilities/enums/statusEnum";
import { AddMenuItemFunctionParameterInterface,EditMenuItemFunctionParameterInterface, MenuItemsStateInterface } from "../../utilities/interfaces/interface";
import { errorToast } from "../../utilities/modules/toastMessage";

const url = `${import.meta.env.VITE_BACKEND_BASE_URL}/admin/menu`;

export const getMenuItemsFunction = () => {
    return (async function getMenuItemsAsyncThunk(dispatch: Dispatch) {
        try {
            dispatch(setStatus(statuses.LOADING))
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
            } else {
                errorToast(result.message)
                dispatch(setStatus(statuses.ERROR))
            }
        } catch (err) {
            errorToast("could not connect to the server")
            dispatch(setStatus(statuses.ERROR))
        }
    })
};


export const addMenuItemFunction= (bodyData:AddMenuItemFunctionParameterInterface) => {
    return (async function addMenuItemAsyncThunk(dispatch: Dispatch) {
        try {
            dispatch(setStatus(statuses.LOADING))
            const response = await fetch(url, {
                method: 'POST',
                body:JSON.stringify(bodyData),
                credentials: 'include',
                headers: {
                    'content-type': 'application/json'
                }
            })
            const result = await response.json();
            if (result.status === "success") {
                dispatch(setStatus(statuses.IDLE))
                dispatch(add([result.data]));
                return true;
            } else {
                errorToast(result.message)
                dispatch(setStatus(statuses.ERROR))
            }
        } catch (err) {
            errorToast("could not connect to the server")
            dispatch(setStatus(statuses.ERROR))
        }
    })
};


export const removeMenuItemFunction = (_id:string) => {
    return (async function removeMenuItemAsyncThunk(dispatch: Dispatch) {
        try {
            dispatch(setStatus(statuses.LOADING))
            const response = await fetch(url, {
                method: 'DELETE',
                body:JSON.stringify({_id}),
                credentials: 'include',
                headers: {
                    'content-type': 'application/json'
                }
            })
            const result = await response.json();
            if (result.status === "success") {
                dispatch(setStatus(statuses.IDLE))
                dispatch(remove(_id))
                return true;
            } else {
                errorToast(result.message)
                dispatch(setStatus(statuses.ERROR))
            }
        } catch (err) {
            errorToast("could not connect to the server")
            dispatch(setStatus(statuses.ERROR))
        }
    })
};



export const editMenuItemFunction = (bodyData:EditMenuItemFunctionParameterInterface) => {
    return (async function editMenuItemAsyncThunk(dispatch: Dispatch) {
        try {
            dispatch(setStatus(statuses.LOADING))
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
                dispatch(edit(bodyData))
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



const initialState:MenuItemsStateInterface  = {
    status: statuses.LOADING,
    menuItems:[]
}

const menuItemsSlice = createSlice({
    name: 'menuItems',
    initialState,
    reducers: {

        add:(state,action)=>{
            state.menuItems=[...state.menuItems,...action.payload]

        },
        remove:(state,action)=>{
            const filterdData=state.menuItems.filter(d=>d._id!=action.payload);
            state.menuItems=filterdData;

        },
        removeAll:(state)=>{
            state.menuItems=[];
          
        },
        edit:(state,action)=>{
           state.menuItems.forEach((currentElem,index)=>{
            if(currentElem._id===action.payload._id){
              state.menuItems[index]=action.payload;
              return;
            }
           })
        },
        setStatus: (state, action) => {
            state.status=statuses.LOADING
            state.status = action.payload;
        }
    }
})

export default menuItemsSlice.reducer;
export const { add,remove,edit, setStatus,removeAll  } = menuItemsSlice.actions