import 'regenerator-runtime/runtime'
import {put, take, call, all } from 'redux-saga/effects';

import { connectChatSession, breakChatSession, endChatSession } from '../actions/chatSessionActions';

import { getChatSessionController } from '../../AWSChatJS';
import { eventChannel } from 'redux-saga';

/** on Connection established */

export const onChatSessionConnectionEstablishedEnd = () => {
    return null;
}

export const onChatSessionConnectionCallback = emitter => event => {
    
    if( event?.data){
        emitter(event);
    }
    
}
export const emitChannelChatSessionConnect = emitter => {
    const session = getChatSessionController();
    
     session.onConnectionEstablished(onChatSessionConnectionCallback(emitter));


    return onChatSessionConnectionEstablishedEnd;
}
export const initChatSessionConnectChannel = () =>{
    console.log('init test')
    return eventChannel(emitChannelChatSessionConnect)
}
export function* onChatSessionConnection() {
    const chatSessionEstablishedChannelSetup = yield call(initChatSessionConnectChannel);
   
    while (true) {
        
        try {
           
            const event = yield take(chatSessionEstablishedChannelSetup);
            yield put(connectChatSession(event))

        } catch(err) {
            console.log(err)
            yield put(breakChatSession())
        }
    }
}
export function* watchOnChatSessionConnect() {
    yield call(onChatSessionConnection);
}
