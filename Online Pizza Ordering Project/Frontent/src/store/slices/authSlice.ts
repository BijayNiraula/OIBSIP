import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { statuses } from "../../utilities/enums/statusEnum";
import { AuthStateInterface } from "../../utilities/interfaces/interface";
import { errorToast, infoToast } from "../../utilities/modules/toastMessage";
import { userRoles } from "../../utilities/enums/userRoleEnum";

export const authenticate = () => {
    return (async function authenticateAsyncThunk(dispatch: Dispatch) {
        try {
            dispatch(setStatus(statuses.LOADING))
            const url = `${import.meta.env.VITE_BACKEND_BASE_URL}/authenticate/google/loginDetails`;
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'content-type': 'application/json'
                }
            })
            const result = await response.json();
            console.log(result)
            if (result.status === "success") {
                dispatch(setStatus(statuses.IDLE))
                dispatch(login(result.data))
            } else {
                dispatch(setStatus(statuses.ERROR))
            }
        } catch (err) {
            errorToast("could not connect to the server")
            dispatch(setStatus(statuses.ERROR))
        }
    })
};

export const logoutFunction = () => {
    return (async function logoutAsyncThunk(dispatch: Dispatch) {
        try {
            dispatch(setStatus(statuses.LOADING))
            const url = `${import.meta.env.VITE_BACKEND_BASE_URL}/authenticate/google/logout`;
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'content-type': 'application/json'
                }
            })
            const result = await response.json();
            if (result.status === "success") {
                infoToast("logout successfully")
                dispatch(setStatus(statuses.IDLE))
                dispatch(logout())
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



const initialState: AuthStateInterface = {
    status: statuses.LOADING,
    authenticated: false,
    data: {
        userId: "",
        name: "",
        email: "",
        img: "",
        userRole: userRoles.NONE

    }
}



const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.authenticated = true;
            state.data = action.payload
        },
        logout: (state) => {
            state.authenticated = false;
            state.data = {
                userId: "",
                name: "",
                email: "",
                img: "",
                userRole: userRoles.NONE
            }

        },
        setStatus: (state, action) => {
            state.status = action.payload
        }

    }
})

export default authSlice.reducer;
export const { login, setStatus, logout } = authSlice.actions