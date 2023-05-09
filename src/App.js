import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ChatPage from "./pages/ChatPage/ChatPage";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { appAuth } from "./firebase";

import { useDispatch, useSelector } from "react-redux";
import setUser, { logoutUser } from "./redux/actions/userAction";

function App() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  // 리덕스 값 가져오기
  const isLoading = useSelector((state) => state.user.isLoading);

  //! onAuthStateChanged : 유저의 인증정보 변화를 관찰하는 함수
  useEffect(() => {
    onAuthStateChanged(appAuth, (user) => {
      // 유저 정보
      // console.log(user);

      //? 유저가 로그인 되어 있으면?
      if (user) {
        dispatch(setUser(user));
        setTimeout(() => {
          navigate("/");
        }, 500);
      } else {
        dispatch(logoutUser(user));
      }
    });
  }, []);

  // 로딩 시 적용
  // if (isLoading) {
  //   <div style={{ fontSize: "100px" }}>로딩중</div>;
  // } else {

  // }
  return (
    <Routes>
      <Route path="/" element={<ChatPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
