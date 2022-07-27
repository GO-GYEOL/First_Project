// atom에 파이어베이스를 통해 카드 정보들을 가져오는게 좋을듯.
// 컬렉션은

import { async } from "@firebase/util";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { atom } from "recoil";
import { db } from "./Service/fbase";
import { GetMemos } from "./Service/memo_repository";

// export const memoStates = atom({
//   key:"memo",
//   default: GetMemos(),
// })


export const memoState = atom({
  key: "memo",
  default: [
    {
      to_do: [
        {
          id: "1asd",
          color: "pink",
          title: "저녁에 놀사람",
          contents: "이따 집앞 카페에서 모이자 6시!",
          comments: [
            { user: "결이", text: "안녕?" },
          ],
        },
        {
          id: "2dd",
          color: "red",
          title: "과제 마치기",
          contents: "세계사 교양 273쪽까지 읽고 레포트 제출하기",
          comments: [
            { user: "결이", text: "안녕?" },
            { user: "렌고쿠", text: "안녕?" },
          ],
        },
        {
          id: "3qwed",
          color: "pink",
          title: "밤에 놀사람",
          contents: "이따 집앞 카페에서 모이자 6시!",
          comments: [
            { user: "결이", text: "안녕?" },
            { user: "렌고쿠", text: "안녕?" },
          ],
        },
      ],
    },
    {
      doing: [
        {
          id: "4av",
          color: "pink",
          title: "운동하기",
          contents: "팔굽혀펴기 50회",
          comments: [
            { user: "결이", text: "안녕?", id: "13d" },
            { user: "렌고쿠", text: "안녕?", id: Date.now().toString() },
          ],
        },
      ],
    },
    {
      done: [
        {
          id: "5azx",
          color: "yellow",
          title: "영어과제하기",
          contents: "기본회화 30개 암기!",
          comments: [
            { user: "결이", text: "안녕?" },
            { user: "렌고쿠", text: "안녕?" },
          ],
        },
      ],
    },
  ],
});

// dnd는 순서 개념이 존재해야한다. 하지만 obj는 순서 개념이 없다. 인덱스(순서)가 있어야 드래그를 하여 화면상에 보여지는 순서를 조정할 수 있는데, obj는 없으므로 memo가 배열의 형태로 써져야한다. 근데 그러면 columns(todo,doing,done) 이름 설정이 불가능한데?

// 형식 이렇게 바꿔줘야하나?
// 오 새로운거 배웠다. 배열방식

export const loginState = atom({
  key: "login",
  default: {
    // userName: null,
    // photoURL: null,
    // uid: null,
  },
});

// 일단 그냥 useRecoilState만 쓰자.

