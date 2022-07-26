import React from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { loginState } from "../../../atoms";
const LogIn_Info = styled.div`
  position:absolute;
  top:-2px;
  right:10px;
`;
const Icon = styled.img`
  /* width:100%; */
  height: 35px;
  border-radius: 50%;
  padding: 0.2em;
`;
const User = (props) => {
  const userInfo = useRecoilValue(loginState);
  console.log(userInfo)
  return (
    <LogIn_Info>
      <Icon src={userInfo.photoURL}></Icon>
    </LogIn_Info>
  );
};

export default User;
