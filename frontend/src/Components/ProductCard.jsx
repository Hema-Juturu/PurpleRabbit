import { Link } from "react-router-dom";

const ProductCard = ({ id, name, price, offer, images }) => {
  console.log(images);
  return (
    <Link to={`/product/${id}`}>
      <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:scale-105 transition">
        <img src={images?.[0]} alt={name} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-gray-600">
            {price}&nbsp;&nbsp;
            {offer && <span className="text-sm text-red-500">{offer}</span>}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
