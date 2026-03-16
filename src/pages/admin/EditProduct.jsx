import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

export const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    brand: "",
    stock: "",
    tag: "",
    description: "",
    image: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setFormData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.ok) {
          toast.success("Product updated successfully!");
          navigate("/admin/list-products");
        } else {
          toast.error("Failed to update product.");
        }
      })
      .catch((err) => console.error("Error updating:", err));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };


  const darkInput = "w-full p-3 bg-[#1c1d29] border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm font-medium";

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0b14] text-gray-400 font-bold">
        Loading Product Data...
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0b14] text-red-500 font-bold">
        {error}
      </div>
    );

  return (
    <div className="p-4 md:p-6 bg-[#0a0b14] min-h-screen w-full flex justify-center font-sans text-white">
      <div className="w-full max-w-6xl bg-[#11121e] rounded-2xl border border-gray-800 overflow-hidden shadow-2xl">
        
       
        <div className="p-4 md:p-6 border-b border-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#11121e] gap-4">
          <div>
            <h2 className="text-lg md:text-xl font-black text-white uppercase tracking-tight">
              Edit Product
            </h2>
            <p className="text-[10px] md:text-xs text-gray-500 font-mono">Editing ID: {id}</p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="text-[10px] md:text-xs font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest"
          >
            ← CANCEL & GO BACK
          </button>
        </div>

       
        <form onSubmit={handleSubmit} className="p-4 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            
            
            <div className="md:col-span-2">
              <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2 tracking-widest ml-1">
                Product Name
              </label>
              <input
                type="text"
                className={darkInput}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

          
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2 tracking-widest ml-1">
                Price ($)
              </label>
              <input
                type="number"
                className={darkInput}
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                required
              />
            </div>

            
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2 tracking-widest ml-1">
                Stock Level
              </label>
              <input
                type="number"
                className={darkInput}
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                required
              />
            </div>

            
            <div className="md:col-span-2">
              <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2 tracking-widest ml-1">
                Status Tag
              </label>
              <select
                className={`${darkInput} appearance-none cursor-pointer`}
                value={formData.tag || ""}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
              >
                <option value="" className="bg-[#0a0b14]">No Tag</option>
                <option value="Sale" className="bg-[#0a0b14]">Sale</option>
                <option value="New" className="bg-[#0a0b14]">New</option>
                <option value="Bestseller" className="bg-[#0a0b14]">Bestseller</option>
              </select>
            </div>
          </div>

         
          <div className="pt-4">
            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2 tracking-widest ml-1">
              Product Image (Upload to replace)
            </label>
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center bg-[#1c1d29] p-5 rounded-2xl border border-gray-800">
              
             
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl bg-[#0a0b14] border border-gray-700 flex-shrink-0 flex items-center justify-center overflow-hidden shadow-inner">
                <img
                  src={formData.image?.startsWith("data:") ? formData.image : `http://localhost:5000${formData.image}`}
                  alt="Preview"
                  className="w-full h-full object-contain p-2"
                  onError={(e) => (e.target.src = "https://via.placeholder.com/150?text=No+Image")}
                />
              </div>

              
              <div className="flex-grow space-y-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-xs text-gray-400 file:mr-4 file:py-2.5 file:px-6 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-[#0a0b14] file:text-indigo-400 hover:file:bg-[#11121e] cursor-pointer transition-all border border-gray-700 rounded-xl p-1"
                />
                <p className="text-[10px] text-gray-500 font-medium italic">
                  * Supported: JPG, PNG, WEBP. Max recommended size: 2MB.
                </p>
              </div>
            </div>
          </div>

          
          <div className="pt-6 md:pt-8">
            <button
              type="submit"
              className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/10 uppercase tracking-widest text-[11px] md:text-xs active:scale-[0.98]"
            >
              Update Product Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};