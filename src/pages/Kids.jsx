import ProductCard from "../Components/ProductCard";
import { kidsProducts } from "../data/productsData";

const Kids = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-purple-950 mb-6">Kids</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {kidsProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default Kids;
