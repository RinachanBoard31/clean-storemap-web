import "../../css/user/Signup.css";
import { useEffect } from "react";
import { signupUser } from "../../hooks/user/useSignup";
import { changeBoxShadowColor } from "../../hooks/user/useChangeBoxShadowColor";
import { EarthVideo } from "../EarthVideo"; // 動画ファイルをインポート

export const Signup = () => {
  function handleSignup() {
    signupUser();
  }
  // マウント後にchangeColorを呼び出す
  useEffect(() => {
    setInterval(() => changeBoxShadowColor("signup-area"), 30);
  }, []);

  return (
    <>
      <h1 className="title">
        <span>Welcome to </span>
        <span>Clean Storemap Web</span>
      </h1>
      <div className="signup-area">
        {EarthVideo()}
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
