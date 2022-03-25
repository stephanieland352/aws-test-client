import { REQUEST_TRANSCRIPT, SUCCESS_TRANSCRIPT, FAILURE_TRANSCRIPT } from "./constants";

export const requestTranscript = payload => {
    return {
        type: REQUEST_TRANSCRIPT,
        payload: payload
    }
}

export const successTranscript = payload => {
    return {
        type: SUCCESS_TRANSCRIPT,
        payload: payload
    }
}

export const failureTranscript = payload => {
    return {
        type: FAILURE_TRANSCRIPT,
        payload: payload
    }
}