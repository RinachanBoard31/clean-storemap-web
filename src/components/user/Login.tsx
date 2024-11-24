import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AppTitle } from "../AppTitle";
import { EarthVideo } from "../EarthVideo"; // 動画ファイルをインポート
import UserForm from "./UserForm";
import { useLogin } from "../../hooks/user/useLogin";
import { userValidate } from "../../hooks/user/useValidationUser";
import { useSession } from "../../hooks/user/useSession";
import { UserLoginType } from "../../types/user";
import "../../css/user/Login.css";

export const Login = () => {
  const { triggerLogin, userId, errorLogin, resetLogin } = useLogin();
  const { createSession } = useSession();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState<Record<string, string>>({}); // errorMessageはフロント、バックエンドでのエラーが共に入る
  const navigate = useNavigate();

  useEffect(() => {
    if (errorLogin) {
      // 本来であればsetErrorMessage(`${errorLogin}`)とするが、フロントに500番のエラーしか返ってこないので、直接エラーメッセージを入れる
      setErrorMessage({ email: "Emailが登録されていません" });
      console.log(errorMessage);
    }
  }, [errorLogin]);

  useEffect(() => {
    if (!errorLogin && userId) {
      createSession(userId);
      navigate("/home");
    }
  }, [userId]);

  async function handleLogin() {
    const user: UserLoginType = {
      email: email,
    };
    const err = userValidate(user);
    setErrorMessage(err);
    if (Object.keys(err).length != 0) {
      return;
    }
    resetLogin();
    await triggerLogin({ email: user.email });
  }

  return (
    <>
      {AppTitle()}
      <div className="login-area">
        {EarthVideo()}
        <div className="content-area">
          <div className="login-form">
            {UserForm.EmailFrom(errorMessage, setEmail)}
          </div>
          {/* エラーの表示 */}
          {Object.keys(errorMessage).includes("email") && (
            <>
              <span className="errorMessage">{errorMessage["email"]}</span>
              <br />
            </>
          )}
          <button onClick={handleLogin} className="login-btn">
            ログイン
          </button>
          <a href="signup" className="signup-link">
            新規登録の方はこちら
          </a>
        </div>
      </div>
    </>
  );
};
