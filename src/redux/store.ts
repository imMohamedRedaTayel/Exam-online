import { appReducer } from "@/app/appSlice";
import { quizesReducer } from "@/app/dashboard/analysis/components/quizes/quizesSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { examReducer } from "@/app/dashboard/exam/[id]/examSlice";
import { examsReducer } from "@/app/dashboard/exam/examsSlice";
import { exaStepsReducer } from "@/app/dashboard/exam/(operations)/exaSteps/exaStepsSlice";


 const reducer = combineReducers({

        appSlice: appReducer,
        quizesSlice: quizesReducer,
        examSlice: examReducer , 
        examsSlice: examsReducer , 
        exaStepsSlice: exaStepsReducer
})

export default reducer


