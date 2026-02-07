import { useState } from "react";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import SearchBar from "../Components/searchBar";
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-purple-900">
      <NavBar />  
      <div className="p-8">
      <SearchBar/>
      </div>
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
