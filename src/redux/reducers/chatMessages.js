import {
    CLOSE_CHAT,
    FAILURE_SEND_MESSAGE,
    REQUEST_MEMBER_MESSAGE_PUBLISH, REQUEST_RETRY_SEND_MESSAGE, REQUEST_SEND_MESSAGE, SUCCESS_SEND_MESSAGE
} from '../actions/constants';

const initialState = [];

const chatMessageReducer = (state = initialState, action) => {
    switch (action.type){
        case REQUEST_MEMBER_MESSAGE_PUBLISH: {
            return [
                ...state,
                {
                    map: action.payload,
                    meta: {
                        ...action.meta,
                        state: REQUEST_MEMBER_MESSAGE_PUBLISH
                    }
                }
            ]
        }
        case REQUEST_SEND_MESSAGE : {
            return [
                ...state,
                {
                    map: action.payload,
                    meta: {
                        ...action.meta,
                        state: REQUEST_SEND_MESSAGE
                    }
                }
            ];
        }
        case SUCCESS_SEND_MESSAGE : {
            return [
                ...state.filter(message => message.meta.Id != action.meta.id ),
                {
                    map: action.payload,
                    meta: {
                        ...action.meta,
                        state: SUCCESS_SEND_MESSAGE
                    }
                }
            ]
        }
        case REQUEST_RETRY_SEND_MESSAGE: {
            return state.map(message => {
                if(message.meta.Id === action.meta.Id){
                    return {
                        map: action.payload,
                        meta: {
                            ...action.meta,
                            state: REQUEST_RETRY_SEND_MESSAGE
                        }
                    }
                }
                return message;
            })
        }
        case FAILURE_SEND_MESSAGE :{
            return state.map(message => {
                if(message.meta.Id === action.meta.Id){
                    return {
                        map: action.payload,
                        meta: {
                            ...action.meta,
                            state: FAILURE_SEND_MESSAGE
                        }
                    };
                }
                return message;
            })
        }
        case CLOSE_CHAT :
            return initialState;
        default:
            return state;
    }
}

export default chatMessageReducer;