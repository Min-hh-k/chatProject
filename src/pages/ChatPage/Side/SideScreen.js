import React from 'react'
import styled from 'styled-components'
import UserScreen from './UserScreen'
import ChatRoom from './ChatRoom'
import ChatGptRoom from './ChatGptRoom'

function SideScreen() {
  return (
    <Wrapper>
      <UserScreen />
      <ChatRoom />
      <ChatGptRoom />

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