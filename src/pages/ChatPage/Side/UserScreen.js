import React, { useRef } from "react";
import styled from "styled-components";

import { IoIosChatboxes } from "react-icons/io";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";
import { useDispatch, useSelector } from "react-redux";
import { appAuth } from "../../../firebase";
import { signOut, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updatePhotoURL } from "../../../redux/actions/userAction";
import { getDatabase, set, update, ref as refDb } from "firebase/database";

function UserScreen() {
  const navigate = useNavigate();

  // 리덕스 스토어 > 로그아웃 & storage user.uid 사용
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  // console.log(user);

  // storage user.uid 
  const userUid = user.uid;

  //! 로그아웃
  const handleLogout = () => {
    navigate("/login");

    // 리덕스 스토어에서 정보가 바로 나가니까 이름이나 프로필 사진랜더링 에러 방지 위해 setTimeout
    setTimeout(() => {
      signOut(appAuth);
    }, 1000);
  };

  //! 프로필 사진 변경

  // useRef, ref={},  Dom / input type="file" 적용
  const profileInputRef = useRef();

  const changeProfileImg = () => {
    // onClick -> input type="file" 과 연결
    profileInputRef.current.click();
  };

  //! 프로필사진 storage 업로드
  const uploadImg = async (e) => {
    // 업로드한 이미지 파일
    const file = e.target.files[0];
    console.log(file);

    const storageRef = ref(storage, userUid);

    //! 프로필 사진 실시간 데이터베이스에 저장
    // 데이터베이스 가져오기
    const database = getDatabase();

    try {
      //! 1. 스토리지 파일 저장
      await uploadBytes(storageRef, file).then(
        (snapshot) => {
          // console.log("Uploaded a blob or file!");
          // console.log(snapshot);
        }
      );

      //! 2. 스토리지 파일 업로드 했으니까, 다운받은거 변수에 담아서 -> 프로필 업데이트

      // 업로드 된 사진, 스토리지에서 받아온거 담기
      let downStoragePhotoUrl = await getDownloadURL(ref(storage, userUid));

      // console.log(downStoragePhotoUrl);

      // 파이어베이스 유저정보 업데이트
      await updateProfile(appAuth.currentUser, {
        photoURL: downStoragePhotoUrl,
      });

      //! 3. 리덕스 스토어도 업데이트 해주기
      dispatch(updatePhotoURL(downStoragePhotoUrl));

      //! 4. 실시간 데이터베이스에도 유저정보 업데이트 해주기
      // 파이어베이스 데이터베이스 프로필 이미지 저장
      // update 사용하여 ,테이블 users / 값 uid 고유값id >> {키:값} 정보들
      //? 스토리지 ref와 데이터베이스 ref as refDb 로 구별

      const uploadIMG = await update(refDb(database, `users/${userUid}`), {
        profilePicture: downStoragePhotoUrl,
      });

      console.log(uploadIMG)


    } catch (err) {
      console.log(err);
    }
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
            {user && user.displayName}
          </Dropdown.Toggle>
          {/* 프로필 사진 변경 useRef 사용 */}
          <input
            type="file"
            style={{ display: "none" }}
            ref={profileInputRef}
            accept="image/jpeg, image/png"
            onChange={uploadImg}
          />
          <Dropdown.Menu>
            <Dropdown.Item onClick={changeProfileImg}>사진변경</Dropdown.Item>
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
