import Layout from "./Layouts/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Women from "./pages/Women";
import Men from "./pages/Men";
import Kids from "./pages/Kids";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import ProductDetails from "./pages/ProductDetails";
import WishlistPage from "./pages/WishlistPage";
import BagPage from "./pages/BagPage";
import Profile from "./pages/Profile";
function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="women" element={<Women />} />
            <Route path="kids" element={<Kids />} />
            <Route path="men" element={<Men />} />
            <Route path="home" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/bag" element={<BagPage />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default AppRoutes;
