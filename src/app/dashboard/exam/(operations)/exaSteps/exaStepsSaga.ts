import axios from 'axios';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { Store } from '@/types';
import { fetchDataFailed, setData } from './exaStepsSlice';

interface Variables {
    token: string;
    selectedExamId: string
}

function* prepareVariables(): Generator<unknown, Variables, unknown> {
    const { token }: any = yield select((state: Store) => state.appSlice);
    // console.log( token , 'token' );
    const { selectedExamId }: any = yield select((state: Store) => state.exaStepsSlice );
    return { token, selectedExamId };
}

function* fetchDataSaga(action: any) {
    try {
        const { token, selectedExamId }: Variables = yield call(prepareVariables);
        const { data } = yield call(axios.get, `https://exam.elevateegy.com/api/v1/questions?exam=${selectedExamId}`, {
            headers: { token },
            // params: { exam: selectedExamId }
        });
        console.log('Fetched data:', data);
        yield put(setData(data)); // تمرير البيانات إلى Redux
    } catch (error) {
        console.error('Error fetching data:', error);
        yield put(fetchDataFailed()); // معالجة الخطأ
    }
}

export const exaStepsSaga = function* Saga() {
    yield takeLatest(['exaStepsSlice/fetchData'], fetchDataSaga);
};

