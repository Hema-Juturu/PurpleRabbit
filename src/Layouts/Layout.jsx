import NavBar from "../Components/NavBar";
import Footer  from "../Components/Footer";
const Layout = ({ children }) => {
  return (
<div className="min-h-screen flex flex-col bg-neutral-200">
        <NavBar/>
      <main className="flex-grow">
        {children}
      </main>
        <Footer/>
    </div>
  );
};

export default Layout;
