import React from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import MemoCard from "./03_memoCard";
import Headers from "./headers";
import AddBoxForm from "./addBoxForm";

const BoardBox = styled.div`
  min-width: 23em;
  min-height: 30em;
  background-color: white;
  /* margin: 0.5em; */
  padding: 0.5em;
  display: flex;
  flex-direction: column;
  font-size: 0.7em;
  margin-right: 2em;
  border-radius: 0.3em;
  box-shadow: 0px 3px 20px 1px rgba(0, 0, 0, 0.7);
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
          <div
            style={{ backgroundColor: "#D9D9D9", flex: "1", padding: "5px" }}
          >
            <Headers name={name} provided={provided} />
            <AddBoxForm name={name} />
            <Droppable droppableId={name} direction="vertical" type="CARD">
              {(provided) => (
                <div style={{display:"flex", flexDirection:"column", minHeight:"200px"}} ref={provided.innerRef} {...provided.droppableProps}>
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
                </div>
              )}
            </Droppable>
          </div>
        </BoardBox>
      )}
    </Draggable>
  );
};

export default Board;
