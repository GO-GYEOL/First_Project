import React, { useEffect, useState } from "react";
import { constSelector, useRecoilState } from "recoil";
import { memoState } from "../../atoms";
import Board from "./02_board";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../../Service/fbase";
import NavigationBar from "../Navigation_Bar/navigation_bar";
import Footer from "../Footer/footer";

/* 그냥 파베로 변동될때마다 가져오고, state로 저장한 뒤 화면에 뿌려준다. 
form button onsubmit시 그냥 adddoc, updatedoc, deletedoc 발생시킨다. 그럼 다시 파베 변동되고 저절로 state로 저장되고 화면에 뿌려진다. */
// 나는 여기 로직 다 바꾸기 번거로우니까, 파이어베이스로 변동될때마다 가져오고, state로 저장한 뒤 화면에 뿌려주고, 변동되는 정보는 mainContentsPage에서 다 취합해서 setDoc로 파베 덮어씌우자.

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const AllMemoBoard = styled.div`
  display: flex;
  background-color: #353b48;
  flex: 1;
  height: 100%;
  align-items: center;
  /* justify-content: center; */
  overflow-x: scroll;
  &::before,
  &::after {
    content: "";
    flex: 1;
  }
  &::-webkit-scrollbar {
    /* width: 8px;  */
    height:8px;
  }
  &::-webkit-scrollbar-thumb {
    height: 10%; /* 스크롤바의 길이 */
    background: #919295; /* 스크롤바의 색상 */
  }
  &::-webkit-scrollbar-track {
    background: rgba(33, 122, 244, 0.1); /*스크롤바 뒷 배경 색상*/
  }
`;

const MainContentsPage = (props) => {
  // const [memo, setMemo] = useRecoilState(memoState);
  const [data, setData] = useState();

  // addBoxForm 에도 얘 써줬다. 통합시켜줘야됨.
  useEffect(() => {
    const docs = doc(db, "0718", "cards");
    onSnapshot(docs, (snapshot) => {
      const nweetArray = snapshot.data();
      setData(nweetArray.AllBoard);
    });
  }, []);

  const onDragEnd = (props) => {
    console.log(props);
    const newMemo = JSON.parse(JSON.stringify(data));
    const { destination, draggableId, source, type } = props;
    const moveFn = () => {
      if (!destination) return [...newMemo];
      // 보드끼리 순서 바꿀 때
      if (source.droppableId === "AllBoard") {
        const memoCopy = [...newMemo];
        const sourceBoard = memoCopy[source.index];
        memoCopy.splice(source.index, 1);
        memoCopy.splice(destination.index, 0, sourceBoard);
        setDoc(doc(db, "0718", "cards"), {
          AllBoard: [...memoCopy],
        });
      }

      // 같은 보드 내부에서 카드 순서 바꿀 때
      if (
        source.droppableId !== "AllBoard" &&
        destination?.droppableId === source.droppableId
      ) {
        const memoCopy = [...newMemo];
        // filter와 map의 차이 여기서 볼 수 있다.
        const selectedBoardList = memoCopy.filter(
          (board, index) => Object.keys(board).toString() === source.droppableId
        );
        let selectedBoardObj = selectedBoardList[0];
        let sourceCards = selectedBoardObj[source.droppableId];
        const newSourceCards = [...sourceCards];
        newSourceCards.splice(source.index, 1);
        newSourceCards.splice(destination.index, 0, sourceCards[source.index]);
        selectedBoardObj = { [source.droppableId]: newSourceCards };
        const newMemoCopy = memoCopy.map((item) => {
          if (Object.keys(item).toString() == source.droppableId) {
            return selectedBoardObj;
          } else {
            return item;
          }
        });
        return setDoc(doc(db, "0718", "cards"), {
          AllBoard: [...newMemoCopy],
        });
      }
      // 나 자신, 어케 이런 접근방법을 생각해냈지. 천재인가.
      // if (!destination) return;

      if (destination.droppableId !== source.droppableId) {
        // 다른 보드끼리 카드순서 바꿀 때
        const memoCopy = [...newMemo];
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
        return setDoc(doc(db, "0718", "cards"), {
          AllBoard: [...newMemoCopy],
        });
      }
    };
    moveFn();
  };

  useEffect(() => {
    // const newData = [...data];
    // setDoc(doc(db, "0718", "cards"), {
    //   AllBoard: [newData],
    // });
    console.log(data);
  }, [data]);

  return (
    <div style={{ height: "100%" }}>
      <Wrapper>
        <NavigationBar />
        <Footer />
      </Wrapper>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="AllBoard" direction="horizontal" type="BOARD">
          {(provided) => (
            <AllMemoBoard ref={provided.innerRef} {...provided.droppableProps}>
              {data &&
                data.map((board, index) => {
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
