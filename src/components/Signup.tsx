import "./Signup.css";
import { useEffect } from "react";
import { signupUser } from "../hooks/signupUser";
import { changeColor } from "../hooks/changeColor";
import videoSource from "../assets/earth.mp4"; // 動画ファイルをインポート

export const Signup = () => {
  function handleSignup() {
    signupUser();
  }
  // マウント後にchangeColorを呼び出す
  useEffect(() => {
    setInterval(() => changeColor("signup-area"), 30);
  }, []);

  return (
    <>
      <h1 className="title">
        <span>Welcome to </span>
        <span>Clean Storemap Web</span>
      </h1>
      <div className="signup-area">
        <video autoPlay muted loop className="video">
          <source src={videoSource} type="video/mp4" />
        </video>
        <div className="signup-area-button">
          <button onClick={handleSignup} id="signup-btn">
            Googleでサインアップする
          </button>
          <br />
          <a href="login" id="login-link">
            ログインの方はこちら
          </a>
        </div>
      </div>
    </>
  );
};
