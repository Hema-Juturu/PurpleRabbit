import Layout from "./Layouts/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppRoutes;
