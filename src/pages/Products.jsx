import { useState, useContext, useEffect } from "react";
import { SearchContext } from "../App";
import { Link, useSearchParams } from "react-router-dom";
import { RiArrowUpDownLine, RiFilter3Line, RiCloseLine } from "react-icons/ri";
import { Sidebar } from "lucide-react";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { searchTerm } = useContext(SearchContext);
  useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(searchTerm);
  }, 500);

  return () => clearTimeout(timer);
  
}, [searchTerm]);

  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCat = searchParams.get("category") || "All";
  const selectedBrand = searchParams.get("brand") || "All";
  const sortOrder = searchParams.get("sort") || "default";

  const categories = [
    "All",
    "Laptops",
    "Smartphones",
    "Headphones",
    "Tablets",
    "Accessories",
    "Wearables",
  ];

  const brands = [
    "All",
    "Apple",
    "Samsung",
    "Sony",
    "Razer",
    "Logitech",
    "Dell",
  ];

  // Update URL filters
  const updateFilters = (key, value) => {
    const params = new URLSearchParams(searchParams);

    if (value === "All" || value === "default") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    setSearchParams(params);
  };

 useEffect(() => {
  const params = new URLSearchParams(searchParams);

  if (debouncedSearch) {
    params.set("search", debouncedSearch);
  } else {
    params.delete("search");
  }

  setSearchParams(params);
}, [debouncedSearch]);

  // Fetch products from server
  useEffect(() => {
    setLoading(true);

    fetch(`https://backend-sk0h.onrender.com/products?${searchParams.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        const productData = data.data || data;

        if (Array.isArray(productData)) {
          setProducts(productData);
        } else {
          setProducts([]);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setProducts([]);
        setLoading(false);
      });
  }, [searchParams]);

  if (loading)
    return (
      <div className="bg-slate-950 min-h-screen flex items-center justify-center">
        <span className="text-emerald-500 font-black animate-pulse text-xl">
          LOADING COLLECTION...
        </span>
      </div>
    );

  return (
    <div className="bg-slate-950 text-white min-h-screen flex flex-col lg:flex-row p-4 lg:p-12 gap-6 lg:gap-10 relative overflow-x-hidden">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[280px] bg-slate-900 z-[60] p-8 border-r border-white/5
        lg:static lg:w-64 lg:h-auto lg:bg-transparent lg:p-0 lg:border-none lg:z-0
        transition-transform duration-300 ease-in-out
        ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="absolute top-6 right-6 lg:hidden text-gray-400 hover:text-white"
        >
          <RiCloseLine size={22} />
        </button>

        <div className="sticky top-10 space-y-12 lg:bg-slate-900/30 lg:p-8 lg:rounded-[2rem] lg:border lg:border-white/5 lg:shadow-2xl">
          {/* Categories */}
          <div>
            <h3 className="text-emerald-500 font-black text-[10px] uppercase tracking-widest mb-6">
              Categories
            </h3>

            <div className="space-y-4">
              {categories.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="cat"
                    checked={selectedCat === cat}
                    onChange={() => updateFilters("category", cat)}
                    className="accent-emerald-500 w-4 h-4"
                  />

                  <span
                    className={`text-sm transition-colors ${
                      selectedCat === cat
                        ? "text-white font-bold"
                        : "text-gray-500 group-hover:text-gray-300"
                    }`}
                  >
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div>
            <h3 className="text-emerald-500 font-black text-[10px] uppercase tracking-widest mb-6">
              Brands
            </h3>

            <div className="space-y-4">
              {brands.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="brand"
                    checked={selectedBrand === brand}
                    onChange={() => updateFilters("brand", brand)}
                    className="accent-emerald-500 w-4 h-4"
                  />

                  <span
                    className={`text-sm transition-colors ${
                      selectedBrand === brand
                        ? "text-white font-bold"
                        : "text-gray-500 group-hover:text-gray-300"
                    }`}
                  >
                    {brand}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <main className="flex-grow">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/5 pb-6 gap-4">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden fixed bottom-6 right-6 z-50 bg-emerald-500 text-slate-950 p-4 rounded-full shadow-xl flex items-center justify-center"
          >
            <RiFilter3Line size={20} />
          </button>

          <div>
            <h1 className="text-2xl lg:text-3xl font-black tracking-tight">
              Gadget <span className="text-emerald-500">Collection</span>
            </h1>

            <p className="text-gray-500 text-[10px] lg:text-sm font-bold uppercase tracking-widest mt-1">
              {products.length} Items found
            </p>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 bg-slate-900 border border-white/10 px-4 py-2 rounded-xl">
            <RiArrowUpDownLine className="text-emerald-500" />

            <select
              value={sortOrder}
              onChange={(e) => updateFilters("sort", e.target.value)}
              className="bg-transparent text-xs font-bold uppercase tracking-widest outline-none cursor-pointer text-gray-500"
            >
              <option value="default">Sort By</option>
              <option value="priceLowHigh">Price: Low to High</option>
              <option value="priceHighLow">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* No Products Found */}
        {products.length === 0 && (
          <div className="text-center py-20">
            <h2 className="text-xl text-gray-400 font-bold">
              No Products Found
            </h2>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-8 content-start pb-24">
          {products.map((item) => (
            <div key={item._id || item.id}>
              <Link
                to={`/products/${item._id}`}
                className="bg-slate-900/40 border border-white/5 rounded-2xl lg:rounded-[2rem] p-3 lg:p-6 hover:border-emerald-500/40 transition-all group flex flex-col h-full shadow-xl"
              >
                <div className="relative aspect-square bg-[#0f172a] rounded-xl lg:rounded-2xl flex items-center justify-center mb-4 overflow-hidden p-4 lg:p-8">
                  {item.stock === 0 ? (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-[8px] lg:text-[10px] font-black px-2 py-0.5 rounded shadow-lg z-10">
                      OUT OF STOCK
                    </span>
                  ) : (
                    item.tag && (
                      <span className="absolute top-3 left-3 bg-emerald-500 text-slate-950 text-[8px] lg:text-[10px] font-black px-2 py-0.5 rounded shadow-lg z-10">
                        {item.tag}
                      </span>
                    )
                  )}
                    
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl"
                  />
                </div>

                <div className="flex-grow">
                  <p className="text-[8px] lg:text-[10px] text-emerald-500 font-bold uppercase tracking-widest mb-1">
                    {item.brand}
                  </p>

                  <h3 className="text-xs lg:text-base font-bold text-white mb-2 leading-tight group-hover:text-emerald-400 line-clamp-1">
                    {item.name}
                  </h3>
                </div>

                <div className="flex justify-between items-center mt-4 lg:mt-6 pt-3 border-t border-white/5">
                  <span className="text-sm lg:text-xl font-black">
                    ${item.price}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
