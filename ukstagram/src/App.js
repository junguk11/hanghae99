import React from "react";
import { Routes, Route } from "react-router-dom";
import { auth, db } from "./shared/firebase";

import Main from "./pages/Main";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Notify from "./pages/Notify";
import Post from "./pages/Post";
import Detail from "./pages/Detail";
import Header from "./component/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/notify" element={<Notify />} />
        <Route path="/post/*" element={<Post />} />
        <Route path="/:id" element={<Detail />} />
      </Routes>
    </>
  );
}

export default App;
