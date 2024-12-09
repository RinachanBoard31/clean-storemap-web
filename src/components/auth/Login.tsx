import { AppTitle } from "../AppTitle";
import { EarthVideo } from "../EarthVideo"; // 動画ファイルをインポート
import { useLogin } from "../../hooks/auth/useLogin";
import "../../css/auth/auth.css";

export const Login = () => {
  function handleLogin() {
    useLogin();
  }
  return (
    <>
      {AppTitle()}
      <div className="contents-area">
        {EarthVideo()}
        <div className="action-contents">
          <button onClick={handleLogin}>ログイン</button>
          <br />
          <a href="signup">新規登録の方はこちら</a>
        </div>
      </div>
    </>
  );
};
