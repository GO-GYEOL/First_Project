import React from "react";
import styled from "styled-components";
import User from "./User/user";

const Navbar = styled.div`
  width: 100%;
  background-color: rgba(255,255,255,1);
  display:flex;
  justify-content: space-between;
  height:2em;
  &:first-child{
    justify-content: center;
  }
  position:relative;
`;

const Logo = styled.div`
  font-size: 2em;
`;

const NavigationBar = (props) => {
  return (
    <Navbar>
      
      <Logo>Grello</Logo>
      <User/>
    </Navbar>
  );
};

export default NavigationBar;
