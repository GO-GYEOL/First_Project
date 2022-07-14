import React from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import MemoCard from "./03_memoCard";
import Headers from "./headers";
import AddBoxForm from "./addBoxForm";

const BoardBox = styled.div`
  min-width: 25em;
  min-height: 15em;
  background-color: #dcdde1;
  margin: 0.5em;
  padding: 0.5em;
  display: flex;
  flex-direction: column;
  font-size: 0.7em; ;
`;

const MemoCardArea = styled.div`
  padding: 0.5em;
  background-color: gray;
  height: 100%;
`;

const BoardContents = styled.div`
  width: 100%;
  padding: 10px;
  background-color: #fff;
  border-radius: 0.8em;
  font-size: 0.8em;
  box-sizing: border-box;
  margin-bottom: 0.5em;
`;

const Board = ({ index, board }) => {
  const name = Object.keys(board).toString();
  const boardIndex = index;

  return (
    <Draggable draggableId={name} index={index}>
      {(provided, snapshot) => (
        <BoardBox
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Headers name={name} provided={provided} />
          <Droppable droppableId={name} direction="vertical" type="CARD">
            {(provided) => (
              <MemoCardArea
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <AddBoxForm name={name} />
                {board[name].map((card, index) => (
                  <MemoCard
                    key={card.id}
                    index={index}
                    card={card}
                    board={Object.keys(board).toString()}
                    boardIndex={boardIndex}
                  />
                ))}
                {provided.placeholder}
              </MemoCardArea>
            )}
          </Droppable>
        </BoardBox>
      )}
    </Draggable>
  );
};

export default Board;
