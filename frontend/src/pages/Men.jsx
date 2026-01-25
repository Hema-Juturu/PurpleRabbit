import ProductCard from "../Components/ProductCard";
import { selectMenProducts } from "../features/auth/productSlice";
import { useSelector } from "react-redux";
const Men = () => {
    const menProducts = useSelector(selectMenProducts);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-300 mb-6">Men</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {menProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default Men;
