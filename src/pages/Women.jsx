import ProductCard from "../Components/ProductCard";
import { womenProducts } from "../data/productsData";

const Women = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-300 mb-6">Women</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {womenProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default Women;
