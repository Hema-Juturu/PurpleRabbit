import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../axiosInstance";
import ProductCard from "../Components/ProductCard";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/product/filter?search=${searchTerm}`);
        setProducts(res.data);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold p-4 text-gray-300">
        {searchTerm ? `Results for "${searchTerm}"` : "All Products"}
      </h1>

      {loading ? (
        <div className="text-center py-10 text-gray-300">Searching PurpleRabbit...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-10 text-gray-300">
          No products found matching your search.
        </div>
      ) : (
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} {...product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
