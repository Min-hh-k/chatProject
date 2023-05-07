import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import "./Register.css";
import styled from "styled-components";
import { Link } from "react-router-dom";
import firebase from "../../firebase";
import { appAuth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";


function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //! 파이어베이스 회원가입
  const onSubmit = async (data) => {
    // data 에 입력 값 [이메일,네임,비번,비번확인] 들어 있음
    console.log(data)

    try {
      await createUserWithEmailAndPassword(appAuth, data.email, data.password)

    }
    catch {}

  }

  // console.log(watch("email"));

  // 패스워드 입력 값
  const password = useRef();

  // watch 사용해서 패스워드 값 가져오기
  password.current = watch("password");
  console.log(password.current)

  return (
    <Wrapper>
      <Title>회원가입</Title>
      <form className="registerWrapper" onSubmit={handleSubmit(onSubmit)}>
        <label>이메일</label>
        <input
          name="email"
          type="email"
          defaultValue=""
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        {/* errors will return when field validation fails  */}
        {errors.email && <span>이메일을 입력 하세요!</span>}

        <label>이름</label>
        <input name="name" {...register("name", { required: true })} />
        {errors.name && <span>이름을 입력 하세요!</span>}

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

        <label>비밀번호 확인</label>
        <input
          name="passwordConfirm"
          type="password"
          {...register("PasswordConfirm", {
            required: true,
            validate: (currentValue) => currentValue === password.current,
          })}
        />
        {errors.PasswordConfirm &&
          errors.PasswordConfirm.type === "required" && (
            <span>비밀번호를 한번 더 입력 하세요!</span>
          )}
        {errors.PasswordConfirm &&
          errors.PasswordConfirm.type === "validate" && (
            <span>비밀번호가 일치하지 않습니다!</span>
          )}

        <input value="회원가입하기" type="submit" />

        <Link to="/login" style={{ color: "#9999", textDecoration: "none" }}>
          로그인 하러가기
        </Link>
      </form>
    </Wrapper>
  );
}

export default RegisterPage;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 5rem;
`;

const Title = styled.h2``;
