import "./Login.css";
import { useEffect } from "react";
import { loginUser } from "../hooks/loginUser";
import { changeColor } from "../hooks/changeColor";
import { UserLoginType } from "../types/user";
import { useNavigate } from "react-router-dom";
import UserForm from "./UserForm";
import { useState } from "react";
import userValidate from "../hooks/userValidation";
import { useSession } from "../hooks/sessionUser";
import { EarthVideo } from "./Video"; // 動画ファイルをインポート

export const Login = () => {
  const { createSession } = useSession();
  const [email, setEmail] = useState("");
  const { triggerLogin, userId, errorLogin, resetLogin } = loginUser();
  const navigate = useNavigate();

  // errorLoginに変更があった際にsetErrorMessageを呼び出す
  useEffect(() => {
    if (errorLogin) {
      console.error(errorLogin);
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

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
  const [errorMessages, setErrorMessage] = useState<string>("");
  useEffect(() => {
    setInterval(() => changeColor("login-area"), 30);
  }, []);

  return (
    <>
      <h1 className="title">
        <span>Welcome to </span>
        <span>Clean Storemap Web</span>
      </h1>
      <div className="login-area">
        {EarthVideo()}
        <div className="content-area">
          <form onSubmit={handleLogin}>
            <div className="login-form">
              {UserForm.EmailFrom(errorMessages, setEmail)}
            </div>
            <button type="submit" className="login-btn">
              ログイン
            </button>
          </form>
          <div className="login-area-button">
            <a href="signup" id="signup-link">
              新規登録の方はこちら
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
