import { AppTitle } from "../AppTitle";
import { EarthVideo } from "../EarthVideo"; // 動画ファイルをインポート
import { useLogin } from "../../hooks/auth/useLogin";
import "../../css/auth/auth.css";
import { ErrorMessage } from "../common/ErrorMessage.tsx";

export const Login = () => {
  const query = new URLSearchParams(window.location.search);
  const error = query.get("error") ? "登録してください。" : "";
  function handleLogin() {
    useLogin();
  }
  return (
    <>
      {AppTitle()}
      <div className="contents-area">
        {EarthVideo()}
        <div className="action-contents">
          {error && (
            <div className="error">
              <ErrorMessage message={error} />
            </div>
          )}
          <button onClick={handleLogin}>ログイン</button>
          <br />
          <a href="signup">新規登録の方はこちら</a>
        </div>
      </div>
    </>
  );
};
