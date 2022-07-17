import React, { useState } from "react";
import { useRef } from "react";
import styled from "styled-components";
import { memoState } from "../../atoms";
import { useRecoilState } from "recoil";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Header = styled.div`
  padding: 0.5em;
  font-weight: bold;
`;

const Headers = ({ name, provided }) => {
  const inputRef = useRef();
  const [hide, setHide] = useState(true);
  const [memo, setMemo] = useRecoilState(memoState);
  const onClick = () => {
    setHide((prev) => !prev);
  };

  // board 이름변경기능
  const onSubmit = (event) => {
    event.preventDefault();
    const newName = inputRef.current.value;
    setHide((prev) => !prev);
    const newMemo = memo.map((prev) => {
      if (Object.keys(prev).toString() == name) {
        return { [`${newName}`]: Object.values(prev)[0] };
      } else return prev;
    });
    // 이 접근방법 계속 활용하게 된다.
    setMemo([...newMemo]);
  };

  // board 삭제기능
  const onDelete = (event) => {
    const newMemo = memo.filter((prev) => Object.keys(prev).toString() !== name);
    console.log(newMemo);
    setMemo([...newMemo]);
  };
  return (
    <Wrapper>
      {hide ? (
        <Header {...provided.dragHandleProps}>{name}</Header>
      ) : (
        <form onSubmit={onSubmit}>
          <input ref={inputRef}></input>
        </form>
      )}
      <div>
        <button onClick={onClick}>✏️</button>
        <button onClick={onDelete}>🗑️</button>
      </div>
    </Wrapper>
  );
};

export default Headers;
