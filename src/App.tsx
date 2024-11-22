import "./App.css";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { StoreDashboard } from "./components/StoreDashboard";
import { BrowserRouter, Link, Route, Routes,useNavigate, useLocation} from "react-router-dom";
import { EditUser } from './components/EditUser';
import { Signup } from './components/Signup';
import { Login } from './components/Login';

function App() {
  const [cookies, , removeCookie] = useCookies(["isSession"]);
  const isAuthenticated = !!cookies.isSession; // 認証されているかどうか
  const navigate = useNavigate(); // 画面遷移をするためにuseNavigate フックを使用
  // 認証されていない場合に、特定のページにリダイレクト
  // signupしていないと他のページに遷移できません。
  const location = useLocation(); // URLのpathを取得する
  const userId = "1"; // 仮のユーザID
  useEffect(() => {
    // ここで認証状態をチェックし、必要に応じてリダイレクト
    if (!isAuthenticated && location.pathname != "/signup" && location.pathname != "/login" && location.pathname != "/editUser") {
      navigate('/signup');
    }
  }, [cookies.isSession, navigate]); // cookies.isSession,ページが変わったときに再実行

  function logout() {
    removeCookie("isSession");
  }

  return (
    <>
      {/* ヘッダー部分 */}
      <div className="App">
        <Link to="/">Home</Link>
        <br />
        <Link to="/signup">Signup</Link>
        <br />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/editUser" element={<EditUser />} />
        </Routes>
      </div>

      {isAuthenticated ? "ログインしています。" : "ログインしていません。"}

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
