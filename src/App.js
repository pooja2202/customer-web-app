import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { CustomerProvider } from "./context/CustomerContext";
import Header from "./component/header/Header";
import Login from "./component/login/Login";
import Home from "./component/home/Home";
import SessionRoom from "./component/sessionroom/SessionRoom";
import NotFound from "./component/pagenotfound/PageNotFound";
import Private from "./service/ProtectedRoutes";
import Signup from "./component/signup/Signup";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    return storedIsLoggedIn ? JSON.parse(storedIsLoggedIn) : false;
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  return (
    <CustomerProvider>
      <div>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route
            path="/"
            element={
              <Login setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/home"
            element={<Private Component={Home} isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="/session-room/:id"
            element={
              <Private Component={SessionRoom} isLoggedIn={isLoggedIn} />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </CustomerProvider>
  );
}

export default App;
