import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import { useSelector } from "react-redux";
import Layout from "./coms/Layout";
import { Spin } from "antd";
import router from '../router.json';
const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Blog = React.lazy(() => import("./pages/Blog"));
function App() {
  const darkMode = useSelector((state) => state.app.darkMode);
  return (
    <ConfigProvider theme={darkMode ? "dark" : "light"}>
      <BrowserRouter>
        <Routes>
          <Route path={router.home} element={<Layout />}>
            <Route index element={<Suspense fallback={<Spin/>}><Home /></Suspense>} />
            <Route path={router.login} element={<Suspense fallback={<Spin/>}><Login /></Suspense>} />
            <Route path={router.register} element={<Suspense fallback={<Spin/>}><Register /></Suspense>} />
            <Route path={`/${router.blog}/*`} element={<Suspense fallback={<Spin/>}><Blog /></Suspense>} />
            <Route path="*" element={<Suspense fallback={<Spin/>}><NotFound /></Suspense>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>)
}
export default App;