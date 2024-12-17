import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppTitle } from "../AppTitle";
import { EarthVideo } from "../EarthVideo"; // 動画ファイルをインポート
import { ErrorMessage } from "../common/ErrorMessage.tsx";
import { useSignup } from "../../hooks/auth/useSignup";
import { useCertification } from "../../hooks/auth/useCertification";
import "../../css/auth/auth.css";

export const Signup = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  // 認証用
  const query = new URLSearchParams(window.location.search);
  const { triggerSignup, dataSignup, errorSignup, resetSignup } = useSignup(
    query.toString()
  );
  useEffect(() => {
    if (query.get("code") && query.get("scope")) {
      resetSignup();
      triggerSignup();
    }
  }, []);

  useEffect(() => {
    if (errorSignup) {
      setErrorMessage("すでに登録されています。");
    }
  }, [errorSignup]);

  useEffect(() => {
    if (dataSignup) {
      navigate("/editUser");
    }
  }, [dataSignup]);

  // 認証画面のURLを取得し遷移する(認証は行わない)
  const {
    triggerCertification,
    authUrl,
    errorCertification,
    resetCertification,
  } = useCertification("signup");

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

  async function handleSignup() {
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
          <button onClick={handleSignup}>Googleでサインアップする</button>
          <br />
          <a href="login">ログインの方はこちら</a>
        </div>
      </div>
    </>
  );
};

//   return (
//     <>
//       {AppTitle()}
//       <div className="contents-area">
//         {EarthVideo()}
//         <div className="action-contents">
//           {errorMessage && (
//             <div className="error">
//               <ErrorMessage message={errorMessage} />
//             </div>
//           )}
//           <button onClick={handleLogin}>ログイン</button>
//           <br />
//           <a href="login">新規登録の方はこちら</a>
//         </div>
//       </div>
//     </>
//   );
// };
