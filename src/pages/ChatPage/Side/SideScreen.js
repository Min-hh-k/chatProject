import React from 'react'
import styled from 'styled-components'
import UserScreen from './UserScreen'
import Likes from './Likes'
import DM from './DM'
import ChatRoom from './ChatRoom'

function SideScreen() {
  return (
    <Wrapper>
      <UserScreen />
      <Likes />
      <ChatRoom />
      <DM />
    </Wrapper>
  )
}

export default SideScreen

const Wrapper = styled.div`
  background-color: #777777;
  width: 400px;
  padding: 2rem;
  color: #fff;
  min-height: 100vh;
  min-width: 300px;;
`