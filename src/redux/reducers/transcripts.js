import { REQUEST_TRANSCRIPT, SUCCESS_TRANSCRIPT, FAILURE_TRANSCRIPT, CLOSE_CHAT } from "../actions/constants";

export const initialState = {
    state: 'INITIAL' // INITIAL | SUCCESS | FAILURE | LOADING
}

export const mapTranscriptMessages = el => {
    return {
        map: el,
        meta: {
            Id: el.id,
            ParticipantRole: el.ParticipantRole,
            AbsoluteTime: el.AbsoluteTime
        }
    }
};

const transcriptReducer = (state = initialState, action) => {
    switch(action.type) {
        case REQUEST_TRANSCRIPT : {
            return {
                ...state,
                state: 'LOADING',
                list: [],
                meta: {}
            }
        }
        case SUCCESS_TRANSCRIPT : {
            return {
                ...state,
                state: 'SUCCESS',
                list: (action.payload?.Transcript || [] ).map(mapTranscriptMessages)
            }
        }
        case FAILURE_TRANSCRIPT : {
            return {
                ...state,
                state: 'FAILURE',
                list: [],
                meta: {
                    message: 'there was an error getting chat transcripts'
                }
            }
        }
        case CLOSE_CHAT :
            return initialState
        default:
            return state;
    }
}
export default transcriptReducer;