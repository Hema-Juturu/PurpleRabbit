import img1 from "../assets/img7.png";
import img2 from "../assets/img8.jpg";
import img3 from "../assets/img4.png";
import img4 from "../assets/img2.png";

const Categories = () => {
  const categories = [
    { id: 1, name: "Electronics", img: img3 },
    { id: 2, name: "Fashion", img: img2 },
    { id: 3, name: "Furniture", img: img1 },
    { id: 4, name: "Sports", img: img4 },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {categories.map((cat) => (
        <div
          key={cat.id}
          className="relative rounded-2xl overflow-hidden shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
        >
          <img
            src={cat.img}
            alt={cat.name}
            className="w-full h-40 object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">
              {cat.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
