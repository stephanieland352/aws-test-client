import { CHAT_INITIALIZED, CHAT_SESSION_BROKEN, CHAT_SESSION_CONNECTED, CHAT_SESSION_DISCONNECTED } from "./constants"

export const initializeChat = () => {
    return {
        type: CHAT_INITIALIZED
    }
}
export const connectChatSession = payload => {
    return {
        type: CHAT_SESSION_CONNECTED,
        payload: payload
    }
}

export const breakChatSession = ()=>{
    return {
        type: CHAT_SESSION_BROKEN
    }
}

export const endChatSession = () => {
    return {
        type: CHAT_SESSION_DISCONNECTED
    }
}