import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Routes/Home";
import CardDetail from "./components/MainPageContents/MemoCard__Detail";
import LogIn from "./Routes/Login";
import { useState } from "react";
import { loginState } from "./atoms";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  // 유저 정보
  const [userInfo, setUserInfo] = useRecoilState(loginState);
  const navigate = useNavigate();
  useEffect(() => {
    const auth = getAuth();
    // onAuthStateChanged 사용했다. user 정보 바뀔때마다 또는 처음에 정보 전달해준다.
    onAuthStateChanged(auth, (user) =>
      setUserInfo({
        userName: user.displayName ? user.displayName : "Guest",
        photoURL: user.photoURL
          ? user.photoURL
          : "https://www.letsgoholiday.my/Content/Images/Icons/icon-guest.svg",
        uid: user.uid,
      })
    );
  }, []);
  // 로그인 체크를 하는데 useEffect의 의존성배열[]을 [userInfo]로 하면 될 줄 알았는데, 이렇게 하면 계속 실행된다. 이유가 뭘까. userInfo가 setUserInfo로 계속 바뀌기 때문인가. 객체이지만 useState를 통해 바뀌었으므로, 아니 근데 값이 안바뀌었는데 왜 변화처리가 될까
console.log(userInfo)
  // useEffect(() => {}, [userInfo]);

  // 새로고침시 login 페이지로 가는 버그생김

  return (
    <Routes>
      <Route path="/login" element={<LogIn />}></Route>
      <Route path="/" element={<Home />} />
      <Route
        path="/about/:boardIndex/:boardName/:cardIndex/*"
        element={<CardDetail />}
      />
    </Routes>
  );
}

export default App;
