import Layout from "./Layouts/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Women from "./pages/Women";
import Men from "./pages/Men";
import Kids from "./pages/Kids";
import Home from "./pages/Home";
function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}></Route>
          <Route path="women" element={<Women />} />
          <Route path="kids" element={<Kids />} />
          <Route path="men" element={<Men />} />
          <Route path="home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppRoutes;
