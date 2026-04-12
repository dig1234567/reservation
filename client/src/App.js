import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import HomeComponent from "./components/home-component";
import RegisterComponent from "./components/register-component";
import LoginComponent from "./components/login-component";
import Nav from "./components/nav-component";
import authService from "./services/auth-services";
import Layout from "./components/layout";
import OnlineComponent from "./components/online-component";
import MemberComponent from "./components/member-component";

function App() {
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout currentUser={currentUser} setCurrentUser={setCurrentUser} />
          }
        />
        <Route path="/register" element={<RegisterComponent />} />
        <Route
          path="/login"
          element={
            <LoginComponent
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          path="/Online"
          element={
            <OnlineComponent
              currentUser={currentUser}
              setCurrentUs={setCurrentUser}
            />
          }
        />
        <Route
          path="/member"
          element={
            <MemberComponent
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
