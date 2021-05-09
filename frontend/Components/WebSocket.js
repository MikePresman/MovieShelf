import {useState, useRef, useEffect, useContext} from 'react';
import socketIOClient from 'socket.io-client';
import { localStorageService } from '../Services/AxiosManager';
import UserContext from './Contexts/UserContext';

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"; // Name of the event
const SOCKET_SERVER_URL = "http://localhost:5000";


const useChat = (roomId) => {
  const [messages, setMessages] = useState([]); // Sent and received messages
  const socketRef = useRef();

  useEffect(() => {  

    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: {roomId},
    });
    
    // Listens for incoming messages
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.message.senderId == socketRef.current.id,
      };
      
      setMessages((messages) => [...messages, incomingMessage]);
    });
    
    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.emit("disconnected", {
        body: "Disconnected",
        senderId: socketRef.current.id,
        username: localStorage.getItem('username')
      });
      socketRef.current.disconnect();
    };
  }, [roomId]);




  // Sends a message to the server that
  // forwards it to all users in the same room
  const sendMessage = (messageBody) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageBody,
      senderId: socketRef.current.id,
      username: localStorage.getItem('username')
    });
  };

  return { messages, sendMessage };
};

export default useChat;