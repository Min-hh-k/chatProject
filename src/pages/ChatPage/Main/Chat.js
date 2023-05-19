import React from "react";
import styled from "styled-components";
import ChatHeader from "./ChatHeader";
import ChatForm from "./ChatForm";
import { useSelector } from "react-redux";

function Chat() {
  const channel = useSelector((state) => state);
  // console.log(channel)

  // 리덕스 값 가져오기
  const isLoading = useSelector((state) => state.chatroom.isLoading);

  if (isLoading) {
    <div style={{ fontSize: "100px" }}>로딩중</div>;
  } else {
    return (
      <Wrapper>
        <ChatHeader channel={channel} />
        <Box>Chat</Box>
        <ChatForm />
      </Wrapper>
    );
  }
}

export default Chat;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: flex-start; */
  /* margin: 1rem; */
  padding: 2rem 2rem 0 2rem;
`;

const Box = styled.div`
  width: 90%;
  height: 500px;
  padding: 1rem;
  overflow-y: auto;
  margin-bottom: 1rem;
  border: 0.5rem solid #ececec;
  border-radius: 10px;
`;
