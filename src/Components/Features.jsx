import { Truck, ShieldCheck, CreditCard } from "lucide-react";

const Features = () => {
  const features = [
    {
      id: 1,
      icon: <Truck className="w-10 h-10 text-indigo-600" />,
      title: "Fast Delivery",
      desc: "Get your products delivered quickly and reliably.",
    },
    {
      id: 2,
      icon: <ShieldCheck className="w-10 h-10 text-indigo-600" />,
      title: "Secure Shopping",
      desc: "Your data is safe with end-to-end encryption.",
    },
    {
      id: 3,
      icon: <CreditCard className="w-10 h-10 text-indigo-600" />,
      title: "Easy Payments",
      desc: "Multiple payment options with hassle-free checkout.",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8 text-center">
      {features.map((f) => (
        <div
          key={f.id}
          className="p-6 rounded-2xl bg-white shadow hover:shadow-lg transition duration-300"
        >
          <div className="flex justify-center mb-4">{f.icon}</div>
          <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
          <p className="text-gray-600">{f.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default Features;
