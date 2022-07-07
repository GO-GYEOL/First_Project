import { atom } from "recoil";

export const memoState = atom({
  key: "memo",
  default: {
    to_do: {
      1: {
        id: "1",
        color: "pink",
        title: "저녁에 놀사람",
        contents: "이따 집앞 카페에서 모이자 6시!",
      },
      2: {
        id: "2",
        color: "red",
        title: "과제 마치기",
        contents: "세계사 교양 273쪽까지 읽고 레포트 제출하기",
      },
    },
    doing: {
      3: {
        id: "3",
        color: "pink",
        title: "운동하기",
        contents: "팔굽혀펴기 50회",
      },
    },
    done: {
      4: {
        id: "4",
        color: "yellow",
        title: "영어과제하기",
        contents: "기본회화 30개 암기!",
      },
    },
  },
});
