import React from "react";
import styled from "styled-components";
import MessageHeader from "./MessageHeader";
import MessageForm from "./MessageForm";

function MainScreen() {
  return (
    <Wrapper>
      <MessageHeader />
      <Box></Box>
      <MessageForm />
    </Wrapper>
  );
}

export default MainScreen;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: flex-start; */
  /* margin: 1rem; */
  padding: 2rem  2rem 0 2rem;
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
