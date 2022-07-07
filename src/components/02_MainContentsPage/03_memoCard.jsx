import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div`
  width: 100%;
  background-color: #fff;
`;

const MemoCard = ({ card, index }) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {card.title}
        </Card>
      )}
    </Draggable>
  );
};

export default MemoCard;
