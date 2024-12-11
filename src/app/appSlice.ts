import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showSideBar: true , 
    token: null
}

export const appSlice = createSlice({
    name: 'appSlice',
    initialState,
    reducers: {
        toggleSideBar: ( state , actions ) => {
            state.showSideBar = actions.payload
        }, 
        setToken: (state, action) => {
            state.token = action.payload; 
        },

    }
})

export const { toggleSideBar , setToken } = appSlice.actions
export const appReducer = appSlice.reducer