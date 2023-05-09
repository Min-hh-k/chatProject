import React from "react";
import styled from "styled-components";

import { IoIosChatboxes } from "react-icons/io";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";
import { useDispatch, useSelector } from "react-redux";
import { appAuth } from "../../../firebase";
import { signOut } from "firebase/auth";
import { logoutUser } from "../../../redux/actions/userAction";
import { useNavigate } from "react-router-dom";

function UserScreen() {
  const navigate = useNavigate()

  // 리덕스 로그아웃
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);

  //! 로그아웃
  const handleLogout = () => {
    navigate('/login')
    
    // 리덕스 스토어에서 정보가 바로 나가니까 이름이나 프로필 사진랜더링 에러 방지 위해 setTimeout
    setTimeout(() => {
      signOut(appAuth)
    },1000)
    
      // .then(() => {
      //   dispatch(logoutUser(user));
      //   navigate('/login')
      // })
      // .catch((error) => {
      //   console.log(error);
      //   alert(error)
      // });
  };

  return (
    <div>
      <h3>
        {/* <IoIosChatboxes /> */}
        chatProject
      </h3>

      <DropMenu>
        <Image
          src={user && user.photoURL}
          style={{ width: "30px", height: "30px", marginTop: "5px" }}
          roundedCircle
        />

        <Dropdown>
          <Dropdown.Toggle
            style={{ background: "transparent", border: "0px" }}
            id="dropdown-basic"
          >
            {user.displayName}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">사진변경</Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </DropMenu>
    </div>
  );
}

export default UserScreen;

const DropMenu = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

// const ProfileImg = styled.div`
//   width: 30px;
//   height: 30px;
//   margin-top: 3px;
// `;
