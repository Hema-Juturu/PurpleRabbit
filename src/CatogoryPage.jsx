// src/pages/CategoryPage.jsx
import ProductCard from "/src/components/ProductCard";

const CategoryPage = ({ title, products }) => {
  return (
    <section className="py-10 px-4 max-w-6xl mx-auto bg-transparent">
      <h2 className="text-3xl text-purple font-cursive font-bold text-center mb-6">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, i) => (
          <ProductCard key={i} product={product} />
        ))}
      </div>
    </section>
  );
};

export default CategoryPage;
