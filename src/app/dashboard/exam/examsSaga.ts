import axios from 'axios';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { Store } from '@/types';
import { fetchDataFailed, setData } from './examsSlice';

interface Variables {
    token: string;
}

function* prepareVariables(): Generator<unknown, Variables, unknown> {
    const { token }: any = yield select((state: Store) => state.appSlice);
    // console.log( token , 'token' );
    return { token };
}

function* fetchDataSaga(action: any) {
    try {
        const { token }: Variables = yield call(prepareVariables);
        const { data } = yield call(axios.get, `https://exam.elevateegy.com/api/v1/exams`, {
            headers: { token },
        });
        console.log('Fetched data:', data);
        yield put(setData(data)); // تمرير البيانات إلى Redux
    } catch (error) {
        console.error('Error fetching data:', error);
        yield put(fetchDataFailed()); // معالجة الخطأ
    }
}

export const examsSaga = function* Saga() {
    yield takeLatest(['examsSlice/fetchData'], fetchDataSaga);
};

