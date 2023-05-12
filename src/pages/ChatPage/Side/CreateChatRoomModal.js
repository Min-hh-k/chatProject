import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styled from "styled-components";

function CreateChatRoomModal(props) {
  const { handleClickCloseModal, setRoomName, setRoomDetail ,handleSubmit } = props;
  return (
    <Wrapper
      className="modal show"
      style={{ display: "block", position: "initial", color: "black" }}
    >
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>채팅방 생성</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>채팅룸 '이름'을 입력하세요!</p>
          <input type="text" onChange={(e) => {setRoomName(e.target.value)}} style={{marginBottom:"1rem"}}/>
          <p>채팅룸 '설명'을 입력하세요!</p>
          <input type="text" onChange={(e) => {setRoomDetail(e.target.value)}}/>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClickCloseModal}>
            Close
          </Button>
          <Button style={{ backgroundColor: "yellowgreen",border: "none" }} onClick={handleSubmit}>Save changes</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Wrapper>
  );
}

export default CreateChatRoomModal;

const Wrapper = styled.div`

`