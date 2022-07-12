import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { memoState } from "../../atoms";
import Board from "./02_board";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const AllMemoBoard = styled.div`
  display: flex;
  background-color: #0097e6;
  flex: 1;
`;

const MainContentsPage = (props) => {
  const [memo, setMemo] = useRecoilState(memoState);
  const onDragEnd = (props) => {
    console.log(props);
    const { destination, draggableId, source, type } = props;
    setMemo((memo) => {
      if (!destination) return [...memo];
      // 보드끼리 순서 바꿀 때
      if (source.droppableId === "AllBoard") {
        const memoCopy = [...memo];
        const sourceBoard = memoCopy[source.index];
        memoCopy.splice(source.index, 1);
        memoCopy.splice(destination.index, 0, sourceBoard);
        return [...memoCopy];
      }

      // 같은 보드 내부에서 카드 순서 바꿀 때
      if (destination?.droppableId === source.droppableId) {
        const memoCopy = [...memo];
        const selectedBoardList = memoCopy.filter(
          (board, index) => Object.keys(board).toString() === source.droppableId
        );
        let selectedBoardObj = selectedBoardList[0];
        let sourceCards = selectedBoardObj[source.droppableId];
        const newSourceCards = [...sourceCards];
        newSourceCards.splice(source.index, 1);
        newSourceCards.splice(destination.index, 0, sourceCards[source.index]);
        sourceCards = newSourceCards;
        selectedBoardObj = { [source.droppableId]: sourceCards };
        const newMemoCopy = memoCopy.map((item) => {
          if (Object.keys(item).toString() == source.droppableId) {
            console.log("here!!");
            return selectedBoardObj;
          } else {
            return item;
          }
        });
        return [...newMemoCopy];
      }
      if (!destination) return;
      if (destination.droppableId !== source.droppableId) {
        // 다른 보드끼리 카드순서 바꿀 때
        const memoCopy = [...memo];
        const selectedBoardList = memoCopy.filter(
          (board, index) => Object.keys(board).toString() === source.droppableId
        );
        let selectedBoardObj = selectedBoardList[0];
        const sourceCards = selectedBoardObj[source.droppableId];
        const newSourceCards = [...sourceCards];
        newSourceCards.splice(source.index, 1);
        const sourceCard = sourceCards[source.index];
        selectedBoardObj = { [source.droppableId]: newSourceCards };

        const destinatedBoardList = memoCopy.filter(
          (board, index) =>
            Object.keys(board).toString() === destination.droppableId
        );
        let destinatedBoardObj = destinatedBoardList[0];
        const destinatedCards = destinatedBoardObj[destination.droppableId];
        const newDestinatedCards = [...destinatedCards];
        newDestinatedCards.splice(destination.index, 0, sourceCard);
        destinatedBoardObj = { [destination.droppableId]: newDestinatedCards };

        const newMemoCopy = memoCopy.map((item) => {
          if (Object.keys(item).toString() == source.droppableId) {
            console.log("here!!");
            return selectedBoardObj;
          }
          if (Object.keys(item).toString() == destination.droppableId) {
            return destinatedBoardObj;
          } else {
            return item;
          }
        });
        return [...newMemoCopy];
      }
    });
  };

  useEffect(() => {
    console.log(memo);
  }, [memo]);

  return (
    <div style={{ height:"100%"}}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="AllBoard" direction="horizontal" type="BOARD">
          {(provided) => (
            <AllMemoBoard ref={provided.innerRef} {...provided.droppableProps}>
              {memo.map((board, index) => {
                return (
                  <Board
                    key={Object.keys(board).toString()}
                    index={index}
                    board={board}
                  />
                );
              })}
              {provided.placeholder}
            </AllMemoBoard>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default MainContentsPage;
