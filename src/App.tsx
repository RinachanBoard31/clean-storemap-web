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
  const { deleteSession, isAuthenticated } = useSession();
  const navigate = useNavigate(); // 画面遷移をするためにuseNavigate フックを使用

  const location = useLocation(); // URLのpathを取得する
  const userId = "1"; // 仮のユーザID
  useEffect(() => {
    // ここで認証状態をチェックし、必要に応じてリダイレクト
    if (
      !isAuthenticated() &&
      location.pathname != "/signup" &&
      location.pathname != "/login" &&
      location.pathname != "/editUser"
    ) {
      navigate("/signup");
    }
    // ログインしている場合はsignupページに遷移できないようにする
    if (
      isAuthenticated() &&
      (location.pathname == "/signup" || location.pathname == "/login")
    ) {
      navigate("/");
    }
  }, [navigate]); // ページが変わったときに実行

  function handleLogout() {
    deleteSession();
  }

  return (
    <>
      {/* ヘッダー部分 */}
      <div className="App">
        <Link to="/">Home</Link>
        <br />
        {!isAuthenticated() ? (
          <Link to="/signup">Signup</Link>
        ) : (
          <Link to="/" onClick={handleLogout}>
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

      {isAuthenticated() ? "ログインしています。" : "ログインしていません。"}
      {/* ログイン状態を確認するためです。後に削除 */}

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
