import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showSideBar: true , 
    selectedLink: ''
}

export const appSlice = createSlice({
    name: 'appSlice',
    initialState,
    reducers: {
        toggleSideBar: ( state , actions ) => {
            state.showSideBar = actions.payload
        }, 
        setSelectedLink: ( state , actions  ) => {
            state.selectedLink = actions.payload
        }
    }
})

export const { toggleSideBar , setSelectedLink } = appSlice.actions
export const appReducer = appSlice.reducer