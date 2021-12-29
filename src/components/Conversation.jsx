import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { getUser } from '../services/user'

const Conversation = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {

    const friendId = conversation.members.find(m => m !== currentUser._id)
    const getUser = async () => {
      try {
        console.group('getUser')
        const res = await getUser(friendId)
        console.log(res);
        console.groupEnd()
      } catch (error) {
        console.log(error);
      }
    }
    getUser()
  }, [conversation, currentUser])

  return (
    <div className="MessengerContainer__profile">
      <div className="MessengerProfileBox__image">
        {/* <img src={user?.profile_image?.imageURL} alt="" /> */}
      </div>
      {/* <p className="MessengerProfileBox__fullname">{user?.fullname}</p> */}
      <p className="MessengerProfileBox__fullname">user?.fullname</p>
    </div>
  )
}

export default Conversation
