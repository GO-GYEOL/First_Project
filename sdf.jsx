/* if (destination?.droppableId === source.droppableId) {
    let memoCopy = [...memo];
    let selectedBoardList = memoCopy.filter(
      (board, index) => Object.keys(board).toString() === source.droppableId
    );

    let selectedBoardObj = selectedBoardList[0];
    console.log(selectedBoardObj);
    let sourceCards = selectedBoardObj[source.droppableId];

    console.log(sourceCards);
    const newSourceCards = [...sourceCards];
    newSourceCards.splice(source.index, 1);
    newSourceCards.splice(destination, 0, sourceCards[source.index]);
    sourceCards = [...newSourceCards];

    const newMemos = memo.filter(
      (item) => Object.keys(item).toString() !== source.droppableId
    );
    const newEntire = [...newMemos, { [source.droppableId]: sourceCards }];
    return newEntire;
  }
});
}; */