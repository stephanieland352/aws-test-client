import axios from "axios"
import { customerName, contactFlowId, instanceId, apiGatewayEndpoint } from "./AWSConstants";
import "amazon-connect-chatjs"
import { CHAT_INITIALIZED } from "./redux/actions/constants";
import {initializeChat, connectChatSession } from "./redux/actions/chatSessionActions";
export const startChatContact = async() => {
    const initiateChatRequest = {
        ParticipantDetails: {
            DisplayName: customerName
        },
        ContactFlowId: contactFlowId,
        InstanceId: instanceId
    };

    
   return  axios.post(apiGatewayEndpoint, initiateChatRequest).then((response)=> {
    
      return  response.data.data.startChatResult;
    }).catch(error => {
        console.log(error)
    })
}
export const ChatSessionCreate = async ({ContactId, ParticipantId, ParticipantToken}) => {
   return window.connect.ChatSession.create({
        chatDetails: {
            contactId: ContactId,
            participantId: ParticipantId,
            participantToken: ParticipantToken
        },
        type: "CUSTOMER",
        options: {
            region: 'us-east-1'
        }
    });

}

const SubscribeToSessionEvents = (dispatch) => {

    const session = getChatSessionController();
  
    session.connect().then((response) => {
        
        console.log("Successful connection: " + JSON.stringify(response));
        return response;
    }, (error) => {
        console.log("Unsuccessful connection " + JSON.stringify(error));
        return Promise.reject(error);
    });

    session.onConnectionEstablished((data) => {
        dispatch(connectChatSession())
        console.log("Established!");
        window.ChatMessages = [];
    });


    session.onMessage((message) => {
        console.log("Received message: " + JSON.stringify(message));
         const messages = window.ChatMessages;
         window.ChatMessages = [...messages, message.data]
    });

    session.onTyping((typingEvent) => {
        console.log("Received typing event: " + JSON.stringify(typingEvent));
    });

    session.onConnectionBroken((data) => {
        console.log("Connection broken.");
    });

}

export const StartANewChatSession = async (dispatch)=> {
    const startChatContactAPIResults = await startChatContact();
      ChatSessionCreate(startChatContactAPIResults).then( session => {
  
          session.connect().then((response) => {
            setChatSessionController(session);
            dispatch(initializeChat());
            console.log("Successful connection: " + JSON.stringify(response));
            return response;
        }, (error) => {
            console.log("Unsuccessful connection " + JSON.stringify(error));
            return Promise.reject(error);
        });

        }
        
    ).catch(err => {
        console.log(err)
    });

    
 
}

export const endTheChatSession = () => {
    const session = getChatSessionController()
    session.controller.disconnectParticipant();
}

export const setChatSessionController = session => {
    window.customerChatSession = session;
}

export const getChatSessionController = () => {
    return window.customerChatSession
}