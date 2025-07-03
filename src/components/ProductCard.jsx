import cart from "/src/assets/icons8-cart-pulsar-line-32.png";
import heart from "/src/assets/icons8-heart-laces-32.png";

const ProductCard = ({ image, name, category, price }) => {
  return (
    <div className="bg-transparent p-4 rounded-xl shadow hover:shadow-lg transition">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover rounded-md"
      />
      <h3 className="mt-2 text-lg font-semibold text-white">{name}</h3>
      <div className="flex flex-row justify-between">
        <span className="text-sm text-gray-500">{category}</span>
        <span className="font-bold mt-1 text-white">${price}</span>
      </div>
      <div className="flex flex-row justify-end">
        <button className="bg-transparent px-1 py-1 rounded-xl text-lg font-semibold shadow-md active:scale-95 active:shadow-inner">
          <img src={heart} alt="heart" />
        </button>
        <button className="bg-transparent px-1 py-1 rounded-xl text-lg font-semibold shadow-md active:scale-95 active:shadow-inner">
          <img src={cart} alt="cart" />
        </button>
        <button className="bg-transparent font-cursive text-yellow-500 px-1 py-1 rounded-xl text-lg font-semibold shadow-md active:scale-95 active:shadow-inner">
          Buy
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
