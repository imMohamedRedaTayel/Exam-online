import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import rootSaga from './saga';
import rootReducer from './store';

// إعداد الـ Saga Middleware
const sagaMiddleware = createSagaMiddleware();

// إعداد الـ Persisted Reducer
const persistConfig: any = {
  key: 'root',
  storage,
  blacklist: [
    "quizesSlice",
    "examSlice",
    "examsSlice",
    "exaStepsSlice",
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// إعداد الـ Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sagaMiddleware),
});

// تشغيل الـ Saga Middleware
sagaMiddleware.run(rootSaga);

// إعداد الـ Persistor
export const persistor = persistStore(store);
