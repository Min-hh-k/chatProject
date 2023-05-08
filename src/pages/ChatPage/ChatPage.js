import React from 'react'
import { useSelector } from 'react-redux';

function ChatPage() {
    // 리덕스 값 가져오기
    const isLoading = useSelector((state) => state);

    console.log(isLoading)
  return (
    <div>ChatPage</div>
  )
}

export default ChatPage