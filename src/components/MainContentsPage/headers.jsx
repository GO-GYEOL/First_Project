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

const Button = styled.button`
border:0;
margin-right:0.3rem;
`

const Headers = ({ name, provided }) => {
  const [data, setData] = useState();
  useEffect(() => {
    const docs = doc(db, "0718", "cards");
    onSnapshot(docs, (snapshot) => {
      const nweetArray = snapshot.data();
      setData(nweetArray.AllBoard);
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
    setHide((prev) => !prev);
    const newMemo = dataCopy.map((prev) => {
      if (Object.keys(prev).toString() == name) {
        return { [`${newName}`]: Object.values(prev)[0] };
        // 속성명에다가는 [] 해줘야하나보다. 속성접근자처럼. 이거 모르면 시간낭비할듯.
      } else return prev;
    });
    // 이 접근방법 계속 활용하게 된다.
    return setDoc(doc(db, "0718", "cards"), {
      AllBoard: [...newMemo],
    });
  };

  // board 삭제기능
  const onDelete = (event) => {
    const dataCopy = [...data];
    const newMemo = dataCopy.filter(
      (prev) => Object.keys(prev).toString() !== name
    );
    return setDoc(doc(db, "0718", "cards"), {
      AllBoard: [...newMemo],
    });
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
        <Button onClick={onClick}>✏️</Button>
        <Button onClick={onDelete}>🗑️</Button>
      </div>
    </Wrapper>
  );
};

export default Headers;
