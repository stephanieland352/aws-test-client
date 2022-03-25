import { REQUEST_MEMBER_MESSAGE_PUBLISH, REQUEST_SEND_MESSAGE, REQUEST_RETRY_SEND_MESSAGE } from "./constants";

export const sendMessage = ({ClientToken, ConnectionToken}, Content) => {
    return {
        type: REQUEST_SEND_MESSAGE,
        payload: {
            ClientToken,
            ConnectionToken,
            Content,
            ContentType: 'text/plain'

        },
        meta: {
            ParticipantRole: 'CUSTOMER',
            Id : Date.now().toString(),
            AbsoluteTime: new Date(Date.now()).toISOString()
        }
    }
}

export const retrySendMessage = ({ClientToken, ConnectionToken, Id}, Content) => {
    return {
        type: REQUEST_RETRY_SEND_MESSAGE,
        payload: {
            ClientToken,
            ConnectionToken,
            Content,
            ContentType: 'text/plain'
        },
        meta: {
            ParticipantRole: 'CUSTOMER',
            Id,
            AbsoluteTime : new Date(Date.now()).toISOString()
        }
    }
}

export const receivedMessage = payload => {
    return {
        type: REQUEST_MEMBER_MESSAGE_PUBLISH,
        payload: payload,
        meta: {
            Id: payload?.Id,
            ParticipantRole: payload?.ParticipantRole,
            AbsoluteTime: payload?.AbsoluteTime
        }
    }
}