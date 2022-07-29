import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import CardDetail from "./MemoCard__Detail";
import { useNavigate, useLocation } from "react-router-dom";

const Card = styled.div`
  margin: 0 auto;
  width: 20.7em;
  background-color: #fff;
  margin-top: 5px;
  padding: 15px 5px 15px 5px;
  font-size: 0.7rem;
  text-align: center;
  &:hover {
    background-color: #dcdde1;
  }
`;
const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 0.1rem;
  position: relative;
  top: -4px;
  border-radius: 10px;
  margin-bottom: 2px;
`;
const UserName = styled.div`
  font-size: 0.7rem;
`;
const MemoCard = ({ card, index, board, boardIndex }) => {
  const navigate = useNavigate();

  const onCardDetail = () => {
    navigate(`/about/${boardIndex}/${board}/${index}`, { state: { ...card } });
    // console.log(card);
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
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Icon src={card.photoURL}></Icon>
              <UserName>{card.userName}</UserName>
            </div>
            {card.title}
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default MemoCard;
