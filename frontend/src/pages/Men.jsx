import ProductCard from "../Components/ProductCard";
import { selectMenProducts } from "../features/auth/productSlice";
import { useSelector } from "react-redux";
const Men = () => {
    const menProducts = useSelector(selectMenProducts);
  return (
    <div className="p-6">

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {menProducts.map((product) => (
          <ProductCard key={product._id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default Men;
