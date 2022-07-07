import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { memoState } from "../../atoms";
import Board from "./02_board";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const AllMemoBoard = styled.div`
  display: flex;
  background-color: #0097e6;
  flex-wrap: wrap;
`;

const MainContentsPage = (props) => {
  const [memo, setMemo] = useRecoilState(memoState);
  const onDragEnd = (props) => {
    console.log(props);
    const { destination, draggableId, source } = props;
    setMemo((memo) => {
      const memoCopy = [...memo];
      const sourceBoard = memoCopy[source.index];
      const destinatedBoard = memoCopy[destination.index];
      memoCopy.splice(source.index, 1);
      memoCopy.splice(destination.index, 0, sourceBoard);
      return [...memoCopy];
    });
  };

  useEffect(() => {
    console.log(memo);
  }, [memo]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="AllBoard" direction="horizontal" type="BOARD">
        {(provided) => (
          <AllMemoBoard ref={provided.innerRef} {...provided.droppableProps}>
            {memo.map((board, index) => (
              <Board key={index} index={index} board={board} />
            ))}
            {provided.placeholder}
          </AllMemoBoard>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default MainContentsPage;
