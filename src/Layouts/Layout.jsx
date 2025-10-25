import { useState } from "react";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-purple-900">
      <NavBar className="absolute top-0 left-0 w-full z-50" />  
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
