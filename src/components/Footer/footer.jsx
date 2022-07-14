import React from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { memoState } from "../../atoms";

const Bar = styled.div`
  background-color: #fff;
  display: flex;
  justify-content: center;
`;
const Footer = () => {
  const [memo, setMemo] = useRecoilState(memoState);
  const onAdd = (event) => {
    // board 추가기능
    setMemo((memo) => {
      const memoCopy = [...memo];
      memoCopy.push({
        [`new Memo${Date.now().toString().substring(9, 12)}`]: [],
      });
      return [...memoCopy];
    });
  };
  return (
    <Bar>
      <button style={{ fontSize: "20px" }} onClick={onAdd}>
        📝
      </button>
    </Bar>
  );
};

export default Footer;
