import React, { useEffect, useState } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../../Service/fbase";
import styled from "styled-components";
import { useParams, useLocation } from "react-router-dom";
import Home from "../../Routes/Home";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginState, memoState } from "../../atoms";
import { useRef } from "react";

// 얘는 리액트 라우터 돔으로 만들 것이다. card에서 edit버튼 클릭 시 링크 이쪽으로 이동하도록. 다만 이전의 페이지도 보여야한다. 팝업형태로 띄울 것임.

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
`;

const Wrapper = styled.div`
  width: 40em;
  height: 35em;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  position: absolute;
  padding: 25px 35px 20px 35px;
  z-index: 1;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    height: 10%; 
    background: #919295; 
  }
  &::-webkit-scrollbar-track {
    background: rgba(33, 122, 244, 0.1); 
  }
`;

const DeleteBtn = styled.button`
  margin-left: 1rem;
  font-size: 1.1rem;
  border: 0px;
  padding: 0.2rem;
  &:hover {
    background-color: #e56c6c6d;
  }
`;

const Color = styled.div`
  width: 100%;
  height: 0.5em;
  background-color: ${(props) => props.color};
  position: absolute;
  left: 0;
  top: 0;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TitleName = styled.div`
  font-weight: bold;
  border-bottom: 1px solid black;
  display: inline-block;
  margin-top: 15px;
`;
const Title = styled.div`
  padding: 15px;
  font-size: 23px;
`;
const TextArea = styled.textarea`
  width: 100%;
  height: 9em;
  font: inherit;
  resize: none;
  border: 0px;
  border-radius: 0.5em;
  background-color: #eeeded;
  box-shadow: 0px 3px 10px 1px rgba(0, 0, 0, 0.3);
  outline: none;
  margin-top: 1.5em;
  font-size: 11px;
  padding: 10px;
`;

const ContentsBtn = styled.button`
  border: 0px;
  background-color: transparent;
  display: inline-block;
  &:hover {
    background-color: lightgray;
  }
  margin-top: 3px;
`;

const CommentBox = styled.div`
  margin-top: 1.5em;
  display: flex;
`;
const CommentSmallBox = styled.div`
  width: 100%;
  background-color: #d9d9d9;
  text-align: right;
  border-radius: 0.3em;
  &:hover {
    background-color: lightgray;
  }
`;
const CommentDown = styled.input`
  width: 97%;
  outline: none;
  border: 0;
  font-size: 11px;
  padding: 5px;
  margin-top: 5px;
  margin-right: 5px;
`;
const AddBtn = styled.button`
  width: 2.3rem;
  height: 1.3rem;
  background-color: #8aba6c;
  color: ligthblue;
  font-size: 10px;
  text-align: center;
  line-height: 1rem;
  border-radius: 2em;
  margin: 5px;
  border: 0;
  &:hover {
    background-color: #0097e6;
  }
`;
const IconBox = styled.div`
  width: 1.5em;
  height: 1.5em;
  margin-right: 1em;
`;
const Icon = styled.img`
  height: 25px;
  border-radius: 12.5px;
`;

const Comments = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const Comment = styled.div`
  display: flex;
  align-items: center;
`;

const CommentText = styled.div`
  height: 1.3rem;
  background-color: #d9d9d9;
  font-size: 11px;
  padding: 0.8rem;
  box-sizing: border-box;
  border-radius: 0.3rem;
  line-height: 3px;
  &:hover {
    background-color: #c23616;
    color: white;
  }
`;

const CardDetail = () => {
  const contentRef = useRef();
  const inputRef = useRef();
  const { boardIndex, boardName, cardIndex } = useParams();
  const location = useLocation();
  const card = location.state;
  const [data, setData] = useState();
  const userInfo = useRecoilValue(loginState);
  const comments = data
    ? data[boardIndex][boardName][cardIndex]["comments"]
    : null;
  // 댓글은 navigate를 통해 props를 전달받게되는데, 이 location의 props의 댓글을 추가해도 리액트에서 변화를 인지하지 못하고 리렌더링 안한다. 그래서 새로고침해서 전체가 리렌더링 돼야만 변화가 적용돼서 나온다. 왜냐면 navigate를 통해 location이 전달받은 props는 객체(card정보이므로)이므로 참조형인데, 참조형은 수정해도 레퍼런스가 동일하기 때문에 리액트에서 변화로 인지하지 못하여 useState를 이용해왔기 때문이다.
  // 방법1 comments는 data라는 state가 setData로 변경되었으므로 data는 변했다고 처리되고, 그렇기에 data를 받는 comments도 정보가 새로고침된다. 그래서 화면에 변화가 바로 표시된다.
  // 방법 2 이것을 해결하기 위해 location이 navigate로 전달받은 state를 useState로 저장해서 아래 return에 뿌려주던가 하면 될 것이다. 그러면 실시간으로 댓글 추가되어도 바로 변화가 생길 수 있다. 그러나 이렇게 따로 전달받은 state를 이용해 useState로 저장하면, 당연히 파이어베이스와 연동되는게 아니므로 서버에 데이터 업로드되지 않는다. 그래서
  // 아 이거 아니네, 걍 가져온 props로 화면에 뿌려놓고 파이어클라우드 수정을 했는데 뿌리는건 props니 당연히 변동이 없지!!!!
  // 걍 바뀔 필요가 없는 애들은 location으로 가져오고, 필요가 있는 애들은 서버에서 직접 가져온거임.

  useEffect(() => {
    const docs = doc(db, "0718", "cards");
    onSnapshot(docs, (snapshot) => {
      const nweetArray = snapshot.data();
      setData(nweetArray.AllBoard);
    });
  }, []);

  const navigate = useNavigate();
  const onClick = () => {
    navigate(-1);
  };

  // 컨텐츠 수정
  const onContentSubmit = (event) => {
    event.preventDefault();
    const dataCopy = [...data];
    const selectedCard = dataCopy[boardIndex][boardName][cardIndex];
    if (selectedCard["uid"] === userInfo.uid) {
      selectedCard["contents"] = contentRef.current.value;
      setDoc(doc(db, "0718", "cards"), {
        AllBoard: [...dataCopy],
      });
      window.alert("수정완료");
    } else {
      window.alert("글쓴이 이외 수정이 불가합니다.");
    }
  };

  // 댓글 추가
  const onCommentSubmit = (event) => {
    event.preventDefault();
    const dataCopy = [...data];
    dataCopy[boardIndex][boardName][cardIndex]["comments"].push({
      user: userInfo.userName,
      profile: userInfo.photoURL,
      text: inputRef.current.value,
      uid: userInfo.uid,
    });
    setDoc(doc(db, "0718", "cards"), {
      AllBoard: [...dataCopy],
    });
    inputRef.current.value = "";
  };

  // 댓글삭제
  const onCommentDelete = (event) => {
    let dataCopy = [...data];
    let comments = dataCopy[boardIndex][boardName][cardIndex]["comments"];
    // <-- 데이터의 하위배열요소를 따로 변수 저장하면 새로운 ref에 복사가 되나봄. comments 바꾼다고 dataCopy의 하위배열이 바뀌지 않는다.
    const innerText = event.target.innerText;
    const ok = window.confirm("해당 댓글을 지우시겠습니까?");
    if (ok) {
      const a = comments.filter(
        (item) => item.uid !== userInfo.uid || item.text !== innerText
      );
      const JsonA = JSON.stringify(a);
      const JsonComments = JSON.stringify(comments);
      if (JsonA == JsonComments) {
        // 참조형변수는 메모리의 주소가 같냐를 따지기 때문에 객체의 value를 비교하고 싶다면 기본형변수로 만들고 비교해주는 것이 좋다.
        console.log(a);
        console.log(comments);
        window.alert("댓글 작성자만 삭제가 가능합니다.");
      } else {
        dataCopy[boardIndex][boardName][cardIndex]["comments"] = a;
        setDoc(doc(db, "0718", "cards"), {
          AllBoard: [...dataCopy],
        });
      }
    }
  };

  // 카드삭제
  const onCardDelete = () => {
    const dataCopy = [...data];
    const ok = window.confirm("삭제하시겠습니까?");
    if (ok) {
      dataCopy[boardIndex][boardName].splice(cardIndex, 1);
      setDoc(doc(db, "0718", "cards"), {
        AllBoard: [...dataCopy],
      });
      navigate(-1);
    }
  };

  return (
    <div>
      <Overlay onClick={onClick}></Overlay>
      <Wrapper>
        <Color color={card.color} />
        <div>
          <TitleName>Card Title</TitleName>
          <DeleteBtn onClick={onCardDelete}>🗑️</DeleteBtn>
          <Title>{card.title}</Title>
          <TitleName>Description</TitleName>
          <form onSubmit={onContentSubmit}>
            <TextArea
              spellCheck="false"
              placeholder="Write down text here"
              defaultValue={card.contents}
              ref={contentRef}
            ></TextArea>
            <div style={{ textAlign: "right" }}>
              <AddBtn onClick={onContentSubmit}>save</AddBtn>
            </div>
          </form>
          <TitleName>Comments</TitleName>
          <CommentBox>
            <IconBox>
              <Icon src={userInfo.photoURL} />
            </IconBox>
            <CommentSmallBox>
              <form onSubmit={onCommentSubmit}>
                <CommentDown
                  spellCheck={false}
                  ref={inputRef}
                  placeholder="Write a comment here"
                ></CommentDown>
                <AddBtn onClick={onCommentSubmit}>add</AddBtn>
              </form>
            </CommentSmallBox>
          </CommentBox>
          {comments
            ? comments.map((comment) => {
                return (
                  <div key={comment.id}>
                    <Comments>
                      <Comment>
                        <IconBox>
                          <Icon src={comment.profile} />
                        </IconBox>
                        <CommentText onClick={onCommentDelete}>
                          <div>{comment.text}</div>
                        </CommentText>
                      </Comment>
                    </Comments>
                  </div>
                );
              })
            : null}
        </div>
      </Wrapper>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default CardDetail;
