import './App.css'
import { useState } from 'react'
import { GoogleMap, LoadScript } from "@react-google-maps/api";

function App() {
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");

  const containerStyle = {
    width: "400px",
    height: "400px",
  };
  
  const center = {
    lat: 35.68554104748237,
    lng: 139.7528246814339,
  };

  async function callGetStores() {
    try {
      const response = await fetch('http://localhost:8080/');
      const data = await response.json();
      console.log(data)
    } catch (error) {
      console.error('error:', error);
    }
  };

  async function callCreateUser() {
    try {
      const userData = {
        name: userName,
        email: userEmail,
      };
      const response = await fetch('http://localhost:8080/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      console.log(data)    
    } catch (error) {
      console.error('error:', error);
    }
  }

  function handleChangeUserName(e: React.ChangeEvent<HTMLInputElement>) {
    setUserName(e.target.value);
  }

  function handleChangeUserEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setUserEmail(e.target.value);
  }

  return (
    <>
      <h1>Clean Storemap Web</h1>
      <div className="card">
        <button onClick={() => callGetStores()}>
          押すぅ！
        </button>
      </div>
      <div>
        name
        <input value={userName} onChange={handleChangeUserName}/>
        <p>{userName}</p>
        email
        <input value={userEmail} onChange={handleChangeUserEmail}/>
        <p>{userEmail}</p>
        <button onClick={() => callCreateUser()}>Create User</button>
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

export default App
