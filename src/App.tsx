import "./App.css";
import { useEffect } from "react";
import { StoreDashboard } from "./components/StoreDashboard";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { EditUser } from "./components/EditUser";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";

import { useSession } from "./hooks/sessionUser";

function App() {
  const { deleteSession, isAuthenticated, getSessionId } = useSession();
  const navigate = useNavigate(); // 画面遷移をするためにuseNavigate フックを使用

  const location = useLocation(); // URLのpathを取得する
  const userId = "1"; // 仮のユーザID
  useEffect(() => {
    // ここで認証状態をチェックし、必要に応じてリダイレクト
    if (
      !isAuthenticated() &&
      location.pathname != "/login" &&
      location.pathname != "/signup" &&
      location.pathname != "/editUser"
    ) {
      navigate("/login");
    }
    // ログインしている場合はsignupページに遷移できないようにする
    if (
      isAuthenticated() &&
      (location.pathname == "/login" || location.pathname == "/signup")
    ) {
      navigate("/");
    }
  }, [getSessionId(), navigate]); // クッキーを削除したと気に、削除前に画面遷移の処理が走ってしまうので、クッキーの削除を監視して削除する

  function handleLogout() {
    deleteSession();
  }

  return (
    <>
      {/* ヘッダー部分 */}
      <div className="App">
        {isAuthenticated() && (
          <Link to="/login" onClick={handleLogout}>
            Logout
          </Link>
        )}
        <br />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/editUser" element={<EditUser />} />
        </Routes>
      </div>

      <StoreDashboard userId={userId} />
    </>
  );
}

// 認証確認をして画面遷移するためにuseNavigateを使用しているため<App>を<BrowserRouter>でラップする
const WrappedApp = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default WrappedApp;
