import axios from "axios"
import { customerName, contactFlowId, instanceId, apiGatewayEndpoint } from "./AWSConstants";
import "amazon-connect-chatjs"

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

const SubscribeToSessionEvents = session => {
    session.connect().then((response) => {
        console.log("Successful connection: " + JSON.stringify(response));
        return response;
    }, (error) => {
        console.log("Unsuccessful connection " + JSON.stringify(error));
        return Promise.reject(error);
    });

    session.onConnectionEstablished((data) => {
        console.log("Established!");
    })

    session.onMessage((message) => {
        console.log("Received message: " + JSON.stringify(message));
    });

    session.onTyping((typingEvent) => {
        console.log("Received typing event: " + JSON.stringify(typingEvent));
    });

    session.onConnectionBroken((data) => {
        console.log("Connection broken.");
    });

}

export const StartANewChatSession = async ()=> {

    const startChatContactAPIResults = await startChatContact();
    const session = await ChatSessionCreate(startChatContactAPIResults)

    SubscribeToSessionEvents(session);
    return session  


}