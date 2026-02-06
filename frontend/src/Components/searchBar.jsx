import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import api from "../axiosInstance";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearchAction = (searchTerm) => {
    const finalSearch = searchTerm || query;
    if (!finalSearch.trim()) return;

    setResults([]);

    navigate(`/products?search=${encodeURIComponent(finalSearch)}`);
  };
  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      if (!query) return;
      try {
        // const res = await fetch(`/api/products?search=${query}`);
        const res = await api.get(`/product/filter?search=${query}`);
        // console.log(res.data);
        setResults(res.data);
      } catch (err) {
        console.error("Search error:", err);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearchAction();
        }}
        className="flex items-center border-none shadow-sm"
      >
        {/* <div className="flex items-center border-none shadow-sm"> */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for products..."
          className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none bg-transparent text-gray-300 text-xl"
        />
        <button type="submit" aria-label="Search">
          <Search
            className="w-7 h-7 text-gray-300 cursor-pointer hover:text-purple-600 transition-colors"
            onClick={() => handleSearchAction()}
          />
        </button>
      </form>

      {results.length > 0 && (
        <ul className="absolute left-0 right-0 mt-2 shadow-lg rounded-lg overflow-hidden z-10 bg-white text-purple-950">
          {results.map((item, idx) => (
            <li
              key={idx}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setQuery(item.name);
                setResults([]);
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
