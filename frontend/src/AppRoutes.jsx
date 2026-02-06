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
import Layout from "./Layouts/Layout";
import { ProductContextProvider } from "./context/product-context";
import AddNewProductForm from "./pages/AddNewProductForm";
import { fetchProducts } from "./features/auth/productSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./features/auth/authSlice";
import ProductsPage from "./pages/ProductsPage";

function AppRoutes() {
  const dispatch = useDispatch();

  const user = useSelector(selectCurrentUser);
  useEffect(() => {
    
      dispatch(fetchProducts()); 
    
  }, [dispatch]);
  return (
    <>
      <BrowserRouter>
        <ProductContextProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<LandingPage />}/>
              <Route path="women" element={<Women />} />
              <Route path="kids" element={<Kids />} />
              <Route path="men" element={<Men />} />
              <Route path="home" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/bag" element={<BagPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/addProduct" element={<AddNewProductForm />} />
              <Route path="/products" element={<ProductsPage />} />
            </Routes>
          </Layout>
        </ProductContextProvider>
      </BrowserRouter>
    </>
  );
}

export default AppRoutes;
