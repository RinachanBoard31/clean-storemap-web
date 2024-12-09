import { AppTitle } from "../AppTitle";
import { EarthVideo } from "../EarthVideo"; // 動画ファイルをインポート
import { useSignup } from "../../hooks/auth/useSignup";
import "../../css/auth/auth.css";

export const Signup = () => {
  function handleSignup() {
    useSignup();
  }

  return (
    <>
      {AppTitle()}
      <div className="contents-area">
        {EarthVideo()}
        <div className="action-contents">
          <button onClick={handleSignup}>Googleでサインアップする</button>
          <br />
          <a href="login">ログインの方はこちら</a>
        </div>
      </div>
    </>
  );
};
