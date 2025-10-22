import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData: null              // abhi koi userdata nhi hai isiliye null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;    //Agar tu dispatch(authLogin(userData)) kare → reducer me state.userData = action.payload likh.Agar tu dispatch(authLogin({ userData })) kare → reducer me state.userData = action.payload.userData likh.  
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        }
     }
})

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;