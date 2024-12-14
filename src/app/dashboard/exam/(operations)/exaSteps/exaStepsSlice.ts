import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [] , 
    loading: false , 
    error: false , 
    showModel: false , 
    selectedExamId: null, 

}

export const exaStepsSlice = createSlice({
    name: "exaStepsSlice" , 
    initialState , 
    reducers: {
        fetchData: ( state  ) => {
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
        toggleModel: (state, action) => {
            state.showModel = !state.showModel;
            if (state.showModel) {
                state.selectedExamId = action.payload; 
            } else {
                state.selectedExamId = null; 
            }
        },
    }
})

export const { fetchData , setData , fetchDataFailed , toggleModel } = exaStepsSlice.actions
export const exaStepsReducer = exaStepsSlice.reducer