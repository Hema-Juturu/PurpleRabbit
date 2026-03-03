import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import SearchBar from "../Components/searchBar";
import SalesChatbot from "../Components/salesChatBot";


const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-purple-900">
      <NavBar />  
      <div className="p-8">
      <SearchBar/>
      </div>
      <main className="flex-grow">{children}</main>
      <SalesChatbot/>
      <Footer />
    </div>
  );
};

export default Layout;
