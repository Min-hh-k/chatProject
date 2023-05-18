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
import { useDispatch } from "react-redux";
import setCurrentChannel from "../../../redux/actions/channelAction";

function ChatRoom() {
  const database = getDatabase();

  const [modalOpen, setModalOpen] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [roomDetail, setRoomDetail] = useState("");

  //채팅방
  const [channels, setChannels] = useState([]);
  const [activeChannelId, setActiveChannelID] = useState("");
  const [firstLoaded, setFirstLoaded] = useState(true);

  //
  const dispatch = useDispatch();

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

  // 채널 생성 확인
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

  // 채팅방 클릭 시 채널 전환, redux
  const changeChannel = (channel) => {
    if (channel.id === activeChannelId) return;

    setActiveChannelID(channel.id);
    dispatch(setCurrentChannel(channel));
  };

  // 첫 채널 랜더링
  useEffect(() => {
    const firstChannel = channels[0];

    if (channels.length > 0 && firstLoaded) {
      setActiveChannelID(firstChannel);
      dispatch(setCurrentChannel(firstChannel));
      setFirstLoaded(false);
    }
  }, [channels, dispatch, firstLoaded]);

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
          <ChannelsInnerWrapper key={el.id}>
            <button
              onClick={() => changeChannel(channels)}
              // onSelect={channels.id === activeChannelId }
            >
              {el.name}
            </button>
          </ChannelsInnerWrapper>
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

const ChannelsInnerWrapper = styled.div`
  display: flex;

  button {
    border: none;
    background-color: #777777;
    font-size: 1.3rem;
    padding: 10px;
    color: #ffffff;

    :hover {
      color: #f67745;
    }
  }
`;
