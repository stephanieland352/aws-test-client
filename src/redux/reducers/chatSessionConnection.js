import {
    CHAT_INITIALIZED,
    CHAT_SESSION_BROKEN,
    CHAT_SESSION_CONNECTED,
    CHAT_SESSION_DISCONNECTED
} from '../actions/constants';

const initialState = {
    state: 'DISCONNECTED', // DISCONNECTED | INITIALIZED | CONNECTED | BROKEN,
    meta: {}
}

const chatSessionConnection = (state = initialState, action ) => {
    switch (action.type) {
        case CHAT_INITIALIZED: {
            return {
                ...state,
                state: 'INITIALIZED',
                meta: {}
            }
        }
        case CHAT_SESSION_CONNECTED: {
            return {
                ...state,
                state: 'CONNECTED',
                meta: action.payload
            }
        }
        case CHAT_SESSION_BROKEN: {
            return {
                ...state,
                state: 'BROKEN',
                meta: {}
            }
        }
        case CHAT_SESSION_DISCONNECTED: {
            return {
                ...state,
                state: 'DISCONNECTED',
                meta: {}
            }
        }
        default:
            return state;
    }
}

export default chatSessionConnection;