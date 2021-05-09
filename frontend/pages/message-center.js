import React, { useEffect } from "react";
import {Comment, Form, Feed, Button, Segment, Image} from 'semantic-ui-react';
import useChat from '../Components/WebSocket';
import {useRouter} from 'next/router';
import WithAuth from '../Services/WithAuth';

const ChatRoom = (props) => {
  const router = useRouter();
  const { roomId } = router.query;
  const { messages, sendMessage } = useChat(1); // Creates a websocket and manages messaging
  const [newMessage, setNewMessage] = React.useState(""); // Message to be sent

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };
  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };


  return (
    <div className="chat-room-container">
      <h1 className="room-name">Messages - Please Keep it Appropriate :)</h1>
      <div className="messages-container">
        <ul style = {{"listStyleType": "none"}} className="messages-list">
          {messages.map((message, i) => (
            
            message.ownedByCurrentUser ? 
            <li
              key={i}
              style = {{"color" : "black", "display": "flex"}}
            > <Image size = "mini" src={`https://avatars.dicebear.com/api/human/${message.avatar}.svg`} /><b>{message.message.username}: </b>{message.message.body}</li>
            : 
            <li
              key={i}
              style = {{"color": "red", "display": "flex"}}
            ><Image size = "mini" src={`https://avatars.dicebear.com/api/human/${message.avatar}.svg`} /> <b>{message.message.username}: </b>{message.message.body}
            </li>
          ))}
        </ul>
      </div>
      <Segment>
      <Form reply>
      <Form.TextArea onChange = {handleNewMessageChange} value = {newMessage} />
        <Button content='Add Reply' labelPosition='left' icon='edit' primary onClick = {handleSendMessage} />
    </Form>
    </Segment>

      
    </div>
  );
};

export default WithAuth(ChatRoom);