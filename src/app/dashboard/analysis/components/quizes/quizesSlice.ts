import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
    data: [],
    loading: false,
    error: false,
    isLoadingMore: false, // حالة لتحميل المزيد أثناء التمرير
    page: 1,    // الصفحة الحالية
    limit: 3,   // عدد العناصر في كل طلب
    nextPage: null,
}

export const quizesSlice = createSlice({
    name: 'quizesSlice',
    initialState,
    reducers: {
        fetchData: (state) => {
            state.loading = true;
        },
        fetchDataFailed: (state) => {
            state.error = true;
        },
        
        fetchMoreData: (state) => {
            state.isLoadingMore = true; // التمرير فقط
        },

       setData: (state, action) => {
            const { subjects, metadata } = action.payload;
            state.data = [...state.data, ...subjects]; // إضافة العناصر الجديدة فقط
            state.loading = false;
            state.isLoadingMore = false; // إيقاف حالة التحميل الإضافي
            state.page += 1;
            state.nextPage = metadata.nextPage;
        },


    }
})

export const { fetchData , fetchDataFailed , setData , fetchMoreData } = quizesSlice.actions
export const quizesReducer = quizesSlice.reducer



