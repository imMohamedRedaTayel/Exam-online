import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showSideBar: true , 
}

export const appSlice = createSlice({
    name: 'appSlice',
    initialState,
    reducers: {
        toggleSideBar: ( state , actions ) => {
            state.showSideBar = actions.payload
        }, 
    }
})

export const { toggleSideBar } = appSlice.actions
export const appReducer = appSlice.reducer