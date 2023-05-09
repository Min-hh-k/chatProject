import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import "./LoginPage.css";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { appAuth } from "../../firebase";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import setUser from "../../redux/actions/userAction";
import GoogleLogin from "./GoogleLogin";

function LoginPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //에러메시지
  const [errorForm, setErrorForm] = useState("");

  // 로딩 중 클릭 금지
  const [loading, setLoading] = useState("");

  // navigate
  const navigate = useNavigate();

  // const dispatch = useDispatch();

  // 리덕스 값 가져오기 테스트용
  const reduxValueTest = useSelector((state) => state.user);
  console.log(reduxValueTest);

  //! 파이어베이스 로그인
  const onSubmit = async (data) => {
    // data 에 입력 값 [이메일,네임,비번,비번확인] 들어 있음
    // console.log(data);

    try {
      // 로그인
      const login = await signInWithEmailAndPassword(
        appAuth,
        data.email,
        data.password
      );
      // console.log(login);

      setLoading(false);
      // dispatch(setUser(login))

      // chat main page로 이동
      navigate("/");
    } catch (error) {
      setErrorForm(error.message);

      setLoading(false);
      setTimeout(() => {
        setErrorForm("");
      }, 3000);
    }
  };

  // 패스워드 입력 값
  const password = useRef();

  // watch 사용해서 패스워드 값 가져오기
  password.current = watch("password");
  // console.log(password.current);



  return (
    <Wrapper>
      <Title>로그인</Title>
      <form className="loginWrapper" onSubmit={handleSubmit(onSubmit)}>
        <label>이메일</label>
        <input
          name="email"
          type="email"
          defaultValue=""
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        {/* errors will return when field validation fails  */}
        {errors.email && <span>이메일을 입력 하세요!</span>}

        <label>비밀번호</label>
        <input
          name="password"
          type="password"
          {...register("password", { required: true, minLength: 6 })}
        />
        {errors.password && errors.password.type === "required" && (
          <span>비밀번호를 입력 하세요!</span>
        )}
        {errors.password && errors.password.type === "minLength" && (
          <span>비밀번호는 최소 6글자 입니다!</span>
        )}
        {/* type 에 맞게 에러메시지 표출 */}

        {errorForm && <span>{errorForm}</span>}

        <input value="로그인" type="submit" disabled={loading} />
      </form>
      <GoogleLogin />

      <Link to="/register" style={{ color: "#9999", textDecoration: "none" }}>
        회원가입 하러가기
      </Link>
    </Wrapper>
  );
}

export default LoginPage;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 5rem;
`;

const Title = styled.h2``;
