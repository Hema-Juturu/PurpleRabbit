import ProductCard from "../Components/ProductCard";
import { selectHomeProducts } from "../features/auth/productSlice";
import { useSelector } from "react-redux";


const Home = () => {
  const homeProducts= useSelector(selectHomeProducts);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-300 mb-6">Home</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {homeProducts.map((product) => (
          <ProductCard key={product._sid} {...product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
