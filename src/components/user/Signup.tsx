import { AppTitle } from "../AppTitle";
import { EarthVideo } from "../EarthVideo"; // 動画ファイルをインポート
import { signupUser } from "../../hooks/user/useSignup";
import "../../css/user/Signup.css";

export const Signup = () => {
  function handleSignup() {
    signupUser();
  }

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
