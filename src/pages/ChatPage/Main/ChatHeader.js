import React from 'react'

function ChatHeader({channel}) {
  console.log(channel)
  
  return (
    <>
    <div># {channel.chatroom.currentChannel.name} </div>
    <div>{channel.chatroom.currentChannel.details}</div>
    </>

  )
}

export default ChatHeader