import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Products } from "../Products";

export const ListProducts = () => {
  const [data, setData] = useState([]);
  const [search, setsearch] = useState("");
  // const [category, setCategory] = useState("");
  // const [brand, setbrand] = useState("");
  console.log(search)

  const [serchparams, setsearchparams] = useSearchParams();

 const selectedCategory = serchparams.get("category") || "All";
  const selectedBrand = serchparams.get("brand") || "All";
  

  const updatefilter = (key, value) => {
    const param = new URLSearchParams(serchparams);

    if (!value ||value === "All" ) {
      param.delete(key);
    } else {
      param.set(key, value);
    }

    setsearchparams(param);
  };
  useEffect(()=>{
    const delay=setTimeout(() => {
       const param = new URLSearchParams(serchparams);
    if(search){
      param.set("search",search)
    }else{
      param.delete("search")
    }
          setsearchparams(param);
    },500 );
   return ()=> clearTimeout(delay)
  },[search])

  useEffect(() => {
  fetch(`http://localhost:4000/products?${serchparams.toString()}`)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    })
    .then((data) => setData(data.data || []))
    .catch((err) => {
      console.error(err);
      setData([]); 
    });
}, [serchparams]);

const deleteProduct = async (id) => {
  
  const token = localStorage.getItem("token");

  const toastId = toast.loading("Deleting product...");

  try {
    const res = await fetch(`http://localhost:4000/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });

    if (!res.ok) throw new Error();

   
    setData((prev) => prev.filter((item) => item._id !== id));

    toast.success("Product deleted successfully", { id: toastId });

  } catch (err) {
    toast.error("Delete failed", { id: toastId });
  }
};
  // const filterproduct = useMemo(() => {
  //   const q = search.toLowerCase();
  //   return data.filter((v) => {
  //     const matchSearch = v.name.toLowerCase().includes(q);
  //     const matchCategory =
  //       category === "" || v.category.toLowerCase() === category.toLowerCase();
  //     const matchbrand =
  //       brand === "" || v.brand.toLowerCase() === brand.toLowerCase();
  //     return matchSearch && matchCategory && matchbrand;
  //   });
  // }, [data, search, category, brand]);

  const categories = [
    "Laptops",
    "Smartphones",
    "Headphones",
    "Tablets",
    "Accessories",
    "Wearables",
  ];
  const branditems = [
    "Amazon",
    "Apple",
    "Asus",
    "Bose",
    "Canon",
    "DJI",
    "Dell",
    "GoPro",
    "Keychron",
    "Logitech",
    "Microsoft",
    "Nintendo",
    "Razer",
    "Samsung",
    "Sony",
    "SteelSeries",
  ];

  const darkInput =
    "bg-[#1c1d29] border border-gray-800 text-white placeholder-gray-500 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all";

  return (
    <div className="p-4 md:p-8 bg-[#0a0b14] min-h-screen w-full flex justify-center text-white font-sans">
      <div className="w-full max-w-[1150px] flex flex-col gap-6">
        <div className="bg-[#11121e] p-6 rounded-2xl border border-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold uppercase tracking-tight text-white">
              Product Management
            </h2>
            <p className="text-sm text-gray-400">Inventory Overview</p>
          </div>
          <div className="text-xs font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-xl">
            {data.length} ITEMS TOTAL
          </div>
        </div>

        <div className="flex flex-col lg:flex-row p-5 gap-4 bg-[#11121e] rounded-2xl border border-gray-800 shadow-xl">
          <input
            type="text"
            placeholder="Search products..."
            className={`flex-[2] ${darkInput}`}
            onChange={(e) => setsearch(e.target.value)}
          />
          <div className="flex gap-3 flex-1">
            <select
              value={selectedCategory}
              onChange={(e) => {
                // setCategory(e.target.value);
                updatefilter("category", e.target.value);
              }}
              className={`flex-1 ${darkInput} cursor-pointer`}
            >
              <option value="" className="bg-[#0a0b14]">
                All Categories
              </option>
              {categories.map((c) => (
                <option key={c} value={c} className="bg-[#0a0b14]">
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </option>
              ))}
            </select>
            <select
              value={selectedBrand}
              onChange={(e) => {
                // setbrand(e.target.value);
                updatefilter("brand", e.target.value);
              }}
              className={`flex-1 ${darkInput} cursor-pointer`}
            >
              <option value="" className="bg-[#0a0b14]">
                All Brands
              </option>
              {branditems.map((b) => (
                <option key={b} value={b} className="bg-[#0a0b14]">
                  {b}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="hidden md:block bg-[#11121e] rounded-2xl border border-gray-800 overflow-hidden shadow-2xl">
          <table className="w-full border-collapse">
            <thead className="bg-[#1c1d29]/50">
              <tr className="text-gray-400 text-[10px] uppercase font-bold tracking-widest border-b border-gray-800">
                <th className="py-5 px-6 text-left">Product</th>
                <th className="py-5 px-6 text-left">Category</th>
                <th className="py-5 px-6 text-left">Pricing</th>
                <th className="py-5 px-6 text-left">Stock</th>
                <th className="py-5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {data.map((val) => (
                <tr
                  key={val._id}
                  className="hover:bg-indigo-500/5 transition-all"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#1c1d29] rounded-xl p-2 flex items-center justify-center border border-gray-800">
                        <img
                          src={
                            val.image
                          }
                          alt={val.name}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/40/1c1d29/indigo?text=?";
                          }}
                        />
                      </div>
                      <div>
                        <div className="font-bold text-gray-200 text-sm">
                          {val.name}
                        </div>
                        <div className="text-[10px] text-gray-500 font-mono mt-1">
                          ID: {val._id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-xs text-gray-400 uppercase font-medium">
                    {val.category}
                  </td>
                  <td className="py-4 px-6 font-bold text-indigo-400 text-sm">
                    ${val.price.toLocaleString()}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-300">
                    {val.stock > 0 ? (
                      <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        {val.stock} in stock
                      </span>
                    ) : (
                      <span className="text-red-400">Out of stock</span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex justify-end gap-3">
                      <Link
                        to={`/admin/list-products/${val._id}`}
                        className="px-3 py-1.5 bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500 hover:text-white rounded-lg text-[11px] font-bold transition-all"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteProduct(val._id)}
                        className="px-3 py-1.5 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg text-[11px] font-bold transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-4">
          {data.map((val) => (
            <div
              key={val._id}
              className="bg-[#11121e] p-5 rounded-2xl border border-gray-800"
            >
              <div className="flex gap-4 mb-4">
                <div className="w-16 h-16 bg-[#1c1d29] rounded-xl p-2 border border-gray-800">
                  <img
                    src={val.image}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-white text-sm">{val.name}</div>
                  <div className="text-xs text-indigo-400 font-bold mt-1">
                    ${val.price}
                  </div>
                  <div className="text-[10px] text-gray-500 mt-1 uppercase font-bold tracking-wider">
                    {val.category} • Stock: {val.stock}
                  </div>
                </div>
              </div>
              <div className="flex gap-3 pt-4 border-t border-gray-800">
                <Link
                  to={`/admin/list-products/${val._id}`}
                  className="flex-1 text-center py-2.5 bg-[#1c1d29] text-white text-xs font-bold rounded-xl border border-gray-700"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteProduct(val._id)}
                  className="flex-1 text-center py-2.5 bg-red-500/10 text-red-400 text-xs font-bold rounded-xl border border-red-500/20"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {data.length === 0 && (
          <div className="p-20 text-center text-gray-500 text-sm bg-[#11121e] rounded-2xl border border-gray-800 border-dashed">
            <div className="text-3xl mb-2">🔍</div>
            No products found matching your filters.
          </div>
        )}
      </div>
    </div>
  );
};
