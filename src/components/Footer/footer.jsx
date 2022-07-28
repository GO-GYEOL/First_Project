import styled from "styled-components";
import { useRecoilState } from "recoil";
import { memoState } from "../../atoms";
import React, { useEffect, useState } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../../Service/fbase";

const Bar = styled.div`
  margin-top: 1rem;
  justify-content: center;
  display: flex;
  button {
    &:nth-child(1) {
      background-color: rgba(255, 255, 255, 0.3);
      color: white;
      border-radius: 0.5rem;
      padding: 0.2rem 2.5rem 0.2rem 2.5rem;
      border: 0px;
      margin-right: 0.5rem;
    }
    &:nth-child(n + 2) {
      background-color: rgba(255, 255, 255, 0.3);
      color: white;
      border-radius: 0.5rem;
      padding: 0.2rem;
      border: 0px;
      margin-right: 0.5rem;
    }
    &:hover {
      background-color: rgba(255, 255, 255, 0.5);
    }
  }
`;

const Footer = () => {
  // const [memo, setMemo] = useRecoilState(memoState);
  const [data, setData] = useState();
  useEffect(() => {
    const docs = doc(db, "0718", "cards");
    onSnapshot(docs, (snapshot) => {
      const nweetArray = snapshot.data();
      setData(nweetArray.AllBoard);
    });
  }, []);

  // 보드 추가기능
  const AddBoardFn = () => {
    const dataCopy = [...data];
    dataCopy.push({
      [`new Memo${Date.now().toString().substring(9, 12)}`]: [],
    });
    setDoc(doc(db, "0718", "cards"), {
      AllBoard: [...dataCopy],
    });
  };

  // 보드 추가기능
  const onAdd = (event) => {
    AddBoardFn();
  };

  return (
    <Bar>
      <button>게스트용보드</button>
      <button
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          padding: "5px 10px 5px 10px",
        }}
        onClick={onAdd}
      >
        +
      </button>
      {/* <button style={{padding:"10px"}}>...</button> */}
    </Bar>
  );
};

export default Footer;
