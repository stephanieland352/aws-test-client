import React from "react";
import { startChatContact, ChatSessionCreate, StartANewChatSession } from "../initializeConnect";
import "amazon-connect-chatjs"

const Chat = () => {
    const handleClick = () => {
        const contactParams = StartANewChatSession()
    }
    return(
        <div>
<button onClick={handleClick}>Start Chatting</button>
        </div>
    )
}
export default Chat;