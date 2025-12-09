import { CheckCircle, AlertCircle } from "lucide-react";
const ResponseModal = ({ isOpen, onClose, title, message, type }) => {
  if (!isOpen) return null;

  const typeClasses = {
    error: {
      bg: "bg-red-500",
      text: "text-red-700",
      border: "border-red-600",
      icon: <AlertCircle size={40} color="red"/>,
    },
    success: {
      bg: "bg-lime-600",
      text: "text-lime-500",
      border: "border-lime-600",
      icon: <CheckCircle size={40} color="lime"/>,
    },
  };

  const classes = typeClasses[type] || typeClasses.success;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
      <div
        className={`bg-black/40 backdrop-blur-lg p-6 rounded-xl w-96 shadow-lg relative`}
      >
        <div className="text-center">
          <div
            className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full ${classes.bg} bg-opacity-20`}
          >
            {classes.icon}
          </div>

          <h3 className={`mt-3 text-lg font-bold ${classes.text}`}>{title}</h3>

          <div className="mt-2">
            <p className="text-sm text-gray-500">{message}</p>
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <button
            type="button"
            className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white ${
              classes.bg
            } hover:${classes.bg.replace("-500", "-600")} focus:outline-none`}
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResponseModal;
