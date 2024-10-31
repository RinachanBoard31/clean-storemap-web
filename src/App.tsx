import './App.css'
import { useEffect } from 'react';
import { useCookies } from "react-cookie";
import { BrowserRouter, Link, Route, Routes,useNavigate, useLocation} from "react-router-dom";
import { StoreMap } from './components/StoreMap';
import { useNearStores } from './hooks/useNearStores';
import Signup from './components/Signup';

function App() {
  const { trigger, isMutating, data, error, reset } = useNearStores();
  const [cookies,, removeCookie] = useCookies(["isSession"]);
  const isAuthenticated = !!cookies.isSession; // 認証されているかどうか
  const navigate = useNavigate(); // 画面遷移をするためにuseNavigate フックを使用
  // 認証されていない場合に、特定のページにリダイレクト
  // signupしていないと他のページに遷移できません。
  const location = useLocation(); // URLのpathを取得する
  useEffect(() => {
    // ここで認証状態をチェックし、必要に応じてリダイレクト
    if (!isAuthenticated && location.pathname != "/signup") {
      navigate('/signup');
    }
  }, [cookies.isSession, navigate]); // cookies.isSession,ページが変わったときに再実行
  
  function logout(){
    removeCookie("isSession");
  }

  function handleCallGetStores(){
    reset();
    trigger();
  }

  return (
    <>
      {/* ヘッダー部分 */}
      <div className="App">
        <Link to="/">Home</Link>
        <br />
        <Link to="/signup">Signup</Link>
        <br />
        <Link to="/" onClick={logout}>Logout</Link>
        <br />
        <Routes>
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>

      <h1>Clean Storemap Web</h1>

      {(isAuthenticated)?"ログインしています。":"ログインしていません。"}

      <div className="card">
        <button onClick={handleCallGetStores}>店舗情報を取得</button>
        {isMutating && <p>データ取得中...</p>}
        {error && <p>{error}</p>}
      </div>

      {data && <StoreMap stores={data.stores} />}
    </>
  )
}

// 認証確認をして画面遷移するためにuseNavigateを使用しているため<App>を<BrowserRouter>でラップする
const WrappedApp = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default WrappedApp;
