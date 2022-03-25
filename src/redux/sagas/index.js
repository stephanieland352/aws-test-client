import {all, takeLatest} from 'redux-saga/effects'
import { CHAT_INITIALIZED } from '../actions/constants'
import watchChatMessageSagas from './chatMessagesSagas';
import { watchOnChatSessionConnect } from './chatSessionSagas';
import watchGetTranscript from './transcriptSagas';

export const allSagas = function*(){
    yield all([
        watchChatMessageSagas(),
        watchGetTranscript(),
        watchOnChatSessionConnect()
    ])
}
export default function* rootSaga(){
    yield takeLatest(CHAT_INITIALIZED, allSagas)
}