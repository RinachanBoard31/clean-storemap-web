import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppTitle } from "../AppTitle";
import { EarthVideo } from "../EarthVideo"; // 動画ファイルをインポート
import { ErrorMessage } from "../common/ErrorMessage.tsx";
import { useLogin } from "../../hooks/auth/useLogin";
import { useCertification } from "../../hooks/auth/useCertification";
import "../../css/auth/auth.css";

export const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  // 認証用
  const query = new URLSearchParams(window.location.search);
  const { triggerLogin, dataLogin, errorLogin, resetLogin } = useLogin(
    query.toString()
  );
  useEffect(() => {
    if (query.get("code") && query.get("scope")) {
      resetLogin();
      triggerLogin();
    }
  }, []);

  useEffect(() => {
    if (errorLogin) {
      setErrorMessage("ユーザが未登録です。");
    }
  }, [errorLogin]);

  useEffect(() => {
    if (dataLogin) {
      navigate("/home");
    }
  }, [dataLogin]);

  // 認証画面のURLを取得し遷移する(認証は行わない)
  const {
    triggerCertification,
    authUrl,
    errorCertification,
    resetCertification,
  } = useCertification();

  useEffect(() => {
    if (errorCertification) {
      setErrorMessage("管理者に問い合わせてください。");
    }
  }, [errorCertification]);

  useEffect(() => {
    if (authUrl) {
      window.location.href = authUrl;
    }
  }, [authUrl]);

  async function handleLogin() {
    resetCertification();
    await triggerCertification();
  }

  return (
    <>
      {AppTitle()}
      <div className="contents-area">
        {EarthVideo()}
        <div className="action-contents">
          {errorMessage && (
            <div className="error">
              <ErrorMessage message={errorMessage} />
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
