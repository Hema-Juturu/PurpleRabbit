import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../features/auth/productSlice";
import ProductCard from "./ProductCard";

const Trending = () => {
  const dispatch = useDispatch();
  
  const { list: products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  if (loading) return <div className="text-center py-20 text-white">Loading trends...</div>;
  if (error) return <div className="text-center py-20 text-red-500">Error: {error}</div>;

  return (
    <section className="py-12 px-5 lg:px-40">
      <h2 className="text-2xl text-white font-bold mb-6 text-center">🔥 Trending Now</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
         {products.slice(0, 6).map((product) => (
          <ProductCard key={product._id} {...product} />
        ))}
      </div>
    </section>
  );
};

export default Trending;