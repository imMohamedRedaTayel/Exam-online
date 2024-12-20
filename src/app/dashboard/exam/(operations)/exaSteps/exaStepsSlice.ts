import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
    data: [],
    loading: false,
    error: false,
    showModel: false,
    selectedExamId: null,
    currentQuestionIndex: 0,
    selectedAnswers: {},
    showScore: false, 
    timeRemaining: 0,
    loadingScore: false, 
    correctAnswers: 0,
    incorrectAnswers: 0,
    score: 0,
    examsStatus: {},
    incorrectQuestions: [],

}

export const exaStepsSlice = createSlice({
    name: "exaStepsSlice",
    initialState,
    reducers: {
        fetchData: (state) => {
            state.loading = true
        },
        setData: (state, actions) => {
            state.data = actions.payload
            state.loading = false
        },
        fetchDataFailed: (state) => {
            state.error = true
            state.loading = false
        },
        toggleModel: (state, action) => {
            state.showModel = !state.showModel;
            // console.log( action.payload , 'action.payload' );
            if (state.showModel) {
                state.selectedExamId = action.payload;
            } else {
                state.selectedExamId = null;
            }
        },
        setCurrentQuestionIndex: (state, action: PayloadAction<number>) => {
            state.currentQuestionIndex = action.payload; 
        },
        setSelectedAnswers: (state, action: PayloadAction<{ [key: string]: string | null }>) => {
            state.selectedAnswers = action.payload; // تحديث selectedAnswers هنا
        },
        setSelectedAnswerForQuestion: (state:any, action: PayloadAction<{ questionId: string, answer: string | null }>) => {
            const { questionId, answer } = action.payload;
            // console.log(  action.payload , ' action.payload' );
            
            state.selectedAnswers[questionId] = answer; // تحديث الإجابة لسؤال معين
        },
        setShowScore: ( state , actions ) => {
            state.showScore = actions.payload
        }, 
        setTimeRemaining: (state, action: PayloadAction<number>) => {
            state.timeRemaining = action.payload; // تحديث timeRemaining هنا
        },
        setLoadingScore: ( state , action ) => {
            state.loadingScore = action.payload
        }, 
        calculateResults: (state:any, action) => {
            const { questions } = action.payload;
            let correctAnswers = 0;
            let incorrectAnswers = 0;
            const incorrectQuestions:any = [];
        
            questions.forEach((question:any) => {
                const selectedAnswer = state.selectedAnswers[question._id];
                if (selectedAnswer === question.correct) {
                    correctAnswers += 1;
                } else {
                    incorrectAnswers += 1;
                    incorrectQuestions.push({
                        ...question,
                        selected: selectedAnswer, // إضافة الإجابة المختارة
                    });
                }
            });
        
            state.correctAnswers = correctAnswers;
            state.incorrectAnswers = incorrectAnswers;
            state.incorrectQuestions = incorrectQuestions; // تخزين الأسئلة الخاطئة
            state.score = (correctAnswers / questions.length) * 100;
        },
        
          
    }
})

export const {
    fetchData,
    setData,
    fetchDataFailed,
    toggleModel,
    setCurrentQuestionIndex, 
    setSelectedAnswerForQuestion,
    setShowScore, 
    setTimeRemaining,
    setLoadingScore, 
    calculateResults
} = exaStepsSlice.actions;

export const exaStepsReducer = exaStepsSlice.reducer