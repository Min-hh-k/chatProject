import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import SideScreen from "./Side/SideScreen";
import MainScreen from "./Main/MainScreen";

function ChatPage() {
  // 리덕스 값 가져오기
  const isLoading = useSelector((state) => state);

  console.log(isLoading);
  return (
    <Wrapper>
      <Left>
        <SideScreen />
      </Left>

      <Right>
        <MainScreen />
      </Right>
    </Wrapper>
  );
}

export default ChatPage;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  /* padding: 2rem; */
`;

const Left = styled.div`
  flex: 1;
`;

const Right = styled.div`
  flex: 3;
`;
