import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseApp } from "../Service/fbase";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { loginState } from "../atoms";

const LogIn = (props) => {
  const navigate = useNavigate();
  const setLogInfo = useSetRecoilState(loginState);
  const onLoginClick = () => {
    const GoToHome = (props) => {
      navigate("/");
      setLogInfo({
        userName: props.user.displayName,
        photoURL: props.user.photoURL,
        uid: props.user.uid,
      });
    };

    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        GoToHome(result);
        console.log(result);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div>
      <button onClick={onLoginClick}>Google로 로그인하기</button>
    </div>
  );
};

export default LogIn;
