import ProductCard from "../Components/ProductCard";
import { selectWomenProducts } from "../features/auth/productSlice";
import { useSelector } from "react-redux";
const Women = () => {
  const prods = useSelector(selectWomenProducts);
  console.log("women", prods);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-300 mb-6">Women</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {prods.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default Women;
