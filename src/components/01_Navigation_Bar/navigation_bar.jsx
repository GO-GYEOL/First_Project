import React from "react";
import styled from "styled-components";
import Logout from "./Logout/logout";
import User from "./User/user";

const Navbar = styled.div`
  width: 100%;
  background-color: rgba(255,255,255,1);
  display:flex;
  justify-content: space-between;
`;

const Logo = styled.div`
  font-size: 2em;
`;

const NavigationBar = (props) => {
  return (
    <Navbar>
      <User/>
      <Logo>Trello</Logo>
      <Logout />
    </Navbar>
  );
};

export default NavigationBar;
