import { AlertTriangle } from "lucide-react";

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm",
  message = "Are you sure?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "danger",
}) => {
  if (!isOpen) return null;

  const typeClasses = {
    danger: {
      bg: "bg-red-500",
      text: "text-red-400",
      border: "border-red-600",
      icon: <AlertTriangle size={44} color="red" />,
    },
    default: {
      bg: "bg-purple-500",
      text: "text-purple-300",
      border: "border-purple-500",
      icon: <AlertTriangle size={44} color="white" />,
    },
  };

  const classes = typeClasses[type] || typeClasses.danger;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
      <div className="bg-black/70 backdrop-blur-lg p-6 rounded-xl w-96 shadow-lg relative">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-11 w-11 rounded-full bg-opacity-20">
            {classes.icon}
          </div>

          <h3 className={`mt-3 text-lg font-bold ${classes.text}`}>{title}</h3>

          <div className="mt-2">
            <p className="text-base text-gray-300">{message}</p>
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-3">
          <button
            type="button"
            className="w-1/2 inline-flex justify-center rounded-md border border-gray-600 shadow-sm px-4 py-2 text-base font-medium text-gray-200 hover:bg-white/10 focus:outline-none"
            onClick={onClose}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className={`w-1/2 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white ${
              classes.bg
            } hover:${classes.bg.replace("-500", "-600")} focus:outline-none`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

