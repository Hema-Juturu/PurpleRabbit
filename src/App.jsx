import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import CategoryPage from "./CatogoryPage";
import TopBar from "./components/TopBar";
const womenProducts = [
  {
    name: "Floral Top",
    category: "Tops",
    price: 39.99,
    image: "/images/women1.jpg",
  },
  {
    name: "Summer Dress",
    category: "Dresses",
    price: 49.99,
    image: "/images/women2.jpg",
  },
];

const App = () => {
  return (
    <>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/women"
          element={<CategoryPage title="Women" products={womenProducts} />}
        />
        <Route
          path="/men"
          element={<CategoryPage title="Men" products={womenProducts} />}
        />
        <Route
          path="/kids"
          element={<CategoryPage title="Kids" products={womenProducts} />}
        />
        <Route
          path="/home"
          element={<CategoryPage title="home" products={womenProducts} />}
        />
      </Routes>
    </>
  );
};

export default App;
