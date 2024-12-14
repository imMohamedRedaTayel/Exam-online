import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [] , 
    loading: false , 
    error: false , 
}

export const examsSlice = createSlice({
    name: "examsSlice" , 
    initialState , 
    reducers: {
        fetchData: ( state ) => {
            state.loading = true 
        }, 
        setData: ( state , actions ) => {
            state.data = actions.payload
            state.loading = false
        }, 
        fetchDataFailed: ( state ) => {
            state.error = true
            state.loading = false
        }, 

    }
})

export const { fetchData , setData , fetchDataFailed  } = examsSlice.actions
export const examsReducer = examsSlice.reducer