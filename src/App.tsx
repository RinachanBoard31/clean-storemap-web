import "./App.css";
import { useEffect } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import ShowFavoriteStoresRanking from "./components/favoriteStoresRanking/FavoriteStoresRanking";
import { UserEdit } from "./components/user/UserEdit";
import { Signup } from "./components/user/Signup";
import { Login } from "./components/user/Login";
import { Home } from "./components/Home";
import { useSession } from "./hooks/user/useSession";

function App() {
  const { deleteSession, isAuthenticated, getSessionId } = useSession();
  const navigate = useNavigate(); // 画面遷移をするためにuseNavigate フックを使用

  const location = useLocation(); // URLのpathを取得する
  useEffect(() => {
    // ログイン前に遷移できるページは条件式に追加する
    if (
      !isAuthenticated() &&
      location.pathname != "/login" &&
      location.pathname != "/signup" &&
      location.pathname != "/editUser"
    ) {
      navigate("/login");
    }
    // ログイン後に遷移できないページは条件式に追加する
    if (
      isAuthenticated() &&
      (location.pathname == "/login" || location.pathname == "/signup")
    ) {
      navigate("/home");
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
        <Link to="/favorite-store-ranking">Favorite Store Ranking</Link>
        <br />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/editUser" element={<UserEdit />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/favorite-store-ranking"
            element={<ShowFavoriteStoresRanking />}
          />
        </Routes>
      </div>
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
