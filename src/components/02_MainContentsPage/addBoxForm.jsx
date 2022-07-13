import React from "react";
import { useRef } from "react";
import styled from "styled-components";
import { memoState } from "../../atoms";
import { useRecoilState } from "recoil";

const AddBox = styled.div`
  width: 100%;
  height: 2em;
  background-color: #dcdde1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5em;
  &:hover {
    background-color: #8c7ae6;
  }
  cursor: pointer;
  margin-bottom: 0.3em;
`;

const AddBoxForm = ({ name }) => {
  const [memo, setMemo] = useRecoilState(memoState);
  const inputRef = useRef();
  const onAddCard = (event) => {
    event.preventDefault();
    if (!inputRef.current.value) return;
    else {
      setMemo((memo) => {
        // 아 이전에 footer에서 했던 방식대로 하면 안되는 이유! 전개연산자 사용해서 참조형 데이터 복사하는건 깊은 복사이지만 반쪽짜리 깊은 복사이다. 첫번째 층만 깊은 복사를 하고 그 다음층은 얕은복사를 한다. 그래서 footer에서는 첫번째 층만 건드리니 상관 없었으나, 여기선 card 즉 두번째 층까지 건드리니 전개연산자를 한번 더 써줘야한다.
        const newMemo = JSON.parse(JSON.stringify(memo));
        newMemo.map((item) => {
          if (Object.keys(item).toString() == name) {
            return item[name].push({
              id: Date.now().toString(),
              color: "white",
              title: inputRef.current.value,
              contents: "",
            });
          } else return item;
        });
        inputRef.current.value = "";
        return newMemo;
      });
    }
  };

  return (
    <form onSubmit={onAddCard}>
      <input
        ref={inputRef}
        placeholder="write to do"
        style={{ width: "100%" }}
      ></input>
      <AddBox onClick={onAddCard}>+ Add Card</AddBox>
    </form>
  );
};

export default AddBoxForm;
