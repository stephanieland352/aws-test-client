import React, {useState} from "react";
import { startChatContact, ChatSessionCreate, StartANewChatSession, endTheChatSession } from "../../AWSChatJS";
import "amazon-connect-chatjs"
import { useDispatch, useSelector } from "react-redux";
import Input from "../../Input";
import { getTranscriptState, getTranscript, getChatMessages } from "../../redux/actions/selectors";

const Chat = () => {
    const dispatch = useDispatch();
    const transcriptMessages = useSelector(getTranscript);
    const isTranscriptError = useSelector(getTranscriptState) === 'FAILURE';
    const chatMessages = useSelector(getChatMessages);
    const messages = [ ...chatMessages];
    const handleStartChat = () => {
         StartANewChatSession(dispatch);
    }
   
    return(
        <div>
            <div className="chat-container" >
            <div className="chat-messages">
                {messages.map(messageData => {
                    const content = messageData?.map?.Content || '';
                    const id = messageData?.meta?.Id;
                    const isMSR = messageData?.meta?.ParticipantRole === 'AGENT';
                    
                    const isMember = messageData?.meta?.ParticipantRole === 'CUSTOMER';
                    const isSystem = messageData?.meta?.ParticipantRole === 'SYSTEM';
                    const messageState = messageData?.meta.state;

                    return (
                        <div key={id}>{content}</div>
                    )
                })}
            </div>
            <Input />
        </div>
        
<button onClick={handleStartChat}>Start Chatting</button>
        </div>
    )
}
export default Chat;