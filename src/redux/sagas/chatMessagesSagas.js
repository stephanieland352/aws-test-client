import { eventChannel } from 'redux-saga';
import {call, take, put, takeEvery, all} from 'redux-saga/effects'
import 'regenerator-runtime/runtime';
import { receivedMessage } from '../actions/chatMessagesActions';
import { getChatSessionController } from '../../AWSChatJS';
import { FAILURE_MEMBER_MESSAGE_PUBISH, FAILURE_SEND_MESSAGE, REQUEST_RETRY_SEND_MESSAGE, REQUEST_SEND_MESSAGE, SUCCESS_MEMBER_MESSAGE_PUBLISH } from '../actions/constants';
import { makeThrowError } from '../../utilities/helpers';
/* 
onMessage
*/

export const onChannelMessagesEnd = () => {
    return null;
}
export const onChatSessionMessageCallback = emitter => event => {

    emitter(event)
}
export const emitChannelMessages = emitter => {
    // do session.onMessage with message callback
    const session = getChatSessionController();
    session.onMessage(onChatSessionMessageCallback(emitter))

    return onChannelMessagesEnd;
}
export function initMessageChannel(){
    return eventChannel(emitChannelMessages)
}

export function* onMemberMessage(){
    const eventChannelSetup = yield call(initMessageChannel);

    try{
        while (true) {
            const message = yield take(eventChannelSetup);
            yield put(receivedMessage(message.data));
            yield put({type:SUCCESS_MEMBER_MESSAGE_PUBLISH})
        }
    } finally {
        yield put({type:FAILURE_MEMBER_MESSAGE_PUBISH})
    }
}
export function* watchOnMemberMessage(){
    yield call(onMemberMessage)
}

/*
Send Message 
*/

export const sendMessage = async function (action) {
    const session = getChatSessionController();
   await session.sendMessage({
       contentType: 'text/plain',
       message: action.payload?.Content
   }).catch(makeThrowError('ERROR_SEND_MESSAGE'))
};

export function* sendMemberMessage(action) {
    try{

    } catch (e) {
        yield put({...action, type: FAILURE_SEND_MESSAGE})
    }
}
export function* watchSendMemberMessage(){
    yield takeEvery(REQUEST_SEND_MESSAGE, sendMemberMessage);
}

export function* watchRetrySendMemberMessage(){
    yield takeEvery(REQUEST_RETRY_SEND_MESSAGE, sendMemberMessage);
}
export default function* rootSaga() {
    yield all([watchSendMemberMessage(), watchOnMemberMessage(), watchRetrySendMemberMessage()])
}