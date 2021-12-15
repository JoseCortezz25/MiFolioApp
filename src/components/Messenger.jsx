import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import io from 'socket.io-client'
import UserContext from '../context/UserContext'
import CardUserMessenger from './CardUserMessenger'
import '../assets/styles/Messenger.css'
import { getUserFollowing } from '../services/user'

const Messenger = () => {
  const socket = io.connect('http://localhost:5001')
  const [usersFollowing, setUsersFollowing] = useState([])
  const [message, setMessage] = useState([])
  // const [currentlyMessage, setCurrentlyMessage] = useState()
  // const [currentlyMessageOwner, setCurrentlyMessageOwner] = useState('')
  const { username } = useParams()
  const { user } = useContext(UserContext)

  // const [room, setRoom] = useState('')
  useEffect(() => {
    setTimeout(() => {
      getUserFollowing(username).then(data => {
        setUsersFollowing(data.data.body.following)
        console.log(data);
      })
    }, 1000);
  }, [username])

  socket.on('chat:message', (data) => {
    // console.log(data)
    // setCurrentlyMessage([`<p>
    //   <strong>${data.user.username}</strong> : ${data.message}
    //   </p>`, ...message])
  })

  // console.log(usersMocks);
  const handleSubmit = (e) => {
    e.preventDefault()
    socket.emit('chat:message', {
      message,
      user: user
    })
    // console.log('message', message)
  }

  console.log(usersFollowing);
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
          {usersFollowing.map((user, index) => (
            <CardUserMessenger 
              fullname={user.fullname}
              image={user?.imageURL}  
            />
          ))}
        </div>
      </section>

      <section className="MessengerContainer__section">

      </section>
      {/* <h2>chat de {username}</h2>
      <br />
      <form onSubmit={handleSubmit}>

        Messenger
        <input type="text" name="message" onChange={({ target }) => setMessage(target.value)} />
        <button type="submit">Send</button>
      </form>

      <p>chat</p>

      <p>{currentlyMessage}</p> */}
    </section>
  )
}

export default Messenger
