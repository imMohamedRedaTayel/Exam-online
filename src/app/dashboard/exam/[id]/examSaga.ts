import axios from 'axios';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { Store } from '@/types';
import { fetchDataFailed, setData } from './examSlice';

interface Variables {
    token: string;
    examId: string
}

function* prepareVariables(): Generator<unknown, Variables, unknown> {
    const { token }: any = yield select((state: Store) => state.appSlice);
    // console.log( token , 'token' );
    const { examId }: any = yield select((state: Store) => state.examSlice );
    return { token, examId };
}

function* fetchDataSaga(action: any) {
    try {
        const { token, examId }: Variables = yield call(prepareVariables);
        const { data } = yield call(axios.get, `https://exam.elevateegy.com/api/v1/exams?subject=${examId}`, {
            headers: { token },
            params: { subject: examId },
        });
        console.log('Fetched data:', data);
        yield put(setData(data)); // تمرير البيانات إلى Redux
    } catch (error) {
        console.error('Error fetching data:', error);
        yield put(fetchDataFailed()); // معالجة الخطأ
    }
}

export const examSaga = function* Saga() {
    yield takeLatest(['examSlice/fetchData'], fetchDataSaga);
};

