import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AppTitle } from "../AppTitle";
import { EarthVideo } from "../EarthVideo"; // 動画ファイルをインポート
import UserForm from "./UserForm";
import { loginUser } from "../../hooks/user/uselogin";
import userValidate from "../../hooks/user/useValidationUser";
import { useSession } from "../../hooks/user/useSession";
import { UserLoginType } from "../../types/user";
import "../../css/user/Login.css";

export const Login = () => {
  const { triggerLogin, userId, errorLogin, resetLogin } = loginUser();
  const { createSession } = useSession();
  const [email, setEmail] = useState("");
  const [errorMessages, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (errorLogin) {
      // 本来であればsetErrorMessage(`${errorLogin}`)とするが、フロントに500番のエラーしか返ってこないので、直接エラーメッセージを入れる
      setErrorMessage("Emailが登録されていません");
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
    const err = userValidate.validate(user);
    setErrorMessage(err);
    if (err != "") {
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
            {UserForm.EmailFrom(errorMessages, setEmail)}
          </div>
          {errorLogin && <span className="errorMessage">{errorMessages}</span>}
          <button onClick={handleLogin} className="login-btn">
            ログイン
          </button>
          <div className="login-area-button">
            <a href="signup" className="signup-link">
              新規登録の方はこちら
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
