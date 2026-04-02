import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../axiosInstance";
import ProductCard from "../Components/ProductCard";
import LoadingSpinner from "../Components/loading";
import ConfirmModal from "../Components/ConfirmModal";


export const Admin = () => {
    const [myprods, setMyProds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingRemoveId, setPendingRemoveId] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const res = await api.get("/product/my");
                setMyProds(res.data);
            }
            catch (err) {
                console.error("Failed to load products", err);
            } finally {
                setIsLoading(false);
            }

        })();
     
    }, []);

    const removeProduct= async(id)=>{
        try{
            setIsLoading(true);
            await api.delete(`/product/${id}`);
            setMyProds((prev) => prev.filter((product) => product._id !== id));
        }
        catch(err){
            console.error("Failed to remove product", err);
        } finally {
            setIsLoading(false);
        }
    }

    const openRemoveConfirm = (id) => {
        setPendingRemoveId(id);
        setIsConfirmOpen(true);
    };

    const closeRemoveConfirm = () => {
        setIsConfirmOpen(false);
        setPendingRemoveId(null);
    };

    const confirmRemove = async () => {
        if (!pendingRemoveId) return;
        await removeProduct(pendingRemoveId);
        closeRemoveConfirm();
    };

    return (<div>
         {isLoading && (
        <div className="justify-center items-center">
          <LoadingSpinner />
        </div>
      )}
        <ConfirmModal
            isOpen={isConfirmOpen}
            onClose={closeRemoveConfirm}
            onConfirm={confirmRemove}
            title="Remove product?"
            message="This action cannot be undone."
            confirmText="Remove"
            cancelText="Cancel"
            type="danger"
        />
        <div className="flex justify-end  w-full">
            <Link to="/addProduct" className="w-full">
                <div className="m-2 flex justify-center">
                    <button className="bg-purple-400 p-2 rounded-md text-white m-2 w-1/3 flex justify-center">
                        add new products
                    </button>
                </div>
            </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {myprods.map((product) => (
                <div key={product._id} className="flex flex-col w-full p-2 rounded-lg">
                   
                    <ProductCard {...product} />
                      <button
                        onClick={() => openRemoveConfirm(product._id)}
                        className="mt-2 self-end bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 transition max-w-fit"
                    >
                        Remove
                    </button>
                   
                </div>
            ))}
        </div>
    </div>)
}