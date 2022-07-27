import { Route, Routes } from "react-router-dom";
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
  useEffect(() => {
    const auth = getAuth();
    // onAuthStateChanged 사용했다. user 정보 바뀔때마다 또는 처음에 정보 전달해준다. 
    onAuthStateChanged(auth, (user) =>
      setUserInfo({
        userName: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid,
      })
    );
  }, []);
  console.log(userInfo);

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
