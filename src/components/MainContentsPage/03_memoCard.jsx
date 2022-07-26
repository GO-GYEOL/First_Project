import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import CardDetail from "./Card_Detail";
import { useNavigate } from "react-router-dom";

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
  const onCardDetail = () => {
    navigate(`/about/${boardIndex}/${board}/${index}`, { state: card });
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
