import { HashRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <>
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />

          <Route path="/register" element={<RegisterComponent />} />

          <Route
            path="/login"
            element={<LoginComponent setCurrentUser={setCurrentUser} />}
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

          <Route
            path="/online"
            element={
              <OnlineComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
        </Routes>
      </HashRouter>

      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
    </>
  );
}

export default App;


