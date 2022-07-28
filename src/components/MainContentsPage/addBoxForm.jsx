import React, { useEffect, useState } from "react";
import { useRef } from "react";
import styled from "styled-components";
import { loginState, memoState } from "../../atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../../Service/fbase";

const AddBox = styled.button`
  width: 2rem;
  height: 1.3rem;
  background-color: #8aba6c;
  border-radius: 1em;
  &:hover {
    background-color: #8c7ae6;
  }
  margin-bottom: 0.3em;
  margin-top: 0.3em;
  text-align: center;
  font-size: 0.7em;
  border: 0;
`;

const InputBox = styled.input`
  height: 3rem;
  border: 0px;
`;

const AddBoxForm = ({ name }) => {
  const [data, setData] = useState();
  const userInfo = useRecoilValue(loginState);
  useEffect(() => {
    const docs = doc(db, "0718", "cards");
    onSnapshot(docs, (snapshot) => {
      const nweetArray = snapshot.data();
      setData(nweetArray.AllBoard);
    });
  }, []);


  const inputRef = useRef();
  const onAddCard = (event) => {
    event.preventDefault();
    const dataCopy = JSON.parse(JSON.stringify(data));
    const onAddFn = () => {
      const newMemo = JSON.parse(JSON.stringify(dataCopy));
      newMemo.map((item) => {
        if (Object.keys(item).toString() == name) {
          return item[name].push({
            id: Date.now().toString(),
            color: "#8c7ae6",
            title: inputRef.current.value,
            contents: "",
            comments: [],
            uid: userInfo.uid,
            userName:userInfo.userName,
            photoURL:userInfo.photoURL
          });
        } else return item;
      });
      inputRef.current.value = "";
      return setDoc(doc(db, "0718", "cards"), {
        AllBoard: [...newMemo],
      });
    };
    if (!inputRef.current.value) return;
    else {
      onAddFn();
    }
  };

  return (
    <form
      onSubmit={onAddCard}
      style={{
        backgroundColor: "#C6C2C2",
        padding: "5px 5px 1px 5px",
        textAlign: "right",
      }}
    >
      <InputBox
        ref={inputRef}
        placeholder="create a memo"
        style={{ width: "100%" }}
      ></InputBox>
      <AddBox onClick={onAddCard}>Add</AddBox>
    </form>
  );
};

export default AddBoxForm;
