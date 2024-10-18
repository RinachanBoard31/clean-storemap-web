import './App.css'
import { useEffect } from 'react';
import { useCookies } from "react-cookie";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { BrowserRouter, Link, Route, Routes,useNavigate, useLocation} from "react-router-dom";
import Signup from './signup';
import api from './api/api';

function App() {
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
  // ここからgoogle-mapの機能
  const containerStyle = {
    width: "400px",
    height: "400px",
  };
  
  const center = {
    lat: 35.68554104748237,
    lng: 139.7528246814339,
  };

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
        <button onClick={() => api.callGetStores()}>
          押すぅ！
        </button>
      </div>

      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={17}
        ></GoogleMap>
      </LoadScript>
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
