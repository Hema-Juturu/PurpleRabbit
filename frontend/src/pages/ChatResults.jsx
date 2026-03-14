import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProductById } from "../features/auth/productSlice";
import ProductCard from "../Components/ProductCard";

const ChatResults = () => {
  const location = useLocation();

  const productIds = location.state?.products || [];
  const products = useSelector((state) =>
    productIds
      .map((id) => selectProductById(state, id))
      .filter(Boolean)
  );
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">
        AI Recommended Products
      </h1>

      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p._id || p.id} {...p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatResults;