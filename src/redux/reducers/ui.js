import { SUCCESS_MEMBER_MESSAGE_PUBLISH } from "../actions/constants";


const initialState = {
    memmber: {
        isTypeing:false
    }
}

const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUCCESS_MEMBER_MESSAGE_PUBLISH: {
            return{
                ...state,
                member: {
                    ...state.member,
                    isTypeing: false
                }
            }
        }
        default: 
            return state;
    }
}

export default uiReducer;