import 'regenerator-runtime/runtime';
import {put, retry, call } from 'redux-saga/effects'
 
import { identity } from '../../utilities/helpers';
import { getChatSessionController } from '../../AWSChatJS';
import { failureTranscript, successTranscript, requestTranscript } from '../actions/transcriptActions';

export const getTranscripts = () => {
  const session =  getChatSessionController();
  session.getTranscript({}).then(identity);
}
export function* getTranscript(){
    try {
        yield put(requestTranscript());
        const transcripts = yield retry(3, 2000, getTranscripts);
        yield put(successTranscript(transcripts.data))
    } catch(e){
        yield put (failureTranscript());
    
    }
}
function* watchGetTranscript() {
    yield call(getTranscript)
}

export default watchGetTranscript;