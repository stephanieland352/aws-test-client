import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import chatSessionConnection from './reducers/chatSessionConnection';
import chatMessages from './reducers/chatMessages';
import uiReducer from './reducers/ui';
import transcriptReducer from './reducers/transcripts';
export default function configureStore(initialState) {
    let reducer = combineReducers({
        chatSessionConnection,
        chatMessages,
        uiReducer,
        transcriptReducer
    });

    const sagaMiddleware = createSagaMiddleware();
    let enhancements = [applyMiddleware(sagaMiddleware)]

    if(typeof window !== 'undefined' && window?.__REDUX_DEVTOOLS_EXTENSION__ ){
        enhancements.push(window?.__REDUX_DEVTOOLS_EXTENSION__())
    }
    return{
        ...createStore(reducer, initialState, compose(...enhancements)),
        runSaga: sagaMiddleware.run
    }
}
