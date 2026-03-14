import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import SearchBar from "../Components/searchBar";
import SalesChatbot from "../Components/SalesChatbot.jsx";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice.js";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-purple-900">
      <NavBar />

      <div className="p-8">
        <SearchBar />
      </div>

      <main className="flex-grow">
        <Outlet />
      </main>
      <SalesChatbot />
      <Footer />
    </div>
  );
};

export default Layout;