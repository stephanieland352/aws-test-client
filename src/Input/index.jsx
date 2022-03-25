import React, {useState} from "react";
import { endTheChatSession } from "../AWSChatJS";
export const makeSetValue = setValue => {
    return function(e){
        setValue(e.target.value);
    }
}
export const Input = () => {
    const [value, setValue] = useState('')
    const handleEndChat = () => {
        endTheChatSession()
    }
    const handleSendMessage = () => {
        const session = window.customerChatSession;
        session.controller.sendMessage({
            message: value,
            contentType: "text/plain"
        });
        setValue('')
    }
    return (
        <div className="input">
                <form  onSubmit={e => {
                    e.preventDefault();
                    handleSendMessage();
                }}>
                    <div>
                        <textarea
                        onChange= {e => {
                            makeSetValue(setValue)(e);
                        }}
                        />
                    <div>
                        <button type="submit">Send</button>
                        <button type="button" onClick={handleEndChat}>End Chat</button>
                    </div>
                    </div>
                </form>
            </div>
    )
}

export default Input; 