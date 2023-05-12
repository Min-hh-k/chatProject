import { getDatabase, ref } from 'firebase/database';
import React, { useEffect } from 'react'
import { FaRegSmileWink } from 'react-icons/fa';
import { BiMessageAdd } from 'react-icons/bi';
import styled from 'styled-components';

function ChatRoom() {
  const chatRoomsRef = ref(getDatabase(), 'chatRooms');


  // 
  useEffect(() => {
    addChatRoomsListeners();

  }, []);

  const addChatRoomsListeners = () => {
    let chatRoomsArray = []

  }

  return (
    <Wrapper>
      {/* <FaRegSmileWink style={{ marginRight: 3 }} /> */}
      ChatRooms <BiMessageAdd style={{ marginLeft: 3, fontSize: "1.1rem" }} />
    </Wrapper>
  )
}

export default ChatRoom


const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
`