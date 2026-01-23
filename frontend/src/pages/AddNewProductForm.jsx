import { useState } from "react";
import api from "../axiosInstance";
import ResponseModal from "../Components/ResponseModal";
const AddNewProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    rentPrice: 0,
    category: "",
    condition: "new",
    images: [""],
    isAvailableForRent: true,
    isAvailableForSale: true,
    stock: 1,
    location: {
      city: "",
      state: "",
      country: "",
    },
    owner: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    message: "",
    type: "",
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
      if (name === "isAvailableForSale" && !checked) {
        setFormData((prev) => ({ ...prev, price: 0 }));
      }
      if (name === "isAvailableForRent" && !checked) {
        setFormData((prev) => ({ ...prev, rentPrice: 0 }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [name]: value,
      },
    }));
  };

  const handleImageChange = (index, file) => {
    const newImages = [...formData.images];
    newImages[index] = file;
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  const hanndleRemoveImg = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const addImageField = () => {
    setFormData((prev) => ({ ...prev, images: [...prev.images, ""] }));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData({ title: "", message: "", type: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/product", formData);
      setModalData({
        title: "Success! 🎉",
        message: "The product was created successfully.",
        type: "success",
      });
      setIsModalOpen(true);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "An unknown error occurred while submitting the form.";

      setModalData({
        title: "Submission Failed 🙁",
        message: errorMessage,
        type: "error",
      });
      setIsModalOpen(true);
    }
  };

  const productConditions = ["new", "like-new", "used", "refurbished"];
  const productCategory = ["women", "men", "kids", "home"];

  const inputClass =
    "w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-150";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";
  const buttonPrimaryClass =
    "w-full py-3 px-4 bg-lime-500 lg:lg:hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md transition duration-200 ease-in-out mt-6";
  const buttonSecondaryClass =
    "py-2 px-4 border border-purple-500 text-purple-600 lg:hover:bg-purple-50 rounded-lg font-medium transition duration-150";
  const formGroupClass = "mb-4";
  const fieldsetClass =
    "border border-gray-300 p-5 rounded-xl shadow-inner bg-gray-50/50 my-6";
  const legendClass = "text-lg font-semibold text-gray-800 px-2";

  return (
    <div className="min-h-screen bg-transparent p-4 sm:p-6 lg:p-8">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-gray-100 p-8 rounded-2xl shadow-2xl border border-gray-200"
      >
        <h2 className="text-3xl text-center font-thin mb-8 border-b-2 border-purple-200 pb-3">
          Product Details
        </h2>

        <div className={formGroupClass}>
          <label htmlFor="name" className={labelClass}>
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        <div className={formGroupClass}>
          <label htmlFor="description" className={labelClass}>
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className={inputClass + " resize-y"}
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={formGroupClass}>
            <label htmlFor="category" className={labelClass}>
              Category
            </label>
            <select
              id="Category"
              name="Category"
              value={formData.category}
              onChange={handleChange}
              className={inputClass}
            >
              {productCategory.map((cond) => (
                <option key={cond} value={cond}>
                  {cond}
                </option>
              ))}
            </select>
          </div>
          <div className={formGroupClass}>
            <label htmlFor="condition" className={labelClass}>
              Condition
            </label>
            <select
              id="condition"
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className={inputClass}
            >
              {productConditions.map((cond) => (
                <option key={cond} value={cond}>
                  {cond}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="border border-dashed border-gray-300 p-4 rounded-xl my-6 bg-purple-50/30">
          <p className="text-md font-semibold text-gray-700 mb-4">
            Availability & Pricing
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="flex items-center space-x-2 cursor-pointer mb-2">
                <input
                  type="checkbox"
                  name="isAvailableForSale"
                  checked={formData.isAvailableForSale}
                  onChange={handleChange}
                  className="form-checkbox h-5 w-5 text-purple-600 rounded"
                />
                <span className="text-gray-900 font-medium">
                  Available for Sale
                </span>
              </label>
              {formData.isAvailableForSale && (
                <div className={formGroupClass + " pl-7"}>
                  <label htmlFor="price" className={labelClass}>
                    Sale Price ($)
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    required
                    className={inputClass}
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <label className="flex items-center space-x-2 cursor-pointer mb-2">
                <input
                  type="checkbox"
                  name="isAvailableForRent"
                  checked={formData.isAvailableForRent}
                  onChange={handleChange}
                  className="form-checkbox h-5 w-5 text-purple-600 rounded"
                />
                <span className="text-gray-900 font-medium">
                  Available for Rent
                </span>
              </label>
              {formData.isAvailableForRent && (
                <div className={formGroupClass + " pl-7"}>
                  <label htmlFor="rentPrice" className={labelClass}>
                    Rent Price ($/month)
                  </label>
                  <input
                    type="number"
                    id="rentPrice"
                    name="rentPrice"
                    value={formData.rentPrice}
                    onChange={handleChange}
                    min="0"
                    required
                    className={inputClass}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={formGroupClass + " max-w-sm"}>
          <label htmlFor="stock" className={labelClass}>
            Stock Quantity <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            min="0"
            required
            className={inputClass}
          />
        </div>

        <fieldset className={fieldsetClass}>
          <legend className={legendClass}> Location Details</legend>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            <div className={formGroupClass + " mb-0"}>
              <label htmlFor="country" className={labelClass}>
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.location.country}
                onChange={handleLocationChange}
                className={inputClass}
              />
            </div>
            <div className={formGroupClass + " mb-0"}>
              <label htmlFor="state" className={labelClass}>
                State/Province
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.location.state}
                onChange={handleLocationChange}
                className={inputClass}
              />
            </div>
            <div className={formGroupClass + " mb-0"}>
              <label htmlFor="city" className={labelClass}>
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.location.city}
                onChange={handleLocationChange}
                className={inputClass}
              />
            </div>
          </div>
        </fieldset>

        <fieldset className={fieldsetClass}>
          <legend className={legendClass}>🖼️ Images (URLs)</legend>
          <div className="space-y-4 mt-4">
            {formData.images.map((image, index) => (
              <div key={index} className={formGroupClass + " mb-0"}>
                <label htmlFor={`image-${index}`} className={labelClass}>
                  Image URL {index + 1}
                </label>
                <div className="flex flex-row gap-2">
                  <input
                    type="file"
                    id={`image-${index}`}
                    name={`image-${index}`}
                    accept="image/*"
                    onChange={(e) =>
                      handleImageChange(index, e.target.files[0])
                    }
                    className={inputClass}
                  />
                  <button
                    className="text-red-600 border-2 border-red-600 bg-white px-3 rounded-lg"
                    onClick={() => {
                      hanndleRemoveImg(index);
                    }}
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addImageField}
            className={buttonSecondaryClass + " mt-4"}
          >
            + Add another image URL
          </button>
        </fieldset>

        <button type="submit" className={buttonPrimaryClass}>
          ADD PRODUCT
        </button>
      </form>
      <ResponseModal
        isOpen={isModalOpen}
        title={modalData.title}
        message={modalData.message}
        type={modalData.type}
        onClose={closeModal}
      />
    </div>
  );
};

export default AddNewProductForm;
