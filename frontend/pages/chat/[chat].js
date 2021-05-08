import React from "react";
import {Comment, Form, Feed, Button} from 'semantic-ui-react';
import useChat from '../../Components/sockettest';
import {useRouter} from 'next/router';

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
      <h1 className="room-name">Room: {1}</h1>
      <div className="messages-container">
        <ol className="messages-list">
          {messages.map((message, i) => (
            <li
              key={i}
              className={`message-item ${
                message.ownedByCurrentUser ? "my-message" : "received-message"
              }`}
            >
              {message.body}
            </li>
          ))}
        </ol>
      </div>
      <Form reply>
      <Form.TextArea onChange = {handleNewMessageChange} value = {newMessage} />
        <Button content='Add Reply' labelPosition='left' icon='edit' primary onClick = {handleSendMessage} />
    </Form>

      
    </div>
  );
};

export default ChatRoom;