import React from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import styled from 'styled-components'

function ChatForm() {
  return (
    <>
      <InputGroup className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="메시지를 입력하세요~~"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <Button variant="outline-secondary" id="button-addon2">
          전송
        </Button>
      </InputGroup>
    </>
  )
}

export default ChatForm

const Wrapper = styled.div`
  width: 100%;
  height: 60px;
  border: 1px solid black;
  display: flex;

`