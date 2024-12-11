import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [] , 
    loading: false , 
    error: false , 
    examId : null
}

export const examSlice = createSlice({
    name: "examSlice" , 
    initialState , 
    reducers: {
        fetchData: ( state , actions ) => {
            state.loading = true 
            state.examId = actions.payload
        }, 
        setData: ( state , actions ) => {
            state.data = actions.payload
            state.loading = false
        }, 
        fetchDataFailed: ( state ) => {
            state.error = true
            state.loading = false
        }
    }
})

export const { fetchData , setData , fetchDataFailed } = examSlice.actions
export const examReducer = examSlice.reducer