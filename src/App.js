import "./App.css";
import Home from "./pages/home/Home";
import Auth from "./pages/Authentication/Auth";

import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Profile } from "./pages/Profile/Profile";
import Chat from "./pages/Chat/Chat";

function App() {
  const user = useSelector((state) => state.authReducer.authData);
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="home" /> : <Navigate to="auth" />}
        />

        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="../auth" />}
        />

        <Route
          path="/auth"
          element={user ? <Navigate to="../home" /> : <Auth />}
        />

        <Route path="/profile/:id" element={user ? <Profile /> : <Auth />} />
        <Route path="/chat"  element={user? <Chat/>: <Navigate to="../auth"/>}/>
      </Routes>
    </div>
  );
}

export default App;
