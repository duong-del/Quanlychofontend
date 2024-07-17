import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReduce"
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga/index"

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

export default store;