import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AppTitle } from "../AppTitle";
import { EarthVideo } from "../EarthVideo"; // 動画ファイルをインポート
import UserForm from "../user/UserForm";
import { loginUser } from "../../hooks/auth/useLogin";
import { userValidate } from "../../hooks/user/useValidationUser";
import { UserLoginType } from "../../types/user";
import "../../css/auth/Login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const { triggerLogin, errorLogin, resetLogin } = loginUser();
  const [errorMessage, setErrorMessage] = useState<Record<string, string>>({}); // errorMessageはフロント、バックエンドでのエラーが共に入る
  const navigate = useNavigate();

  useEffect(() => {
    if (errorLogin) {
      // 本来であればsetErrorMessage(`${errorLogin}`)とするが、フロントに500番のエラーしか返ってこないので、直接エラーメッセージを入れる
      setErrorMessage({ email: "Emailが登録されていません" });
    }
  }, [errorLogin]);

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
    if (errorLogin) return;
    navigate("/home");
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
