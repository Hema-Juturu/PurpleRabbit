import ProductCard from "../Components/ProductCard";
import { menProducts } from "../data/productsData";

const Men = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-purple-950 mb-6">Men</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {menProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default Men;
