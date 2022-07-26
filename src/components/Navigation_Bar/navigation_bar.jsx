import React from "react";
import styled from "styled-components";
import User from "./User/user";

const Navbar = styled.div`
  width: 100%;
  background-color: rgba(220,221,225,0.52);
  display:flex;
  height:2.5em;
  &:first-child{
    justify-content: center;
  }
`;

const Logo = styled.div`
  font-size: 1.3em;
  color:white;
  font-weight:bold;
  line-height:2em;
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
