import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../axiosInstance"
import ProductCard from "../Components/ProductCard"


export const Admin = () => {
    const [myprods, setMyProds] = useState([])
  const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const res = await api.get("/product/my");
                setMyProds(res.data);
            }
            catch (err) {
            }

        })();
     
    }, []);

    const removeProduct= async(id)=>{
        try{
            await api.delete(`/product/${id}`);
            setMyProds((prev) => prev.filter((product) => product._id !== id));
        }
        catch(err){
        }
    }

    return (<div>
         {isLoading && (
        <div className="justify-center items-center">
          <LoadingSpinner />
        </div>
      )}
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
                        onClick={() => removeProduct(product._id)}
                        className="mt-2 self-end bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 transition max-w-fit"
                    >
                        Remove
                    </button>
                   
                </div>
            ))}
        </div>
    </div>)
}