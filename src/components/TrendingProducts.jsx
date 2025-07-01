import cart from "/src/assets/icons8-cart-pulsar-line-32.png";
import heart from "/src/assets/icons8-heart-laces-32.png";

const TrendingProducts = () => {
  return (
    <>
      <section className="py-10 px-4 max-w-6xl mx-auto bg-transparent">
        <h2 className="text-3xl text-purple font-cursive font-bold text-center mb-6">
          Trending Now
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-transparent p-4 rounded-xl shadow hover:shadow-lg transition"
            >
              <img
                src="/src/assets/image.png"
                alt="product"
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="mt-2 text-lg font-semibold text-white">
                Women Tops & Tunics
              </h3>
              <div className="flex flex-row justify-between">
                <span className="text-sm text-gray-500">
                  Women Tops & Tunics
                </span>
                <span className="font-bold mt-1 text-white">$49.99</span>
              </div>
              <div className="flex flex-row justify-end">
                <button className="bg-transparent text-black px-1 py-1 rounded-xl text-lg font-semibold shadow-md border-2 border-transparent  hover: transition active:scale-95 active:shadow-inner">
                  <img src={heart} alt="heart" />
                </button>
                <button className="bg-transparent text-black px-1 py-1 rounded-xl text-lg font-semibold shadow-md border-2 border-transparent  hover: transition active:scale-95 active:shadow-inner">
                  <img src={cart} alt="cart" />
                </button>
                <button className="bg-transparent font-cursive text-yellow-500 px-1 py-1 rounded-xl text-lg font-semibold shadow-md border-2 border-transparent  hover: transition active:scale-95 active:shadow-inner">
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
export default TrendingProducts;
