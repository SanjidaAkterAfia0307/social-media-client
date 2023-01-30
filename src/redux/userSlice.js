import {createSlice } from "@reduxjs/toolkit"

const initialState={
    user:null,
    loading:false,
    error:null
}

export const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        loginStart:(state)=>{
            state.loading=true;
        },
        loginSuccess:(state,action)=>{
            state.loading=false;
            console.log(action.payload)
            state.user=action.payload
        },
        loginFailed:(state,action)=>{
            state.loading=false;
            state.error=action.payload
        },
        logOut:(state)=>{
            state.user=null;
            state.loading=false;
            state.error=null
        },
        
    }
})

export const {loginStart, loginSuccess, loginFailed, logOut,subscription}=userSlice.actions;
export default userSlice.reducer