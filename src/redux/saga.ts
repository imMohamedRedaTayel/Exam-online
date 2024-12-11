import { quizesSaga } from "@/app/dashboard/analysis/components/quizes/quizesSaga";
import { examSaga } from "@/app/dashboard/exam/[id]/examSaga";
import { examsSaga } from "@/app/dashboard/exam/examsSaga";
import { all } from "redux-saga/effects";



export default function* rootSaga() {
  yield all([
    quizesSaga(), 
    examSaga(), 
    examsSaga()
  ]);
}
