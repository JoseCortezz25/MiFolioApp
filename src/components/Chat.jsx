import React, { useState } from 'react'
import '../assets/styles/Chat.css'
import iconSendMessage from '../assets/static/icons/messager-send-icon.svg'
const Chat = ({
  userToChat,
  sendMessage,
  value,
  onChange,
  username,
  messages
}) => {
  
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);

  console.log('messages');
  console.log(messages);
  return (
    <div className="ChatContainer">
      <div className="ChatContainer-header">
        <h3>{userToChat} - @{username}</h3>
      </div>
      <div className="ChatContainer-body">
        {messages.map((message, index) => {
          return (
            <div className="ChatContainer-message">
              <p>{message.text}</p>
            </div>
          )
        })}
      </div>
      <div className="ChatContainer-footer">
        <form onSubmit={sendMessage}>
          <input
            className="Writebox"
            type="text"
            placeholder="Type a message"
            value={value} onChange={onChange}
          />

          <button className="ChatContainer-button">
            <img src={iconSendMessage} alt="" />
          </button>
        </form>
      </div>
    </div>
  )
}

export default Chat
