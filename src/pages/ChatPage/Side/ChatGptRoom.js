import React from 'react'
import { FaRegSmileWink } from 'react-icons/fa'
import styled from 'styled-components'

function ChatGptRoom() {
  return (
    <Wrapper>
      <FaRegSmileWink style={{ marginRight: 3 }} />
      ChatGpt
    </Wrapper>
  )
}

export default ChatGptRoom


const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
`