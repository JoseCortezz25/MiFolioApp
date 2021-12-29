import React, { useState, useContext, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import io from 'socket.io-client'
import UserContext from '../context/UserContext'
import CardUserMessenger from './CardUserMessenger'
import Chat from './Chat'
import '../assets/styles/Messenger.css'
import { getUserFollowing } from '../services/user'
import { getConversations } from '../services/conversation'
import Conversation from './Conversation'
// import { io } from "socket.io-client";

const Messenger = () => {
  const [usersFollowing, setUsersFollowing] = useState([])
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [media, setMedia] = useState('')
  const [userToChat, setUserToChat] = useState()
  const [receiver, setReceiver] = useState('')
  const [receiverId, setReceiverID] = useState('')
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [groupMessage, setGroupMessage] = useState([]);

  // const [currentlyMessage, setCurrentlyMessage] = useState()
  // const [currentlyMessageOwner, setCurrentlyMessageOwner] = useState('')
  const receiverRef = useRef(null)
  const [conversations, setConversations] = useState([])
  const [onlineUsers, setOnlineUsers] = useState([]);

  const { username } = useParams()
  const { user } = useContext(UserContext)
  const socket = io.connect('http://localhost:5001')

  const sortNames = (username1, username2) => [username1, username2].sort().join('-')

  const sendMessage = (e) => {
    e.preventDefault()
    // console.log('mensaje')
    // console.log({ 
    //   senderId: user._id, 
    //   receiverId: receiverId, 
    //   text: message,
    // });

    socket.emit('sendMessage', { 
      senderId: user._id, 
      receiverId: receiverId, 
      text: message,
    })
    // console.log(`%c ${messages}`, 'background: #222; color: #bada55')
    setMessages([...messages, {
      sender: user._id,
      text: message,
      createdAt: Date.now(),
    }]);

  }

  console.log('messages', messages);

  const onUserSelect = (fullname, username, receiverId) => {
    setReceiver(username)
    receiverRef.current = username
    setUserToChat(fullname)
    setReceiverID(receiverId)
  }

  useEffect(() => {
    socket.emit("addUser", user?._id, username);
    socket.on("getUsers", (users) => {
      console.log('users', users);
    });

    socket.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });

      setMessages([...messages, {
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      }]);
    });
  }, [user]);

  useEffect(() => {
    const getConversationsInChat = async () => {
      try {
        console.group('getConversations')
        const res = await getConversations(user._id)
        console.log(res.data);
        console.groupEnd()
        setConversations(res.data.body);
        
      } catch (err) {
        console.log(err);
      }
    };
    getConversationsInChat();
  }, [user?._id]);

  useEffect(() => {
    setTimeout(() => {
      getUserFollowing(username).then(data => {
        setUsersFollowing(data.data.body.following)
      })
    }, 2000);
  }, [username, receiver])

  return (
    <section className="MessengerContainer">
      <section className="MessengerContainer__section">
        <div className="MessengerContainer__profile">
          <div className="MessengerProfileBox__image">
            <img src={user?.profile_image?.imageURL} alt="" />
          </div>
          <p className="MessengerProfileBox__fullname">{user?.fullname}</p>
        </div>
        <div className="BoxUsers">
          {/* {conversations.map(conversation => (
            <Conversation 
              conversation={conversation}
              currentUser={user}
            />
          ))} */}

          {usersFollowing.map((user, index) => {
            return (
              <CardUserMessenger
                user={user}
                fullname={user.fullname}
                image={user?.imageURL}
                username={user.username}
                onUserSelect={onUserSelect}
              />
            ) 
          })}
        </div>
      </section>

      <section className="MessengerContainer__section">
        {userToChat &&
          <Chat
            messages={messages}
            userToChat={userToChat}
            sendMessage={sendMessage}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            setMessage={setMessage}
            username={receiver}
          />
        }
      </section>
    </section>
  )
}

export default Messenger
