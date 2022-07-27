import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import CardDetail from "./Card_Detail";
import { useNavigate, useLocation } from "react-router-dom";

const Card = styled.div`
  margin: 0 auto;
  width: 20.7em;
  background-color: #fff;
  margin-top: 5px;
  padding: 15px 5px 15px 5px;
  font-size: 0.7rem;
  text-align: center;
  &:hover{
    background-color: #dcdde1;
  }
`;

const MemoCard = ({ card, index, board, boardIndex }) => {
  const navigate = useNavigate();
  const {state} = useLocation();
  // const uid = state.uid;
  // const photoURL = state.photoURL;
  // const userName = state.userName;
  // 아 그런데 이렇게 해야되나, 이렇게하면 card detail에 얘네 전해주고, 댓글 쓸 때 얘네 추가해줘서 데이터 만들면 되긴 하는데 좀 멋이 안난다. recoil에서 유저정보 가져오면 편할 것 같은데.

  const onCardDetail = () => {
    navigate(`/about/${boardIndex}/${board}/${index}`, { state: {...card} });
  };
  return (
    <Draggable key={card.id} draggableId={card.id} index={index}>
      {(provided) => (
        <div>
          <Card
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={onCardDetail}
          >
            user
            <br />
            {card.title}
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default MemoCard;
