import React from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  signOut,
} from "firebase/auth";
import { firebaseApp } from "../Service/fbase";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { loginState } from "../atoms";
import styled from "styled-components";
import { useState } from "react";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginBox = styled.div`
  width: 30rem;
  height: 20rem;
  background-color: pink;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LogIn = (props) => {
  const navigate = useNavigate();
  // const setLogInfo = useSetRecoilState(loginState);

  const onLoginClick = (name) => {
    const GoToHome = (props) => {
      const userInfo = {
        userName: props.user.displayName,
        photoURL: props.user.photoURL,
        uid: props.user.uid,
      };
      navigate("/");
    };
    const auth = getAuth();
    const GoogleProvider = new GoogleAuthProvider();
    const GithubProvider = new GithubAuthProvider();
    if (name == "Google") {
      signInWithPopup(auth, GoogleProvider).then((result) => {
        GoToHome(result);
      });
    } else if (name == "Github") {
      signInWithPopup(auth, GithubProvider).then((result) => {
        GoToHome(result);
      });
    }
    // 이 함수 그대로 navigate로 전달 안되는거 같은데? auth도 전달 안됨. value로 그냥 변수만 전달 가능한 것 같다. 메서드 전달 안됨.
  };

  return (
    <Wrapper>
      <LoginBox>
        <button onClick={() => onLoginClick("Google")}>
          Google로 로그인하기
        </button>
        <button onClick={() => onLoginClick("Github")}>
          Github로 로그인하기
        </button>
      </LoginBox>
    </Wrapper>
  );
};

export default LogIn;
