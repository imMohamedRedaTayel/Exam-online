import axios from 'axios';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { Store } from '@/types';
import { fetchDataFailed, setData } from './quizesSlice';

interface Variables {
    token: string;
    page: number;
    limit: number;
}

function* prepareVariables(): Generator<unknown, Variables, unknown> {
    const { token }: any = yield select((state: Store) => state.appSlice);
    // console.log( token , 'token' );
    const { page, limit }: any = yield select((state: Store) => state.quizesSlice );
    return { token, page, limit };
}

function* fetchDataSaga(action: any) {
    try {
        const { token, page, limit }: Variables = yield call(prepareVariables);
        const { data } = yield call(axios.get, 'https://exam.elevateegy.com/api/v1/subjects', {
            headers: { token },
            params: { page, limit },
        });
        console.log('Fetched data:', data);
        yield put(setData(data)); // تمرير البيانات إلى Redux
    } catch (error) {
        console.error('Error fetching data:', error);
        yield put(fetchDataFailed()); // معالجة الخطأ
    }
}

export const quizesSaga = function* Saga() {
    yield takeLatest(['quizesSlice/fetchData', 'quizesSlice/fetchMoreData'], fetchDataSaga);
};

