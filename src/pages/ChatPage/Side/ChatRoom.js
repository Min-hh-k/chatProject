import {
  child,
  getDatabase,
  onChildAdded,
  push,
  ref,
  update,
} from "firebase/database";
import React, { useEffect, useState } from "react";
import { BiMessageAdd } from "react-icons/bi";
import styled from "styled-components";
import CreateChatRoomModal from "./CreateChatRoomModal";

function ChatRoom() {
  const [modalOpen, setModalOpen] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [roomDetail, setRoomDetail] = useState("");

  //채팅방
  const [channels, setChannels] = useState([]);

  const database = getDatabase();

  //
  //! 채팅방 정보 가져오기
  useEffect(() => {
    const unsubscribe = onChildAdded(ref(database, `channels`), (snapshot) => {
      setChannels((channelArr) => [...channelArr, snapshot.val()]);
    });
    return () => {
      setChannels([]);
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    console.log(channels);
  }, [channels]);

  // 채팅방 생성 모달 열고 닫기
  const handleClickOpenModal = () => {
    setModalOpen(true);
  };
  const handleClickCloseModal = () => {
    setModalOpen(false);
  };

  // 채팅방 생성
  const handleSubmit = async () => {
    const key = push(child(ref(database), "channels")).key;
    const newChannel = {
      id: key,
      name: roomName,
      details: roomDetail,
    };
    const updates = {};
    updates["/channels/" + key] = newChannel;

    // 방 생성 후 입력칸 ''
    try {
      await update(ref(database), updates);
      setRoomName("");
      setRoomDetail("");
      setModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    <Wrapper>
      {/* <FaRegSmileWink style={{ marginRight: 3 }} /> */}
      <div>
        ChatRooms{" "}
        <BiMessageAdd
          onClick={handleClickOpenModal}
          style={{ marginLeft: 3, fontSize: "1.3rem", cursor: "pointer" }}
        />
        {modalOpen && (
          <CreateChatRoomModal
            modalOpen={modalOpen}
            handleClickCloseModal={handleClickCloseModal}
            setRoomName={setRoomName}
            setRoomDetail={setRoomDetail}
            handleSubmit={handleSubmit}
          />
        )}
      </div>


    </Wrapper>
    <ChannelsWrapper>
        {channels.map((el) => (
          <div key={el.id}>
            <p>{el.name}</p>
          </div>
        ))}
      </ChannelsWrapper>
    </>

  );
}

export default ChatRoom;

const Wrapper = styled.div`
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  /* position: relative; */
  width: 100%;
`;

const ChannelsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
