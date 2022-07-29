import React from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import MemoCard from "./MemoCard";
import BoardHeaders from "./Board__Header";
import BoardAddMemoCard from "./Board__AddMemoCard";

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

const DroppableCardBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    height: 10%;
    background: #919295;
  }
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
            <BoardHeaders name={name} provided={provided} />
            <BoardAddMemoCard name={name} />
            <Droppable droppableId={name} direction="vertical" type="CARD">
              {(provided) => (
                <DroppableCardBox
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  // 얘 스타일 컴포넌트로 바꾸고나서 경고 나온다. 기능에는 문제 없다.
                >
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
                </DroppableCardBox>
              )}
            </Droppable>
          </div>
        </BoardBox>
      )}
    </Draggable>
  );
};

export default Board;
