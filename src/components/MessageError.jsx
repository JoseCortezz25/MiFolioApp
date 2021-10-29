import React from 'react'
import '../assets/styles/buttons.css'

const style = {
  color: 'red',
  fontSize: 17,
}

const MessageError = ({error}) => <p style={style}>{error}</p>

export default MessageError
