import React from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import MemoCard from "./03_memoCard";

const BoardBox = styled.div`
  width: 20em;
  min-height: 15em;
  background-color: #dcdde1;
  margin: 0.5em;
  padding: 0.5em;
  display:flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding: 0.5em;
  font-weight: bold;
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

const Board = ({ index, name, column }) => {
  return (
    <Draggable draggableId={name} index={index}>
      {(provided, snapshot) => (
        <BoardBox ref={provided.innerRef} {...provided.draggableProps}>
          <Header {...provided.dragHandleProps}>{name}</Header>
          <Droppable droppableId={name} direction="vertical" type="CARD">
            {(provided) => (
              <MemoCardArea
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {column.map((memo, index) => (
                  <MemoCard key={memo.id} index={index} memo={memo} ></MemoCard>
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
