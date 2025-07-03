import ProductCard from "./ProductCard";

const TrendingProducts = () => {
  const dummyProducts = [...Array(8)].map((_, i) => ({
    name: "Women Tops & Tunics",
    category: "Women",
    image: "/images/product.jpg", // replace with real path
    price: 49.99,
  }));

  return (
    <section className="py-10 px-4 max-w-6xl mx-auto bg-transparent">
      <h2 className="text-3xl text-purple font-cursive font-bold text-center mb-6">
        Trending Now
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {dummyProducts.map((product, i) => (
          <ProductCard key={i} {...product} />
        ))}
      </div>
    </section>
  );
};

export default TrendingProducts;
