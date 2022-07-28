import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { loginState } from "../../../atoms";
import { getAuth } from "firebase/auth";

const LogIn_Info = styled.div`
  position: absolute;
  top: 3px;
  right: 150px;
`;
const Icon = styled.img`
  height: 35px;
  width: 35px;
  border-radius: 50%;
  padding: 0.2em;
`;
const Logout = styled.button`
  background-color: transparent;
  color: white;
  border: 0px;
  font-size: 0.5rem;
  position: relative;
  bottom: 13px;
  &:hover {
    color: lightgray;
  }
`;
const User = (props) => {
  const navigate = useNavigate();
  // 유저정보
  const userInfo = useRecoilValue(loginState);
  const onLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("/login");
        console.log(userInfo);
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <LogIn_Info>
      <Icon src={userInfo ? userInfo.photoURL : null}></Icon>
      <Logout onClick={onLogout}>로그아웃</Logout>
    </LogIn_Info>
  );
};

export default User;
