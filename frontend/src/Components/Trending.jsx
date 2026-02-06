import img4 from "../assets/img1.png";
import img6 from "../assets/img4.png";
import img7 from "../assets/img7.png";

const Trending = () => {
  const products = [
    {
      id: 1,
      name: "Smartphone",
      price: "₹39,999",
      offer: "10% Off",
      img: "/images/smartphone.png",
    },
    {
      id: 2,
      name: "Modern Chair",
      price: "₹12,999",
      offer: "5% Off",
      img: "/images/chair.png",
    },
    { id: 5, name: "Designer Dress", price: "₹4,499", offer: "", img: img4 },
    {
      id: 3,
      name: "Designer Bag",
      price: "₹7,499",
      offer: "15% Off",
      img: "/images/handbag.png",
    },
    { id: 7, name: "Table Lamp", price: "₹1,599", offer: "", img: img6 },
    { id: 8, name: "Wall Art", price: "₹2,799", offer: "20% Off", img: img7 },
  ];

  return (
    <section className="py-12 px-5 lg:px-40">
      <h2 className="text-2xl text-white font-bold mb-6 text-center">🔥 Trending Now</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 ">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-gray-50  border rounded-2xl overflow-hidden shadow hover:shadow-lg transition duration-300 cursor-pointer"
          >
            <img
              src={p.img}
              alt={p.name}
              loading="lazy"
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{p.name}</h3>
              <p className="text-indigo-600 font-bold">{p.price}</p>
              {p.offer && (
                <span className="text-red-500 font-semibold text-sm">
                  {p.offer}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Trending;
