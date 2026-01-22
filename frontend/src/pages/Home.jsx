import ProductCard from "../Components/ProductCard";
import { homeProducts } from "../data/productsData";
import { useEffect } from "react";
import api from "../axiosInstance";

const Home = () => {
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/product");
        // console.log(res);
       
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div className="p-6">
      {/* <h1 className="text-2xl font-bold text-gray-300 mb-6">Home</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {homeProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div> */}
    </div>
  );
};

export default Home;
