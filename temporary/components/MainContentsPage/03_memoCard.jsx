import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import CardDetail from "./Card_Detail";
import { useNavigate } from "react-router-dom";

const Card = styled.div`
  width: 100%;
  background-color: #fff;
`;

const MemoCard = ({ card, index, board, boardIndex }) => {
  const navigate = useNavigate();
  const onCardDetail = () => {
    navigate(`/about/${boardIndex}/${board}/${index}`);
  };
  return (
    <Draggable key={card.id} draggableId={card.id} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {card.title}
          <button onClick={() => onCardDetail()}>edit</button>
        </Card>
      )}
    </Draggable>
  );
};

export default MemoCard;
