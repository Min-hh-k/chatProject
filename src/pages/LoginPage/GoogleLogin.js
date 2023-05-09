import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import styled from "styled-components";
import { appAuth } from "../../firebase";
import { FcGoogle } from "react-icons/fc";

function GoogleLogin() {
  //! 구글로그인
  const onSubmitGoogle = () => {
    const provider = new GoogleAuthProvider(); // provider를 구글로 설정

    signInWithPopup(appAuth, provider) // popup을 이용한 signup
      .then((data) => {
        // console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Wrapper>
      <GoogleBtn onClick={onSubmitGoogle}>
        <FcGoogle style={{marginRight: "0.2rem"}}/> 구 글 로 그 인
      </GoogleBtn>
    </Wrapper>
  );
}

export default GoogleLogin;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
`;

const GoogleBtn = styled.button`
  width: 80%;
  height: 60px;
  border: none;
  border-radius: 3px;
  margin-bottom: 1rem;

  :hover {
    background-color: #b7b7b7;
  }
`;
