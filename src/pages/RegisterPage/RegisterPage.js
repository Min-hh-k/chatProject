import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import "./Register.css";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { appAuth } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import md5 from "md5";
import { getDatabase, ref, set } from "firebase/database";

function RegisterPage() {
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

  // 데이터베이스 가져오기
  const database = getDatabase();

  //! 파이어베이스 회원가입
  const onSubmit = async (data) => {
    // data 에 입력 값 [이메일,네임,비번,비번확인] 들어 있음
    // console.log(data);

    try {
      // 파이어베이스 가입
      setLoading(true);
      const register = await createUserWithEmailAndPassword(
        appAuth,
        data.email,
        data.password
      );

      console.log(register);

      // 파이어베이스 유저정보 업데이트 {displayName : 가입 이름, photoURL : md5(유니크한 값,email로 구분),그라바타 이용한 랜덤 이미지 포토}
      await updateProfile(appAuth.currentUser, {
        displayName: data.name,
        photoURL: `https://www.gravatar.com/avatar/${md5(
          register.user.email
        )}?d=monsterid`,
      });

      // 파이어베이스 데이터베이스 저장
      // 테이블 users / 값 uid 고유값id >> {키:값} 정보들

      set(ref(database, `users/${register.user.uid}`), {
        username: register.user.displayName,
        email: register.user.email,
        profile_picture: register.user.photoURL,
      });

      setLoading(false);
    } catch (error) {
      setErrorForm(error.message);
      // console.log(error);
      setLoading(false);
      setTimeout(() => {
        setErrorForm("");
      }, 3000);
    }
  };

  // console.log(watch("email"));

  // 패스워드 입력 값
  const password = useRef();

  // watch 사용해서 패스워드 값 가져오기
  password.current = watch("password");
  // console.log(password.current);

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

        {errorForm && <span>{errorForm}</span>}

        <input value="회원가입하기" type="submit" disabled={loading} />

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
