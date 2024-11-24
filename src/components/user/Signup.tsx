import { AppTitle } from "../AppTitle";
import { EarthVideo } from "../EarthVideo"; // 動画ファイルをインポート
import { useSignupUser } from "../../hooks/user/useSignup";
import "../../css/user/Signup.css";

export const Signup = () => {
  function handleSignup() {
    useSignupUser();
  }

  return (
    <>
      {AppTitle()}
      <div className="signup-area">
        {EarthVideo()}
        <div className="signup-area-button">
          <button onClick={handleSignup} className="signup-btn">
            Googleでサインアップする
          </button>
          <br />
          <a href="login" className="login-link">
            ログインの方はこちら
          </a>
        </div>
      </div>
    </>
  );
};
