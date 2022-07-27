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
  right: 50px;
`;
const Icon = styled.img`
  /* width:100%; */
  height: 35px;
  border-radius: 50%;
  padding: 0.2em;
`;
const User = (props) => {
  const navigate = useNavigate();
  // 유저정보
  const userInfo = useRecoilValue(loginState)
  const onLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <LogIn_Info>
      <Icon src={userInfo ? userInfo.photoURL : null}></Icon>
      <button onClick={onLogout}>Logout</button>
    </LogIn_Info>
  );
};

export default User;
