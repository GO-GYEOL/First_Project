import { atom } from "recoil";

export const memoState = atom({
  key: "memo",
  default: {
    to_do: [
      {
        id: "1",
        color: "pink",
        title: "저녁에 놀사람",
        contents: "이따 집앞 카페에서 모이자 6시!"
      },
      {
        id: "2",
        color: "red",
        title: "과제 마치기",
        contents: "세계사 교양 273쪽까지 읽고 레포트 제출하기"
      }
    ],
    doing: [
      {
        id: "3",
        color: "pink",
        title: "운동하기",
        contents: "팔굽혀펴기 50회"
      }
    ],
    done: [
      {
        id: "4",
        color: "yellow",
        title: "영어과제하기",
        contents: "기본회화 30개 암기!"
      }
    ]
  }
});

// dnd는 순서 개념이 존재해야한다. 하지만 obj는 순서 개념이 없다. 인덱스(순서)가 있어야 드래그를 하여 화면상에 보여지는 순서를 조정할 수 있는데, obj는 없으므로 memo가 배열의 형태로 써져야한다. 근데 그러면 columns(todo,doing,done) 이름 설정이 불가능한데?