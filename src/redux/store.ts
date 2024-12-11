import { appReducer } from "@/app/appSlice";
import { quizesReducer } from "@/app/dashboard/analysis/components/quizes/quizesSlice";
import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import rootSaga from "./saga";
import { examReducer } from "@/app/dashboard/exam/[id]/examSlice";
import { examsReducer } from "@/app/dashboard/exam/examsSlice";

// إنشاء sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// تعريف store مع sagaMiddleware
export const store = configureStore({
    reducer: {
        appSlice: appReducer,
        quizesSlice: quizesReducer,
        examSlice: examReducer , 
        examsSlice: examsReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware), // إضافة sagaMiddleware
});

// تشغيل sagaMiddleware
sagaMiddleware.run(rootSaga);

export default store;
