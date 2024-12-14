export interface FormValues {
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    rePassword?: string;
    newPassword?: string
    phone?: string;
    resetCode?: any
}

export interface appSlice {
    showSideBar: boolean;
    selectedLink: string
}

export interface quizesSlice { 
    data: any,
    loading: boolean,
    error: boolean,
    nextPage: any, 
    isLoadingMore: boolean
}

export interface Store {
    appSlice: appSlice
    quizesSlice: quizesSlice
    examSlice: any
    examsSlice: any , 
    exaStepsSlice: any
}