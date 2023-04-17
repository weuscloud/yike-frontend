// src/App.js

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import { useSelector } from "react-redux";
import React from "react";
import Layout from "./coms/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import BlogDetail from "./pages/BlogDetail";
import BlogEdit from "./pages/BlogEdit";
import About from "./pages/About";
import Archive from "./pages/Archive";
import Login from "./pages/Login";
import Tag from "./pages/Tag";
import UserProfile from "./pages/UserProfile";

function App() {
  const darkMode = useSelector((state) => state.app.darkMode);
  return (
    <ConfigProvider theme={darkMode?"dark":"light"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index  element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/edit" element={<BlogEdit />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/login" element={<Login />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/regist" element={<Login />} />
            <Route path="/tags" element={<Tag />} />
            <Route path="/user" element={<UserProfile />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
