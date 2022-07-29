import { useRef } from "react";
import styled from "styled-components";
// import { memoState } from "../../atoms";
// import { useRecoilState } from "recoil";
import React, { useEffect, useState } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../../Service/fbase";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Header = styled.div`
  padding: 0.5em;
  font-weight: bold;
`;

const Input = styled.input`
  width: 7rem;
  padding-left: 10px;
  outline: 0px;
  border: 0px;
  border-radius: 3px;
  margin-bottom: 2px;
  margin-left: 1px;
`;

const Button = styled.button`
  border: 0;
  margin-right: 0.3rem;
  cursor: pointer;
  &:hover {
    background-color: lightgray;
  }
`;

const BoardHeaders = ({ name, provided }) => {
  const [data, setData] = useState();
  useEffect(() => {
    const docs = doc(db, "0718", "cards");
    onSnapshot(docs, (snapshot) => {
      const cloudData = snapshot.data();
      setData(cloudData.AllBoard);
    });
  }, []);

  const inputRef = useRef();
  const [hide, setHide] = useState(true);
  // const [memo, setMemo] = useRecoilState(memoState);
  const onClick = () => {
    setHide((prev) => !prev);
  };

  // board 이름변경기능
  const onSubmit = (event) => {
    const dataCopy = [...data];
    event.preventDefault();
    const newName = inputRef.current.value;

    // board 이름 중복체크(방법 고민좀 함)
    const overlapped = dataCopy.filter(
      (prev) => Object.keys(prev).toString() == newName
    );
    if (JSON.stringify(overlapped) == "[]") {
      // board 이름 변경 함수
      setHide((prev) => !prev);
      const newMemo = dataCopy.map((prev) => {
        if (Object.keys(prev).toString() == name) {
          return { [`${newName}`]: Object.values(prev)[0] };
          // Object.values(prev)는 배열을 가진 배열.
          // 속성명에다가는 [] 해줘야하나보다. 속성접근자처럼. 이거 모르면 시간낭비할듯.
          // 속성명이라서가 아니라, 고정값 아닌 텍스트는 이런식으로 처리해준다.
        } else return prev;
      });
      // 이 접근방법 계속 활용하게 된다.
      return setDoc(doc(db, "0718", "cards"), {
        AllBoard: [...newMemo],
      });
    } else {
      window.alert("동일한 이름의 보드가 존재합니다.");
    }
  };

  // board 삭제기능
  const onDelete = (event) => {
    const ok = window.confirm("해당 보드를 정말로 삭제하시겠습니까?");
    if (ok) {
      const dataCopy = [...data];
      const newMemo = dataCopy.filter(
        (prev) => Object.keys(prev).toString() !== name
      );
      return setDoc(doc(db, "0718", "cards"), {
        AllBoard: [...newMemo],
      });
    }
  };

  return (
    <Wrapper>
      {hide ? (
        <Header {...provided.dragHandleProps}>{name}</Header>
      ) : (
        <form onSubmit={onSubmit}>
          <Input placeholder="press the enter" ref={inputRef}></Input>
        </form>
      )}
      <div>
        <Button onClick={onClick}>✏️</Button>
        <Button onClick={onDelete}>🗑️</Button>
      </div>
    </Wrapper>
  );
};

export default BoardHeaders;
