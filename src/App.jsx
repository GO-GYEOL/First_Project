import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Routes/Home";
import CardDetail from "./components/MainContentsPage/Card_Detail";
import LogIn from "./components/Login";
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
    console.log(userInfo);
  }, []);

  // 로그인 없이 home 접근 방지. navigate를 쓰려면
  // You should call navigate() in a React.useEffect(), not when your component is first rendered.
  useEffect(async() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, []);
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
