import { useEffect } from "react";
import { AppTitle } from "../AppTitle";
import { EarthVideo } from "../EarthVideo"; // 動画ファイルをインポート
import { signupUser } from "../../hooks/user/useSignup";
import { changeBoxShadowColor } from "../../hooks/user/useChangeBoxShadowColor";
import "../../css/user/Signup.css";

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
      {AppTitle()}
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
