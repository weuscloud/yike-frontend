import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import { useSelector } from "react-redux";
import Layout from "./coms/Layout";
import { Spin } from "antd";
const Home = React.lazy(() => import("./pages/Home"));
const About = React.lazy(() => import("./pages/About"));
const UserProfile = React.lazy(() => import("./pages/UserProfile"));
const BlogEdit = React.lazy(() => import("./pages/BlogEdit"));
const Archive = React.lazy(() => import("./pages/Archive"));
const Login = React.lazy(() => import("./pages/Login"));
const BlogDetail = React.lazy(() => import("./pages/BlogDetail"));
const Register = React.lazy(() => import("./pages/Register"));
const Tag = React.lazy(() => import("./pages/Tag"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
function App() {
  const darkMode = useSelector((state) => state.app.darkMode);
  return (
    <ConfigProvider theme={darkMode ? "dark" : "light"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Suspense fallback={<Spin/>}><Home /></Suspense>} />
            <Route path="/about" element={<Suspense fallback={<Spin/>}><About /></Suspense>} />
            <Route path="/user" element={<Suspense fallback={<Spin/>}><UserProfile /></Suspense>} />
            <Route path="/edit" element={<Suspense fallback={<Spin/>}><BlogEdit /></Suspense>} />
            <Route path="/archive" element={<Suspense fallback={<Spin/>}><Archive /></Suspense>} />
            <Route path="/login" element={<Suspense fallback={<Spin/>}><Login /></Suspense>} />
            <Route path="/blog/:id" element={<Suspense fallback={<Spin/>}><BlogDetail /></Suspense>} />
            <Route path="/register" element={<Suspense fallback={<Spin/>}><Register /></Suspense>} />
            <Route path="/tags" element={<Suspense fallback={<Spin/>}><Tag /></Suspense>} />
            <Route path="/user" element={<Suspense fallback={<Spin/>}><UserProfile /></Suspense>} />
            <Route path="*" element={<Suspense fallback={<Spin/>}><NotFound /></Suspense>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>)
}
export default App;