import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Home from "../../Routes/Home";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { memoState } from "../../atoms";

// 얘는 리액트 라우터 돔으로 만들 것이다. card에서 edit버튼 클릭 시 링크 이쪽으로 이동하도록. 다만 이전의 페이지도 보여야한다. 팝업형태로 띄울 것임.

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
`;

const Wrapper = styled.div`
  width: 30em;
  height: 30em;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  position: absolute;
  padding: 15px 25px 10px 25px;
  z-index: 1;
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
  padding: 5px 10px 10px 10px;
  font-size: 13px;
`;
const TextArea = styled.textarea`
  width: 100%;
  height: 10em;
  resize: none;
  border: 0px;
  background-color: #eeeded;
  box-shadow: 0px 3px 10px 1px rgba(0, 0, 0, 0.3);
  outline: none;
  margin-top: 0.5em;
  font-size: 11px;
  padding: 10px;
`;

const CommentBox = styled.div`
  margin-top: 10px;
  display: flex;
`;
const CommentSmallBox = styled.div`
  width: 100%;
  background-color: #d9d9d9;
  text-align: right;
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
  font-size: 10px;
  text-align: center;
  line-height: 1rem;
  border-radius: 2em;
  margin: 5px;
  border: 0;
`;
const IconBox = styled.div`
  width: 1.5em;
  height: 1.5em;
  background-color: pink;
  margin-right: 1em;
`;
const Icon = styled.div``;

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
  padding: 0.5rem;
  box-sizing: border-box;
  border-radius: 10px;
`;

const CardDetail = (props) => {
  const { boardIndex, boardName, cardIndex } = useParams();
  const [memo, setMemo] = useRecoilState(memoState);
  const navigate = useNavigate();
  const onClick = () => {
    navigate(-1);
  };
  const card = memo[boardIndex][boardName][cardIndex];

  return (
    <div>
      <Overlay onClick={onClick}></Overlay>
      <Wrapper>
        <Color color={card.color} />
        <div>
          <TitleBox>
            <TitleName>Card Title</TitleName>
            <ul
              style={{ fontSize: "13px", display: "flex", marginTop: "15px" }}
            >
              <li>2022-07-13</li>
              <li>To_Do</li>
            </ul>
          </TitleBox>
          <Title>{card.title}</Title>
          <TitleName>Description</TitleName>
          <TextArea
            spellCheck="false"
            placeholder="Write down text here"
            defaultValue={card.contents}
          ></TextArea>
          <TitleName>Comments</TitleName>
          <CommentBox>
            <IconBox>
              <Icon />
            </IconBox>
            <CommentSmallBox>
              <CommentDown placeholder="Write a comment here"></CommentDown>
              <AddBtn>add</AddBtn>
            </CommentSmallBox>
          </CommentBox>
          {card.comments.map((comment) => {
            return (
              <div key={comment.id}>
                <Comments>
                  <Comment>
                    <IconBox>
                      <Icon />
                      {comment.user}
                    </IconBox>
                    <CommentText>
                      <div>{comment.text}</div>
                    </CommentText>
                  </Comment>
                </Comments>
              </div>
            );
          })}
        </div>
      </Wrapper>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default CardDetail;
