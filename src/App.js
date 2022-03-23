import logo from './logo.svg';
import './App.css';
import {ConnectClient, AssociatedApprovedOriginCommand} from '@aws-sdk/client-connect';
import Chat from './components/chat';
function App() {
 
  return (
    <Chat />
  );
}

export default App;
