import React from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  signOut,
  signInAnonymously,
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
  background-color: rgba(20, 20, 20, 0.1);
`;

const ContentsBox = styled.div`
  width: 20rem;
  height: 18rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
`;

const TitleBox = styled.div`
  width: 100%;
  height: 5rem;
  background-color: #353b48;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  line-height: 5rem;
  margin-bottom: 2rem;
`;

const LoginBox = styled.div`
  background-color: #d9d9d9;
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 2rem;
  margin: 0 auto;
  margin-bottom: 0.3rem;
  padding: 10px 50px 10px 50px;
  display: flex;
  cursor: pointer;
  &:hover {
    background-color: #487eb0;
    color: white;
  }
`;

const LogIn = (props) => {
  const navigate = useNavigate();
  // const setLogInfo = useSetRecoilState(loginState);

  const onLoginClick = (name) => {
    const GoToHome = (props) => {
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
    } else {
      signInAnonymously(auth).then((result) => {
        GoToHome(result);
      });
    }
  };

  return (
    <Wrapper>
      <ContentsBox>
        <TitleBox>Schedule share App</TitleBox>
        <LoginBox onClick={() => onLoginClick("Google")}>
          Google로 로그인하기
        </LoginBox>
        <LoginBox onClick={() => onLoginClick("Github")}>
          Github로 로그인하기
        </LoginBox>
        <LoginBox onClick={() => onLoginClick("Guest")}>
          익명으로 로그인하기
        </LoginBox>
      </ContentsBox>
    </Wrapper>
  );
};

export default LogIn;
