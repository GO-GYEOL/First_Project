import React from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Board = styled.div`
  width: 20em;
  min-height: 15em;
  background-color: #dcdde1;
  margin: 0.5em;
  padding: 0.5em;
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

const MemoBoard = (props) => {
  return (
    <Board>
        <div style={{ padding: "0.5em", fontWeight: "bold" }}>
          {props.boardName}
        </div>
        <div>
          {props.boardContents.map((item) => (
            <BoardContents key={item.id}>{item.title}</BoardContents>
          ))}
        </div>
    </Board>
  );
};

export default MemoBoard;
