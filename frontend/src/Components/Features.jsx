import { Truck, ShieldCheck, CreditCard, BadgeCheck,Undo2 } from "lucide-react";

const Features = () => {
  const features = [
    {
      id: 1,
      icon: <Truck className="w-8 h-8 fill-fuchsia-400" />,
      title: "FAST DELIVERY",
    },
    {
      id: 2,
      icon: <ShieldCheck className="w-8 h-8  fill-indigo-400" />,
      title: "SECURE SHOPPING",
    },
    {
      id: 3,
      icon: <CreditCard className="w-8 h-8 fill-amber-700" />,
      title: "EASY PAYMENTS",
    },
    {
      id: 4,
      icon: <BadgeCheck className="w-8 h-8 fill-yellow-500" />,
      title: "ASSURED QUALITY",
    },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-2 text-center">
      {features.map((f) => (
        <div key={f.id} className="p-6">
          <div className="flex justify-center mb-2">{f.icon}</div>
          <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default Features;
